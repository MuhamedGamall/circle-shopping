import mongoConnect from "@/utils/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { Product } from "@/models/product";
import { Store } from "@/models/store";
import { removeFolder } from "@/utils/cloudinary";
import mongoose from "mongoose";
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
      _id: store_id,
    }).lean();

    if (!user || !store) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (store?.ban?.is_banned) {
      return new NextResponse("Forbidden", { status: 403 });
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
    const query: string | null = req.nextUrl.searchParams.get("q") || "";

    const store: any = await Store.findOne({
      _id: store_id,
    }).lean();

    if (!user || !store) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (store?.ban?.is_banned) {
      return new NextResponse("Forbidden", { status: 403 });
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

    const products = await Product.aggregate([{ $match: filter }]);

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
    const searchParams = req.nextUrl.searchParams
    const product_id = searchParams.get("product_id");
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;

    const store: any = await Store.findOne({
      personal_email: email,
      _id: store_id,
    }).lean();

    if (!user || !store) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (store?.ban?.is_banned) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const product: any = await Product.findOne({
      store_id,
      store_personal_email: email,
      _id: product_id,
    }).lean();

    if (!product) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const deleteProduct = await Product.deleteOne({
      store_id,
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
