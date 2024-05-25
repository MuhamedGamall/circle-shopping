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
      parseNumbers: true,
    });
    console.log(queryParams);

    const defaultValues = 10e10;
    const handleArray = (value: string | string[]) => {
      return Array.isArray(value) ? value : [value];
    };
    const {
      limit,
      brand = [],
      minPrice = groupFiltersData?.minPrice || 0,
      maxPrice = groupFiltersData?.maxPrice || defaultValues,
      deal = [],
      condition = [],
      colour = [],
      sortBy = "best-rated",
      delivery = "",
    } = queryParams as any;

    const filterCategories = {
      "main_category.name": category_id,
    };

    const findCategory = await Category.findOne(filterCategories);

    if (!findCategory) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const additionalFilters: any = {};
    if (brand.length) {
      additionalFilters["category.brand"] = { $in: handleArray(brand) };
    }
    if (deal.length) {
      additionalFilters["price.offer.deal_type"] = { $in: handleArray(deal) };
    }
    if (colour.length) {
      additionalFilters.colour = { $in: handleArray(colour) };
    }
    if (condition.length) {
      additionalFilters.item_condition = { $in: handleArray(condition) };
    }
    if (minPrice || maxPrice) {
      additionalFilters["price.base_price"] = {
        $gte: minPrice,
        $lte: maxPrice,
      };
    }
    if (delivery) {
      additionalFilters.delivery = "free";
    }

    let sortOption = {};
    if (sortBy === "newest") {
      sortOption = { createdAt: -1 };
    } else if (sortBy === "asc") {
      sortOption = { "price.base_price": 1 };
    } else if (sortBy === "desc") {
      sortOption = { "price.base_price": -1 };
    } else if (sortBy === "best-rated") {
      sortOption = { likes: -1 };
    }

    const finalFilter = { ...filter, ...additionalFilters };

    let products = await Product.aggregate([
      { $match: finalFilter },
      { $sort: sortOption },
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
