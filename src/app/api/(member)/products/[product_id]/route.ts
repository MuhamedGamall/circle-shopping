import { authOptions } from "@/lib/auth-option";
import { Product } from "@/models/product";
import mongoConnect from "@/utils/mongo-connect";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { product_id } }: { params: { product_id: string } }
) {
  try {
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    if (!mongoose.isValidObjectId(product_id)) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const product = await Product.findOne({
      _id: product_id,
    }).lean();
    console.log(product);

    if (!product) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS>PRODUCT:GET-PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
