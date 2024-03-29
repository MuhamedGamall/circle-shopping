import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { UserInfo } from "@/models/user-info";
import mongoConnect from "@/actions/mongo-connect";

import { Store } from "@/models/store";

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

    const CEOEmailForExclusion = process.env.CEO_EMAIL
    const stores: any = await Store.find({personal_email:{$ne:CEOEmailForExclusion}}).lean();

    return NextResponse.json(stores);
  } catch (error) {
    console.log("[ADMIN:STORES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

