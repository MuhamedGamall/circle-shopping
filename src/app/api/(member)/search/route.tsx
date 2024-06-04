import { NextRequest, NextResponse } from "next/server";

import { Product } from "@/models/product";
import { groupFilters } from "@/utils/group-filters";
import mongoConnect from "@/utils/mongo-connect";
import qs from "query-string";

export async function GET(req: NextRequest) {
  try {
    await mongoConnect();

    const queryParams = qs.parse(req.nextUrl.search, {
      arrayFormat: "bracket",
      parseNumbers: true,
    });

    const defaultValues = 10e10;
    const handleArray = (value: string | string[]) => {
      return Array.isArray(value) ? value : [value];
    };
    const groupFiltersData = await groupFilters({});

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
      const filters: any = {};
      if (brand.length) {
        filters["category.brand"] = { $in: handleArray(brand) };
      }
      if (deal.length) {
        filters["price.offer.deal_type"] = { $in: handleArray(deal) };
      }
      if (colour.length) {
        filters.colour = { $in: handleArray(colour) };
      }
      if (condition.length) {
        filters.item_condition = { $in: handleArray(condition) };
      }
      if (minPrice || maxPrice) {
        filters["price.base_price"] = {
          $gte: minPrice,
          $lte: maxPrice,
        };
      }
      if (delivery) {
        filters.delivery = "free";
      }
      return filters;
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
    const bestSellerThreshold = 100;

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
    console.log("[MEMBER:SEARCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
