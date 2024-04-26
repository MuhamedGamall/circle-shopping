import mongoConnect from "@/utils/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { Product } from "@/models/product";
import { Store } from "@/models/store";
import { UserInfo } from "@/models/user-info";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    await mongoConnect();
    const { store_id, product_id } = await req.json();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;

    const store = await Store.findOne({
      _id: store_id,
    }).lean();
    const userInfo: any = await UserInfo.findOne({ email }).lean();

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!store || !product_id) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const updateProduct = await Product.updateOne(
      {
        store_id,
        _id: product_id,
      },
      { is_published: false }
    );

    return NextResponse.json(updateProduct);
  } catch (error) {
    console.log("[UNPUBLISH-PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
