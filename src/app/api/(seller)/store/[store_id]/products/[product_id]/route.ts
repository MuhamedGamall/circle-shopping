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

    const store = await Store.find({ _id: store_id, personal_email: email });

    if (!user || !store || !product_id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const product = await Product.findOne({
      store_id,
      store_personal_email: email,
      _id: product_id,
    }).lean();

    return NextResponse.json(product);
  } catch (error) {
    console.log("[GET-PRODUCT]", error);
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

    const store = await Store.find({ _id: store_id, personal_email: email });

    if (!user || !store || !product_id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updateProduct = await Product.updateOne(
      {
        store_id,
        store_personal_email: email,
        _id: product_id,
      },
      body
    );
    console.log(updateProduct);

    return NextResponse.json(updateProduct);
  } catch (error) {
    console.log("[UPDATE-PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
