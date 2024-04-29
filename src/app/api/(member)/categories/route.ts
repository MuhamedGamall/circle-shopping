import { Category } from "@/models/category";
import mongoConnect from "@/utils/mongo-connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await mongoConnect();

    const categories = await Category.find();
    return NextResponse.json(categories);
  } catch (error) {
    console.log("[MEMBER:GET-CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
