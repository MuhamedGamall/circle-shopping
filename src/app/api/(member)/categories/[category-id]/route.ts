import { Category } from "@/models/category";
import mongoConnect from "@/utils/mongo-connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: {  category-id } }: { params: {  category-id: string } }
) {
  try {
    await mongoConnect();

    const filterCategories = {
      "main_category.name":  category-id,
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
