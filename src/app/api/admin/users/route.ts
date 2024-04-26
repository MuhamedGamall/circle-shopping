import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { UserInfo } from "@/models/user-info";
import mongoConnect from "@/utils/mongo-connect";

import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = user?.email;
    const query: string | null = req.nextUrl.searchParams.get("q") || "";

    const userInfo: any = await UserInfo.findOne({ email });

    if (!user || !userInfo?.admin) {
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
            { email: { $regex: regex } },
            { name: { $regex: regex } },
            { phone: { $regex: regex } },
          ],
        };
      }
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
      {
        $match: { email: { $ne: CEOEmailForExclusion }, ...filter },
      },
    ];
    const users = await UserInfo.aggregate(mergeOption);

    return NextResponse.json(users);
  } catch (error) {
    console.log("[ADMIN:USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
