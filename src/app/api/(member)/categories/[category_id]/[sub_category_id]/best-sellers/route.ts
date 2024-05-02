import { NextRequest, NextResponse } from "next/server";

import { Category } from "@/models/category";

import { Product } from "@/models/product";
import mongoConnect from "@/utils/mongo-connect";

export async function GET(
  req: NextRequest,
  {
    params: { category_id, sub_category_id },
  }: {
    params: { category_id: string; sub_category_id: string };
  }
) {
  try {
    await mongoConnect();

    const filterCategories = {
      "main_category.name": category_id,
      sub_categories: {
        $elemMatch: {
          name: sub_category_id,
        },
      },
    };

    const findCategory = await Category.findOne(filterCategories);

    if (!findCategory) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const bestSellerThreshold = 100;
    const filterProducts = {
      "category.main_category": category_id,
      "category.sub_category": sub_category_id,
      sales_count: { $gte: bestSellerThreshold },
      is_published: true,
    };

    let products = await Product.find(filterProducts).lean()

    products = products.map((el, i) => ({
      ...el,
      is_bestseller: true,
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.log("[MEMBER:CATEGORY>SUB_CATEGROY>BESTSELLERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
