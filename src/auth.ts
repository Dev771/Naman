import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/analytics.readonly",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Restrict access to the specific admin email if configured
      if (process.env.ADMIN_EMAIL) {
        if (user.email !== process.env.ADMIN_EMAIL) {
          console.warn(`Unauthorized login attempt by: ${user.email}`);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Make the access token available on the session object for server-side fetches
      // @ts-expect-error adding custom field to session
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/admin',
    error: '/admin',
  },
});
