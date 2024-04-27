import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

import mongoConnect from "@/utils/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { UserInfo } from "@/models/user-info";
import { getServerSession } from "next-auth";
import { Product } from "@/models/product";
import { Category } from "@/models/category";

export async function GET(
  req: NextRequest,
  {
    params: { category },
  }: {
    params: { category: string | string[] };
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

    let [main_category, sub_category] = Array.isArray(category)
      ? category
      : [category];

    const filterCategories = {
      "main_category.name": main_category,

      ...(sub_category?.trim() && {
        sub_categories: {
          $elemMatch: {
            name: sub_category?.trim(),
          },
        },

      }),
   
    };
    const findCategory = await Category.findOne(filterCategories);
    if (!findCategory) {
      return new NextResponse("Not Found", { status: 404 });
    }
    const products = await Product.find(
      {
      // "category.main_category": main_category,
      // "category.sub_category": sub_category,
      is_published:true
    }
  );

    return NextResponse.json(products);
  } catch (error) {
    console.log("[MEMBER:CATEGORY]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
