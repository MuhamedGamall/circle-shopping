import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { UserInfo } from "@/models/user-info";
import mongoConnect from "@/utils/mongo-connect";

export async function GET(
  req: NextRequest,
  { params: { user_id } }: { params: { user_id: string } }
) {
  try {
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const userAccount = session?.user;
    const email = userAccount?.email;

    const userInfoAccount: any = await UserInfo.findOne({ email });

    if (!userAccount || !userInfoAccount?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user: any = await User.findOne({ _id: user_id }).lean();
    const userInfo: any = await UserInfo.findOne({ email: user?.email }).lean();

    if (!user || !userInfo) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Merge main user and user info data
    const merged = { ...userInfo, ...user };

    return NextResponse.json(merged);
  } catch (error) {
    console.log("[ADMIN:USER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
