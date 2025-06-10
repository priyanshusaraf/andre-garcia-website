import bcrypt from 'bcryptjs';
import { prisma } from './db';

export async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export async function createUser({ email, password, name, phone }) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          ...(phone ? [{ phone }] : [])
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new Error('User with this email already exists');
      }
      if (existingUser.phone === phone) {
        throw new Error('User with this phone number already exists');
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        phone,
        name,
        password: hashedPassword,
        verified: false,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        verified: true,
        createdAt: true,
      }
    });

    // Create user profile
    await prisma.userProfile.create({
      data: {
        userId: user.id,
        firstName: name?.split(' ')[0] || '',
        lastName: name?.split(' ').slice(1).join(' ') || '',
      }
    });

    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getUserByEmail(email) {
  try {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        profile: {
          include: {
            addresses: true
          }
        }
      }
    });
  } catch (error) {
    console.error('Error getting user by email:', error);
    return null;
  }
}

export async function getUserById(id) {
  try {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        verified: true,
        createdAt: true,
        profile: {
          include: {
            addresses: true
          }
        }
      }
    });
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return null;
  }
}

export async function updateUser(id, data) {
  try {
    return await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        verified: true,
        updatedAt: true,
      }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Email verification
export async function createVerificationToken(userId, type = 'EMAIL_VERIFICATION') {
  const token = Math.random().toString(36).substring(2, 15) + 
                Math.random().toString(36).substring(2, 15);
  
  const expires = new Date();
  expires.setHours(expires.getHours() + 24); // 24 hours from now

  try {
    return await prisma.verificationToken.create({
      data: {
        userId,
        token,
        type,
        expires
      }
    });
  } catch (error) {
    console.error('Error creating verification token:', error);
    throw error;
  }
}

export async function verifyToken(token) {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!verificationToken) {
      return { success: false, message: 'Invalid token' };
    }

    if (verificationToken.used) {
      return { success: false, message: 'Token already used' };
    }

    if (new Date() > verificationToken.expires) {
      return { success: false, message: 'Token expired' };
    }

    // Mark token as used
    await prisma.verificationToken.update({
      where: { id: verificationToken.id },
      data: { used: true }
    });

    // Mark user as verified if it's email verification
    if (verificationToken.type === 'EMAIL_VERIFICATION') {
      await prisma.user.update({
        where: { id: verificationToken.userId },
        data: { verified: true }
      });
    }

    return { 
      success: true, 
      user: verificationToken.user,
      type: verificationToken.type 
    };
  } catch (error) {
    console.error('Error verifying token:', error);
    return { success: false, message: 'Verification failed' };
  }
} 