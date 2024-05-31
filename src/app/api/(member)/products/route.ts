import { NextRequest, NextResponse } from "next/server";

import { Product } from "@/models/product";
import { groupFilters } from "@/utils/group-filters";
import mongoConnect from "@/utils/mongo-connect";
import qs from "query-string";

export async function GET(req: NextRequest) {
  try {
    await mongoConnect();
    const mainCategory = req.nextUrl.searchParams.get("mainCategory");
    const subCategory = req.nextUrl.searchParams.get("subCategory");
    const getRole = req.nextUrl.searchParams.get("role")||''

    let filter: any = {
      ...(mainCategory && { "category.main_category": mainCategory }),
      ...(subCategory && { "category.sub_category": subCategory }),
      is_published: true,
    };

    const bestSellerThreshold = 100;
    const dealThreshold = 1;

    // if (!["bestsellers", "deals", "all_products"].includes(getRole )) {
    //   return new NextResponse("Not Found", { status: 404 });
    // }

    if (getRole === "bestsellers")
      filter.sales_count = { $gte: bestSellerThreshold };
    else if (getRole === "deals")
      filter["price.offer.discount_percentage"] = { $gte: dealThreshold };

    const groupFiltersData = await groupFilters({ filter });

    const queryParams = qs.parse(req.nextUrl.search, {
      arrayFormat: "bracket",
      parseNumbers: true,
    });

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

    const handleFilters = () => {
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
      const finalFilter = { ...filter, ...additionalFilters };
      return finalFilter;
    };

    const handleSort = () => {
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
      return sortOption;
    };
    console.log({ $match: handleFilters() },
    { $sort: handleSort() });

    let products = await Product.aggregate([
      { $match: handleFilters() },
      { $sort: handleSort() },
      { $limit: +(limit || defaultValues) },
      {
        $addFields: {
          is_bestseller: { $gte: ["$sales_count", bestSellerThreshold] },
        },
      },
    ]);

    return NextResponse.json({ products, groupFilters: groupFiltersData });
  } catch (error) {
    console.log("[MEMBER:PRODUCTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
