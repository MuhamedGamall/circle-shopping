import mongoConnect from "@/utils/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { Product } from "@/models/product";
import { Store } from "@/models/store";

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  {
    params: { store_id, product_id },
  }: { params: { store_id: string; product_id: string } }
) {
  try {
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;

    const store: any = await Store.findOne({
      _id: store_id,
      personal_email: email,
    }).lean();

    if (!user || !store) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (store?.ban?.is_banned) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const product: any = await Product.findOne({
      store_id,
      store_personal_email: email,
      _id: product_id,
    }).lean();

    if (!product) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (
      product?.is_published ||
      !product?.title ||
      !product?.description ||
      !product?.model_name ||
      !product?.model_height ||
      !product?.warranty ||
      !product?.item_condition ||
      !product?.colour ||
      !product?.box_details ||
      product?.images.length === 0 ||
      !(product?.item_pack_quantity > 0) ||
      !(product?.price?.base_price >= 0.01) ||
      !(product?.quantity_in_stock >= 0) ||
      !(product?.max_purchase_quantity >= 1) ||
      !Object.values(product?.category).every(Boolean) ||
      !Object.values(product?.shipping?.shipping_length).some(Boolean) ||
      !Object.values(product?.shipping?.shipping_height).some(Boolean) ||
      !Object.values(product?.shipping?.shipping_width_depth).some(Boolean) ||
      !Object.values(product?.shipping?.shipping_weight).some(Boolean)
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const updateProduct = await Product.updateOne(
      {
        store_id,
        _id: product_id,
      },
      { is_published: true }
    );

    return NextResponse.json(updateProduct);
  } catch (error) {
    console.log("[SELLER:PUBLISH-PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
