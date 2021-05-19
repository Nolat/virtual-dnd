import NextAuth from "next-auth";

import { AuthAdapter } from "modules/auth/adapter";
import { providers } from "modules/auth/providers";

export default NextAuth({
  providers,
  adapter: AuthAdapter() as any,
  pages: { signIn: "/auth/sign-in" },
  callbacks: {
    session: async (session, user) => {
      session.id = user.id;
      return Promise.resolve(session);
    }
  }
});
