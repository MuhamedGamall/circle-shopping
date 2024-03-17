import mongoConnect from "@/actions/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { UserInfo } from "@/models/user-info";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Notification } from "@/models/notification";

export async function POST(req: NextRequest) {
  try {
    await mongoConnect();
    const body = await req.json();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;

    const userInfo = await UserInfo.findOne({ email });

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!Object.values(body).every(Boolean)) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const updateProduct = await Notification.create(body);

    return NextResponse.json(updateProduct);
  } catch (error) {
    console.log("[ADMIN:NOTIFIACTIN]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
