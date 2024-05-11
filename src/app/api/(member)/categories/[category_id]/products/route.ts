import { NextRequest, NextResponse } from "next/server";

import { Category } from "@/models/category";

import { Product } from "@/models/product";
import mongoConnect from "@/utils/mongo-connect";
import { groupFilters } from "@/utils/group-filters";
import qs from "query-string";

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

    const bestSellerThreshold = 100;
    const dealThreshold = 1;
    const getRole = req.nextUrl.searchParams.get("role");

    if (getRole === "bestsellers")
      filter.sales_count = { $gte: bestSellerThreshold };
    else if (getRole === "deals")
      filter["price.offer.discount_percentage"] = { $gte: dealThreshold };

    const groupFiltersData = await groupFilters({ filter: filter });

    const queryParams = qs.parse(req.nextUrl.search, {
      arrayFormat: "bracket",
    });
    const defaultValues = 10e10;

    const {
      limit,
      role = "",
      brand = [],
      minPrice = groupFiltersData?.minPrice || 0,
      maxPrice = groupFiltersData?.maxPrice || defaultValues,
      deals = "",
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

    let products = await Product.aggregate([
      { $match: {...filter} },
      { $limit: +(limit || defaultValues) },
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
