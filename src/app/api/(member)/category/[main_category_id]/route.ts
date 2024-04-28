import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/auth-option";
import { Category } from "@/models/category";
import { Product } from "@/models/product";
import mongoConnect from "@/utils/mongo-connect";
import { getServerSession } from "next-auth";

export async function GET(
  req: NextRequest,
  {
    params: { main_category },
  }: {
    params: { main_category: string };
  }
) {
  try {
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // ...(sub_category?.trim() && {
    //   sub_categories: {
    //     $elemMatch: {
    //       name: sub_category?.trim(),
    //     },
    //   },
    // }),

    const filterCategories = {
      "main_category.name": main_category,

    };
    const findCategory = await Category.findOne(filterCategories);


    
    if (!findCategory) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const bestSellerThreshold = 100;
    let products = await Product.find({
      // "category.main_category": main_category,
      // "category.sub_category": sub_category,
      is_published: true,
    }).lean();

    products = products.map((product) => ({
      ...product,
      is_bestseller: product.sales_count >= bestSellerThreshold,
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.log("[MEMBER:CATEGORY]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
