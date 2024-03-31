import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { UserInfo } from "@/models/user-info";
import mongoConnect from "@/actions/mongo-connect";

import { Product } from "@/models/product";
import { Store } from "@/models/store";

export async function PATCH(
  req: NextRequest,
  { params: { seller_id } }: { params: { seller_id: string } }
) {
  try {
    await mongoConnect();
    const body = await req.json();

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = user?.email;
    const userInfo: any = await UserInfo.findOne({ email }).lean();

    const store: any = await Store.findOne({
      _id: seller_id,
    }).lean();

    if (!seller_id || !store) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await Product.updateMany(
      {
        store_id: seller_id,
      },
      { is_published: !body?.ban?.is_banned }
    );

    const updateStore = await Store.updateOne({ _id: seller_id }, body);
    return NextResponse.json(updateStore);
  } catch (error) {
    console.log("[ADMIN:HANDLE-BAN-SELLER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
