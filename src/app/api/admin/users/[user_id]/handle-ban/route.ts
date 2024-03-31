import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { UserInfo } from "@/models/user-info";
import mongoConnect from "@/actions/mongo-connect";
import { Product } from "@/models/product";
import { Store } from "@/models/store";
import { User } from "@/models/user";

export async function PATCH(
  req: NextRequest,
  { params: { user_id } }: { params: { user_id: string } }
) {
  try {
    await mongoConnect();
    const body = await req.json();

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = user?.email;
    const userInfo: any = await UserInfo.findOne({ email }).lean();

    const getUser: any = await User.findOne({ _id: user_id }).lean();
    const store: any = await Store.findOne({
      personal_email: getUser?.email,
    }).lean();

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!getUser || !store) {
      return new NextResponse("Not Found", { status: 404 });
    }

    await Product.updateMany(
      {
        store_personal_email: store?.personal_email,
        store_id: store?._id,
      },
      { is_published: !body?.ban?.is_banned }
    );

    const updateUser = await UserInfo.updateOne(
      { email: getUser?.email },
      body
    );

    await Store.updateOne({ _id: store?._id }, body);

    return NextResponse.json(updateUser);
  } catch (error) {
    console.log("[ADMIN:HANDLE-BAN-USER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params: { user_id } }: { params: { user_id: string } }
) {
  try {
    await mongoConnect();
    const email = user_id; // email not id
    const userInfo: any = await UserInfo.findOne({ email }).lean();

    if (!userInfo) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(userInfo?.ban);
  } catch (error) {
    console.log("[ADMIN:GET-BAN]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
