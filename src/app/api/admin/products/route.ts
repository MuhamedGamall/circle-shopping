import mongoConnect from "@/actions/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { Product } from "@/models/product";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const products = await Product.find({ is_published: true });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[ADMIN:GET-PRODUCTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
