import { NextRequest, NextResponse } from "next/server";

import { Category } from "@/models/category";

import { Product } from "@/models/product";
import mongoConnect from "@/utils/mongo-connect";

export async function GET(
  req: NextRequest,
  {
    params: {  category-id },
  }: {
    params: {  category-id: string };
  }
) {
  try {
    await mongoConnect();
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "0");

    const filterCategories = {
      "main_category.name":  category-id,
    };

    const findCategory = await Category.findOne(filterCategories);
    const bestSellerThreshold = 100;
    if (!findCategory) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const filterProducts = {
      "category.main_category":  category-id,
      is_published: true,
    };

    let products = await Product.find({
      ...filterProducts,
      "price.offer.discount_percentage": { $gte: 1 },
    })
      .limit(limit)
      .lean();

    const alternativeData = await Product.find(filterProducts)
      .limit(limit)
      .lean();

    const updateData = products.map((el, i) => ({
      ...el,
      is_bestseller: el?.sales_count >= bestSellerThreshold,
    }));

    products = products.length
      ? updateData
      : alternativeData.map((el, i) => ({
          ...el,
          is_bestseller:el?.sales_count >= bestSellerThreshold,
        }));

    return NextResponse.json(products);
  } catch (error) {
    console.log("[MEMBER:CATEGORY>DEALS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
