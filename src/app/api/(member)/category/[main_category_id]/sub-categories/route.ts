import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/auth-option";
import { Category } from "@/models/category";

import mongoConnect from "@/utils/mongo-connect";
import { getServerSession } from "next-auth";

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


    // ...(sub_category?.trim() && {
    //   sub_categories: {
    //     $elemMatch: {
    //       name: sub_category?.trim(),
    //     },
    //   },
    // }),

    const filterCategories = {
      "main_category.name": main_category_id,
    };

    const findCategory = await Category.findOne(filterCategories);

    if (!findCategory) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(findCategory);
  } catch (error) {
    console.log("[MEMBER:CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
