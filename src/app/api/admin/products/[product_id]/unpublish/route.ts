import mongoConnect from "@/actions/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { Product } from "@/models/product";
import { Store } from "@/models/store";
import { UserInfo } from "@/models/user-info";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params: { product_id } }: { params: { product_id: string } }
) {
  try {
    await mongoConnect();
    const {store_id,store_personal_email} = await req.json()
    console.log(store_id);

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;

    const store = await Store.findOne({ _id: store_id, personal_email: store_personal_email });
    const userInfo = await UserInfo.findOne({ email });
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
        store_personal_email
      },
      { is_published: false }
    );

    return NextResponse.json(updateProduct);
  } catch (error) {
    console.log("[ADMIN:UNPUBLISH-PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
