import mongoConnect from "@/actions/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { Product } from "@/models/product";
import { Store } from "@/models/store";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
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

    const product = await Product.findOne({
      store_id,
      store_personal_email: email,
      _id: product_id,
    }).lean();

    if (!product) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("[SELLER:GET-PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  {
    params: { store_id, product_id },
  }: { params: { store_id: string; product_id: string } }
) {
  try {
    await mongoConnect();
    const body = await req.json();
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

    const product = await Product.findOne({
      store_id,
      store_personal_email: email,
      _id: product_id,
    }).lean();

    if (!product) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const updateProduct = await Product.updateOne(
      {
        store_id,
        store_personal_email: email,
        _id: product_id,
      },
      { ...body, is_published: false }
    );

    return NextResponse.json(updateProduct);
  } catch (error) {
    console.log("[SELLER:UPDATE-PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
