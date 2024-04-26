import mongoConnect from "@/utils/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { Product } from "@/models/product";
import { Store } from "@/models/store";
import { UserInfo } from "@/models/user-info";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { seller_id } }: { params: { seller_id: string } }
) {
  try {
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;
    const query: string | null = req.nextUrl.searchParams.get("q") || "";

    const store: any = await Store.findOne({ _id: seller_id }).lean();

    const userInfo: any = await UserInfo.findOne({ email }).lean();

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!store) {
      return new NextResponse("Not Found", { status: 404 });
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
    const products = await Product.aggregate([
      {
        $match: {
          ...filter,
          is_published: true,
          store_id: store?._id + "",
          store_personal_email: store?.personal_email,
        },
      },
    ]);

    return NextResponse.json(products);
  } catch (error) {
    console.log("[ADMIN:GET-SELLER-PRODUCTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
