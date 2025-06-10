import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByEmail, verifyPassword } from '@/lib/auth';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          const user = await getUserByEmail(credentials.email);
          
          if (!user) {
            throw new Error('No user found with this email');
          }

          const isValidPassword = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            throw new Error('Invalid password');
          }

          // Return user object (password excluded)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            role: user.role,
            verified: user.verified,
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.verified = user.verified;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.verified = token.verified;
        session.user.phone = token.phone;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
  },
  events: {
    async signIn({ user, isNewUser }) {
      console.log(`User ${user.email} signed in`);
    },
    async signOut({ token }) {
      console.log(`User signed out`);
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 