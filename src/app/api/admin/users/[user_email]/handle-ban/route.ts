import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { UserInfo } from "@/models/user-info";
import mongoConnect from "@/actions/mongo-connect";
import { AccountInfo } from "@/types";
import { Product } from "@/models/product";
import { Store } from "@/models/store";

export async function PATCH(
  req: NextRequest,
  { params: { user_email } }: { params: { user_email: string } }
) {
  try {
    await mongoConnect();
    const body = await req.json();

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = user?.email;
    const userInfo: any = await UserInfo.findOne({ email }).lean();
    const store: any = await Store.findOne({
      personal_email: user_email,
    }).lean();

    if (user_email === process.env.CEO_EMAIL) {
      return new NextResponse("Bad Requisite", { status: 400 });
    }

    if (!user_email) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await Product.updateMany(
      { store_personal_email: user_email, store_id: store?._id },
      { is_published: !body?.ban?.is_banned }
    );

    const updateUser = await UserInfo.updateOne({ email: user_email }, body);
    return NextResponse.json(updateUser);
  } catch (error) {
    console.log("[BAN-USER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params: { user_email } }: { params: { user_email: string } }
) {
  try {
    await mongoConnect();

    const userInfo: AccountInfo | null = await UserInfo.findOne({
      email: user_email,
    }).lean();

    if (!userInfo) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(userInfo?.ban);
  } catch (error) {
    console.log("[GET-BAN-USER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
