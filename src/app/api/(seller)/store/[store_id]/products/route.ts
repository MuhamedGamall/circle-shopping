import mongoConnect from "@/actions/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { Product } from "@/models/product";
import { Store } from "@/models/store";
import { removeFolder } from "@/utils/cloudinary";
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

    const store: any = await Store.findOne({
      personal_email: email,
      _id: store_id,
    }).lean();

    if (store?.ban?.is_banned) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!store) {
      return new NextResponse("Not Found", { status: 404 });
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
    console.log("[SELLER:CREATE-PRODUCT]", error);
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

    const store: any = await Store.findOne({
      personal_email: email,
      _id: store_id,
    }).lean();

    if (store?.ban?.is_banned) {
      return new NextResponse("Forbidden", { status: 403 });
    }
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!store) {
      return new NextResponse("Not Found", { status: 404 });
    }
    const products = await Product.find({
      store_id,
      store_personal_email: email,
    }).lean();

    return NextResponse.json(products);
  } catch (error) {
    console.log("[SELLER:GET-PRODUCTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params: { store_id } }: { params: { store_id: string } }
) {
  try {
    await mongoConnect();
    const url = new URL(req.url);
    const product_id = url.searchParams.get("product_id");
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;

    const store: any = await Store.findOne({
      personal_email: email,
      _id: store_id,
    }).lean();
    if (store?.ban?.is_banned) {
      return new NextResponse("Forbidden", { status: 403 });
    }
    const product: any = await Product.findOne({
      store_id,
      store_personal_email: email,
      _id: product_id,
    }).lean();
    
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!store || !product) {
      return new NextResponse("Not Found", { status: 404 });
    }
    const deleteProduct = await Product.deleteOne({
      store_id,
      store_personal_email: email,
      _id: product_id,
    });
    const folderId = `circle-shopping/products/${email}/${product_id}`;
    if (product?.images?.length) {
      await removeFolder({ folderId });
    }
    return NextResponse.json(deleteProduct);
  } catch (error) {
    console.log("[SELLER:DELETE-PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
