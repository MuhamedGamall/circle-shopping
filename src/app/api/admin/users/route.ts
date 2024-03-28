import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { UserInfo } from "@/models/user-info";
import mongoConnect from "@/actions/mongo-connect";

import { Account, AccountData, AccountInfo } from "@/types";

export async function GET(req: NextRequest) {
  try {
    await mongoConnect()
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = user?.email;

    const userInfo: any = await UserInfo.findOne({ email });

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const users: any = await User.find().lean();
    const usersInfos: any = await UserInfo.find().lean();

    // Merge main user and user info data
    const mergedArray = users.map(
      (user: Account): AccountData => ({
        ...usersInfos.find((info: AccountInfo) => user.email === info.email),
        ...user,
      })
    )

    return NextResponse.json(mergedArray);
  } catch (error) {
    console.log("[ADMIN:USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

