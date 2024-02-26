import mongoConnect from "@/actions/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { Product } from "@/models/product";
import { Store } from "@/models/store";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params: { store_id } }: { params: { store_id: string } }
) {
  try {
    await mongoConnect();
    const { productBrand, subCategory, mainCategory } = await req.json();

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;

    const store = await Store.findOne({
      personal_email: email,
      _id: store_id,
    }).lean();

    if (!user || !store) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const createProduct = await Product.create({
      category: {
        main_category: mainCategory,
        sub_category: subCategory,
        brand: productBrand,
      },
      store_id,
      store_personal_email: email,
    });

    return NextResponse.json(createProduct);
  } catch (error) {
    console.log("[CREATE-PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params: { store_id } }: { params: { store_id: string } }
) {
  try {
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;

    const store = await Store.find({ _id: store_id, personal_email: email });

    if (!user || !store) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const products = await Product.find({ store_personal_email: email }).lean();

    return NextResponse.json(products);
  } catch (error) {
    console.log("[GET-PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
