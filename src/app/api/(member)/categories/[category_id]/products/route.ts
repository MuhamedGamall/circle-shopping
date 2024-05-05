import { NextRequest, NextResponse } from "next/server";

import { Category } from "@/models/category";

import { Product } from "@/models/product";
import mongoConnect from "@/utils/mongo-connect";
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
    let filter: any = {
      "category.main_category": category_id,
      is_published: true,
    };
    const groupFiltersData = await groupFilters({ filter: filter });

    const queryParams = Object.fromEntries(req.nextUrl.searchParams.entries());
    const defaultValues = 9e10;
    const {
      limit = defaultValues,
      role = "all_products_of_category",
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

    const bestSellerThreshold = 100;

    if (role === "bestsellers")
      filter.sales_count = { $gte: bestSellerThreshold };
    else if (role === "deals")
      filter["price.offer.discount_percentag"] = { $gte: 0.01 };

    let products = await Product.aggregate([
      { $match: filter },
      { $limit: +limit },
      {
        $addFields: {
          is_bestseller: { $gte: ["$sales_count", bestSellerThreshold] },
        },
      },
    ]);

    return NextResponse.json({ products, groupFilters: groupFiltersData });
  } catch (error) {
    console.log("[MEMBER:CATEGORY>PRODUCTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
