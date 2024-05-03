import { NextRequest, NextResponse } from "next/server";

import { Category } from "@/models/category";

import { Product } from "@/models/product";
import mongoConnect from "@/utils/mongo-connect";
import { Store } from "@/models/store";
import { groupFilters } from "@/utils/group-filters";

export async function GET(
  req: NextRequest,
  {
    params: { category_id },
  }: {
    params: { category_id: string };
  }
) {
  try {
    await mongoConnect();
    const bestSellerThreshold = 100;

    const filterProducts = {
      "category.main_category": category_id,
      sales_count: { $gte: bestSellerThreshold },
      is_published: true,
    };
    const groupFiltersData = await groupFilters({ filter: filterProducts });
    const queryParams = Object.fromEntries(req.nextUrl.searchParams.entries());
    const defaultValues = 1e6;
    const {
      limit = 0,
      brand = "",
      price = {
        from: groupFiltersData?.minimumPrice || 0,
        to: groupFiltersData?.maximumPrice || defaultValues,
      },
      deals = "",
      maximum_likes = groupFiltersData?.maximumLikes || defaultValues,
      item_condition = "",
      colour = "",
    } = queryParams;

    const filterCategories = {
      "main_category.name": category_id,
    };

    const findCategory = await Category.findOne(filterCategories);

    if (!findCategory) {
      return new NextResponse("Not Found", { status: 404 });
    }

    let products = await Product.find(filterProducts).limit(+limit).lean();

    const alternativeData = await Product.find({
      "category.main_category": category_id,
      is_published: true,
    })
      .limit(+limit)
      .lean();

    const updateData = products.map((el, i) => ({
      ...el,
      is_bestseller: true,
    }));

    products = products.length
      ? updateData
      : alternativeData.map((el, i) => ({ ...el, is_bestseller: true }));


    return NextResponse.json({ products, groupFilters: groupFiltersData });
  } catch (error) {
    console.log("[MEMBER:CATEGORY>BESTSELLERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
