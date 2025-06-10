import { NextResponse } from 'next/server';
import { createUser, createVerificationToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, name, phone } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Phone validation (if provided)
    if (phone) {
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(phone)) {
        return NextResponse.json(
          { error: 'Please enter a valid phone number' },
          { status: 400 }
        );
      }
    }

    // Create user
    const user = await createUser({
      email: email.toLowerCase(),
      password,
      name,
      phone
    });

    // Create email verification token
    const verificationToken = await createVerificationToken(user.id);

    // TODO: Send verification email (implement this when email is configured)
    console.log(`Verification token for ${email}: ${verificationToken.token}`);

    return NextResponse.json({
      success: true,
      message: 'Account created successfully! Please check your email for verification.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        verified: user.verified
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    
    if (error.message.includes('already exists')) {
      return NextResponse.json(
        { error: error.message },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    );
  }
} 