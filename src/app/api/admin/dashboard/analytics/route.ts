import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { UserInfo } from "@/models/user-info";
import mongoConnect from "@/utils/mongo-connect";
import { Product } from "@/models/product";
import { Purchase } from "@/models/purchase";
import { Store } from "@/models/store";
import { User } from "@/models/user";

export async function GET(req: NextRequest) {
  try {
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = user?.email;
    const searchParams = req.nextUrl.searchParams;

    const dateFilter = searchParams.get("date_filter");

    const userInfo: any = await UserInfo.findOne({ email });

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const CEOEmailForExclusion = process.env.CEO_EMAIL;
    const matchStage: any = {};
    if (dateFilter) {
      let [startDate, endDate] = dateFilter.split(",");
      matchStage.createdAt = {
        $gte: startDate,
        $lt: endDate,
      };
    }
    const mergeOption = [
      {
        $match: matchStage,
      },
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
      {
        $match: { email: { $ne: CEOEmailForExclusion } },
      },
    ];

    // get users
    const users = await UserInfo.find(matchStage);

    // get top users
    const top_users = await UserInfo.aggregate(mergeOption)
      .sort({ total_amount_paid: -1 })
      .limit(5);

    // get top sales by country
    const top_selling_by_country: any = await Purchase.aggregate([
      {
        $match: matchStage,
      },
      {
        $group: {
          _id: "$country",
          total_sales: { $sum: "$total_amount_paid" },
          sales_count: { $sum: "$products_quantity" },
        },
      },
      {
        $sort: { sales_count: -1 },
      },
    ]).limit(50);

    const sales_analysis: any = await Purchase.aggregate([
      {
        $match: matchStage,
      },
      {
        $group: {
          _id: "$item",
          total_sales: { $sum: "$total_amount_paid" },
          sales_count: { $sum: "$products_quantity" },
        },
      },
    ]);

    // get top sellers
    const top_sellers: any = await Store.find(matchStage)
      .sort({ total_sales: -1 })
      .lean()
      .limit(5);

    // get admin length
    const admin_length = users.filter((el) => el?.admin).length;

    // get top sales
    const top_sales: any = await Product.find({
      is_published: true,
      ...matchStage,
    })
      .sort({ sales_count: -1 })
      .limit(5)
      .lean();

    // get top selling categories
    const top_selling_by_categories = await Product.aggregate([
      {
        $match: matchStage,
      },
      {
        $match: { is_published: true },
      },
      {
        $group: {
          _id: "$category.main_category",
          sales_count: { $sum: "$sales_count" },
        },
      },
      {
        $sort: { sales_count: -1 },
      },
    ]);

    return NextResponse.json({
      top_sales,
      admin_length,
      users_length: users.length,
      top_users,
      top_selling_by_categories,
      total_sales: sales_analysis?.[0]?.total_sales,
      sales_count: sales_analysis?.[0]?.sales_count,
      top_sellers,
      top_selling_by_country,
    });
  } catch (error) {
    console.log("[ADMIN:DASHBOARD-ANALYTICS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
