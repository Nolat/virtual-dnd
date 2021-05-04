import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { AuthAdapter } from "modules/auth/adapter";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  adapter: AuthAdapter() as any,
  pages: { signIn: "/auth/sign-in" }
});
