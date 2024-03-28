import bcrypt from "bcrypt";

import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongoConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { Adapter } from "next-auth/adapters";
import mongoConnect from "@/actions/mongo-connect";
import { User } from "@/models/user";
import { UserInfo } from "@/models/user-info";
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
        const { email, password }: any = credentials;
        await mongoConnect();
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid email or password");
        }
        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) {
          throw new Error("Invalid email or password");
        }
        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        await mongoConnect();
        const existingUser = await UserInfo.findOne({ email: user?.email });
        if (existingUser?.ban?.is_banned) {
          return false
        }
        if (!existingUser) {
          await UserInfo.create({ email: user?.email });
          return true;
        }
        return true;
      } catch (error) {
        return false;
      }
    },

    async jwt({ token }) {
      await mongoConnect();
      const user = await UserInfo.findOne({ email: token?.email });
      const isAdmin = user?.admin;
      token.role = isAdmin ? "admin" : "member";
      return token;
    },
  },
};
