import mongoConnect from "@/actions/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { Product } from "@/models/product";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const query: string | null = req.nextUrl.searchParams.get("q") || "";

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    let filter = {};

    if (query) {
      const regex = new RegExp(query, "i");
      if (mongoose.isValidObjectId(query)) {
        filter = { _id: new mongoose.Types.ObjectId(query) };
      } else {
        filter = {
          $or: [
            { title: { $regex: regex } },
            { "price.base_price": +query },
            { "category.main_category": { $regex: regex } },
          ],

        };
      }
    }

    const products = await Product.aggregate([{ $match: {...filter,is_published:true} }]);

    return NextResponse.json(products);
  } catch (error) {
    console.log("[ADMIN:GET-PRODUCTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
