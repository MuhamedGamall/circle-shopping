import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { UserInfo } from "@/models/user-info";
import mongoConnect from "@/actions/mongo-connect";

import { Store } from "@/models/store";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = user?.email;

    const userInfo: any = await UserInfo.findOne({ email });
    const query: string | null = req.nextUrl.searchParams.get("q") || "";

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
            { display_name: { $regex: regex } },
            { personal_email: { $regex: regex } },
            { business_email: { $regex: regex } },
            { finance_email: { $regex: regex } },
            { store_phone_number: { $regex: regex } },
          ],
        };
      }
    }

    const CEOEmailForExclusion = process.env.CEO_EMAIL;
    const sellers = await Store.aggregate([
      { $match: { ...filter, personal_email: { $ne: CEOEmailForExclusion } } },
    ]);

    return NextResponse.json(sellers);
  } catch (error) {
    console.log("[ADMIN:SELLERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
