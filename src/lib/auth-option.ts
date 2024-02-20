import bcrypt from "bcrypt";

import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongoConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { Adapter } from "next-auth/adapters";
import mongo_connect from "@/actions/mongo-connect";
import { User } from "@/models/user";


export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/log-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
    } as any),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        await mongo_connect();
        const user = await User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password!, user.password);
        if (passwordOk) {
          return user;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token }) {
      await mongo_connect();
      const user = await User.findOne({ email: token?.email });
      const isAdmin = user?.admin;
      token.role = isAdmin ? "admin" : "member";
      return token;
    },
  },
};
