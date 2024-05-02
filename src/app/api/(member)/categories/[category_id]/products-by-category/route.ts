import { NextRequest, NextResponse } from "next/server";

import { Category } from "@/models/category";

import { Product } from "@/models/product";
import mongoConnect from "@/utils/mongo-connect";

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

    const filterCategories = {
      "main_category.name": category_id,
    };

    const findCategory = await Category.findOne(filterCategories);

    if (!findCategory) {
      return new NextResponse("Not Found", { status: 404 });
    }
    const bestSellerThreshold = 100;

    const data = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category.main_category",
          foreignField: "main_category.name",
          as: "categoryInfo",
        },
      },
      {
        $match: {
          "categoryInfo.main_category.name": category_id,
        },
      },

      {
        $group: {
          _id: {
            main_category: "$category.main_category",
            sub_category: "$category.sub_category",
          },
          products: {
            $push: "$$ROOT",
          },
        },
      },
      {
        $project: {
          _id: 1,
          products: { $slice: ["$products", 50] },
        },
      },
      {
        $project: {
          _id: 1,
          products: {
            $map: {
              input: "$products",
              as: "product",
              in: {
                $mergeObjects: [
                  "$$product",
                  {
                    is_bestseller: {
                      $gte: ["$$product.sales_count", bestSellerThreshold],
                    },
                  },
                ],
              },
            },
          },
        },
      },
    ]);
    // const products = data.products
    // const bestSellerThreshold = 100;

    // const updateData = products.map((el:any) => ({
    //   ...el,
    //   is_bestseller: el?.sales_count >=bestSellerThreshold,
    // }));

    return NextResponse.json(data);
  } catch (error) {
    console.log("[MEMBER:CATEGORY>PRODUCTS_BY_CATEGORY]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
