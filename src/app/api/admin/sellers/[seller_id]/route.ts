import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { UserInfo } from "@/models/user-info";
import mongoConnect from "@/actions/mongo-connect";
import { Store } from "@/models/store";

export async function GET(
  req: NextRequest,
  { params: { seller_id } }: { params: { seller_id: string } }
) {
  try {
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = user?.email;

    const userInfo: any = await UserInfo.findOne({ email });

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const store: any = await Store.findOne({ _id: seller_id }).lean();

    if (!store ) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(store);
  } catch (error) {
    console.log("[ADMIN:STORE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
