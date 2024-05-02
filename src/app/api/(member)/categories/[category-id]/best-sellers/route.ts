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

    const bestSellerThreshold = 100;

    const filterCategories = {
      "main_category.name":  category-id,
    };

    const findCategory = await Category.findOne(filterCategories);

    if (!findCategory) {
      return new NextResponse("Not Found", { status: 404 });
    }
    const filterProducts = {
      "category.main_category":  category-id,
      sales_count: { $gte: bestSellerThreshold },
      is_published: true,
    };

    let products = await Product.find(filterProducts).limit(limit).lean();

    const alternativeData = await Product.find({
      "category.main_category":  category-id,
      is_published: true,
    })
      .limit(limit)
      .lean();

    const updateData = products.map((el, i) => ({
      ...el,
      is_bestseller: true,
    }));

    products = products.length
      ? updateData
      : alternativeData.map((el, i) => ({ ...el, is_bestseller: true }));

    return NextResponse.json(products);
  } catch (error) {
    console.log("[MEMBER:CATEGORY>BESTSELLERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
