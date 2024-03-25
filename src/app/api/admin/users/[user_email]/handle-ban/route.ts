import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { UserInfo } from "@/models/user-info";
import mongoConnect from "@/actions/mongo-connect";

export async function PATCH(
  req: NextRequest,
  { params: { user_email } }: { params: { user_email: string } }
) {
  try {
    await mongoConnect();
    const body = await req.json();
console.log(body);

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = user?.email;
    const userInfo = await UserInfo.findOne({ email }).lean();

    if (user_email === process.env.CEO_EMAIL) {
      return new NextResponse("Bad Requisite", { status: 400 });
    }

    if (!user || !userInfo) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updateUser = await UserInfo.updateOne({ email: user_email }, body);
    return NextResponse.json(updateUser);
  } catch (error) {
    console.log("[UPDATE-USER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
