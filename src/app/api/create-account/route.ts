import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { UserInfos } from "@/models/UserInfos";
import mongo_connect from "@/actions/mongo-connect";
import mongoose from "mongoose";
export async function POST(req: NextRequest) {
  try {
    // await mongo_connect();
    await mongoose.connect(process.env.MONGO_URL as string);
    const body = await req.json();
    const pass = body.password;
    if (!pass?.length || pass.length < 5) {
      new Error("password must be at least 5 characters");
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const user = await User.findOne({ email: body.email });
    if (user) {
      return new NextResponse("Conflict", { status: 409 });
    }
    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword, salt);

    const createUser = await User.create(body);
    const { email } = body;
    await UserInfos.create({ email });

    return NextResponse.json(createUser);
  } catch (error) {
    console.log("[CREATE-ACCOUNT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
