import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { UserInfo } from "@/models/user-info";
import mongoConnect from "@/actions/mongo-connect";

import { Account, AccountData, AccountInfo } from "@/types";

export async function GET(req: NextRequest) {
  try {
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = user?.email;

    const url = new URL(req.url);
    const query = url.searchParams.get("query");

    const userInfo: any = await UserInfo.findOne({ email })

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    // return NextResponse.json(mergedArray);
  } catch (error) {
    console.log("[ADMIN:USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
