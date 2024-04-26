import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { UserInfo } from "@/models/user-info";
import mongoConnect from "@/utils/mongo-connect";

import bcrypt from "bcrypt";
import { Account } from "@/types";

export async function PATCH(req: NextRequest) {
  try {
    await mongoConnect();
    const data = await req.json();
    const { email, name, image, ...otherData } = data;
    const session = await getServerSession(authOptions);
    const user = session?.user;

    const userData = await User.updateOne(
      { email: user?.email },
      { name }
    ).lean();

    const userInfo = await UserInfo.updateOne(
      { email: user?.email },
      otherData
    ).lean();
    const fullData = { ...userData, ...userInfo };

    if (!user || !userInfo) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!Object.values(data).every(Boolean)) {
      return new NextResponse("Not Found", { status: 401 });
    }

    return NextResponse.json(fullData);
  } catch (error) {
    console.log("[EDIT-PROFILE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = await User.findOne({ email }).lean();
    const userInfos = await UserInfo.findOne({ email }).lean();
    const fullData = { ...userInfos, ...user };
    if (!user || !userInfos) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return NextResponse.json(fullData);
  } catch (error) {
    console.log("[PROFILE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await mongoConnect();
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await User.deleteOne({ email }).lean();
    await UserInfo.deleteOne({ email }).lean();

    return new NextResponse("success deleting", { status: 200 });
  } catch (error) {
    console.log("[PROFILE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await mongoConnect();
    const body = await req.json();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = (await User.findOne({ email }).lean()) as Account;
    const currPassword = user?.password;

    const isMatch = await bcrypt.compare(
      body?.currPass || "",
      currPassword || ""
    );

    const notHashedPassword = body?.confirmPassword;
    const salt = bcrypt.genSaltSync(10);
    body.confirmPassword = bcrypt.hashSync(notHashedPassword, salt);

    if (!user || !currPassword) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!isMatch) {
      return new NextResponse("Not Acceptable", { status: 406 });
    }

    const update = await User.updateOne(
      { email },
      { password: body?.confirmPassword }
    );

    return NextResponse.json(update);
  } catch (error) {
    console.log("[PROFILE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
