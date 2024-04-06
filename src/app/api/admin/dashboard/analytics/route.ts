import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { UserInfo } from "@/models/user-info";
import mongoConnect from "@/actions/mongo-connect";
import { Product } from "@/models/product";
import { Purchase } from "@/models/purchase";
import { Store } from "@/models/store";

export async function GET(req: NextRequest) {
  try {
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = user?.email;

    const userInfo: any = await UserInfo.findOne({ email });

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const CEOEmailForExclusion = process.env.CEO_EMAIL;

    const mergeOption = [
      {
        $lookup: {
          from: "users",
          localField: "email",
          foreignField: "email",
          as: "users",
        },
      },
      {
        $unwind: "$users",
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: ["$$ROOT", "$users"] },
        },
      },
      {
        $project: { users: 0 },
      },
    ];

    // get users
    const users = await UserInfo.aggregate(mergeOption)
      .match({ email: { $ne: CEOEmailForExclusion } })
      .sort({ total_purchase: -1, total_paid: -1 });

    // get top sales
    const top_sales: any = await Product.find()
      .sort({ total_sales: -1 })
      .lean();

    // get total sales by country
    const top_selling_by_country: any = await Purchase.aggregate([
      {
        $group: {
          _id: "$country",
          total_purchase: { $sum: "$total_purchase" },
          total_sales: { $sum: "$products_quantity" },
        },
      },
      {
        $sort: { total_purchase: -1 },
      },
    ]);

    // get total sales
    const total_sales = top_selling_by_country.reduce(
      (a: number, c: any) => a + c.products_quantity,
      0
    );

    // get total purchase
    const total_purchase = top_selling_by_country.reduce(
      (a: number, c: any) => a + c.total_purchase,
      0
    );

    // get top sellers
    const top_sellers: any = await Store.find()
      .sort({ total_sales: -1, likes: -1 })
      .lean();

    // get admin length
    const admin_length = users.filter((el) => el?.admin).length;

    // get top selling categories
    const top_selling_by_categories = top_sales.map((el: any) => ({
      cateogry: el.category,
      total_purchase: el.total_purchase,
    }));

    return NextResponse.json({
      top_sales,
      admin_length,
      users_length: users.length,
      top_users: users,
      top_selling_by_categories,
      total_sales,
      total_purchase,
      top_sellers,
      top_selling_by_country,
    });
  } catch (error) {
    console.log("[ADMIN:DASHBOARD-ANALYTICS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
