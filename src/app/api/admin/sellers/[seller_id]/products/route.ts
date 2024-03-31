import mongoConnect from "@/actions/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { Product } from "@/models/product";
import { Store } from "@/models/store";
import { UserInfo } from "@/models/user-info";
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

    const store: any = await Store.findOne({ _id: seller_id }).lean();

    const userInfo: any = await UserInfo.findOne({ email }).lean();

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!store) {
      return new NextResponse("Not Found", { status: 404 });
    }
    const products = await Product.find({
      store_personal_email: store?.personal_email,
      is_published:true
    }).lean();

    return NextResponse.json(products);
  } catch (error) {
    console.log("[ADMIN:GET-SELLER-PRODUCTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
