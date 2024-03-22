import mongoConnect from "@/actions/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { Product } from "@/models/product";
import { UserInfo } from "@/models/user-info";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;
    const userInfo:any = await UserInfo.findOne({ email }).lean()

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const product = await Product.findOne({ is_published: true });
    if (!product) {
      return new NextResponse("Not Found", { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.log("[ADMIN:GET-PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
