import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/auth-option";
import { Category } from "@/models/category";

import mongoConnect from "@/utils/mongo-connect";
import { getServerSession } from "next-auth";
import { Product } from "@/models/product";

export async function GET(
  req: NextRequest,
  {
    params: { main_category_id },
  }: {
    params: { main_category_id: string };
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
    const bestSellerThreshold = 100;

    const filterCategories = {
      "main_category.name": main_category_id,
    };

    const findCategory = await Category.findOne(filterCategories);

    if (!findCategory) {
      return new NextResponse("Not Found", { status: 404 });
    }
    const filterProducts = {
      // "category.main_category": main_category_id,
      sales_count: { $gte: bestSellerThreshold },
      is_published: true,
    };

    let products = await Product.find(filterProducts).limit(20).lean()
    products = products.map((el, i) => ({ ...el, is_bestseller: true }));
    return NextResponse.json(products);
  } catch (error) {
    console.log("[MEMBER:CATEGORY>BESTSELLERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
