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
 
    if (!mongoose.isValidObjectId(product_id)) {
      return new NextResponse("Not Found", { status: 404 });
    }
    const bestSellerThreshold = 100;

    let product = await Product.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(product_id) } },
      {
        $addFields: {
          is_bestseller: { $gte: ["$sales_count", bestSellerThreshold] },
        },
      },
      {
        $addFields: {
          "price.offer.offer_calc": {
            $multiply: [
              { $divide: ["$price.offer.discount_percentage", 100] },
              "$price.base_price",
            ],
          },
        },
      },
      {
        $addFields: {
          "price.offer.final_price": {
            $subtract: ["$price.base_price", "$price.offer.offer_calc"],
          },
        },
      },
    ]).exec();
    product = product[0];
    if (!product) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS>PRODUCT:GET-PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
