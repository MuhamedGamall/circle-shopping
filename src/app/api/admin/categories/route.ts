import mongoConnect from "@/actions/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { UserInfo } from "@/models/user-info";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Category } from "@/models/category";
import {
  removeFolder,
  uploadImages,
  uploadSubCategoryImages,
} from "@/utils/cloudinary";
import { randomBytes } from "crypto";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    await mongoConnect();
    const { main_category, sub_categories } = await req.json();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;

    const userInfo: any = await UserInfo.findOne({ email }).lean();

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const findSameMainCate = await Category.findOne({
      "main_category.name": main_category.name,
    }).lean();
    if (findSameMainCate) {
      return new NextResponse("Conflict", { status: 409 });
    }
    const idForCloudonaryImages = randomBytes(12).toString("hex");

    const mainCatefolderName = `circle-shopping/categories/${idForCloudonaryImages}/main-categories`;
    const subCatesfolderName = `circle-shopping/categories/${idForCloudonaryImages}/sub-categories`;

    // Upload base64 images to Cloudinary
    const uploadMainCategoryImage = await uploadImages({
      images: [main_category?.image],
      folderName: mainCatefolderName,
    });

    const uploadSubCategoriesimages = await uploadSubCategoryImages({
      data: sub_categories,
      folderName: subCatesfolderName,
    });
    const createCategory = await Category.create({
      main_category: { ...main_category, image: uploadMainCategoryImage?.[0] },
      sub_categories: uploadSubCategoriesimages,
      folder_cloudinary_images_id: idForCloudonaryImages,
    });

    return NextResponse.json(createCategory);
  } catch (error) {
    console.log("[ADMIN:POST-CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const query = req.nextUrl.searchParams.get("q") || "";
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let filter = {};

    if (query) {
      const regex = new RegExp(query, "i");
      if (mongoose.isValidObjectId(query)) {
        filter = { _id: query };
      } else {
        filter = {$or:[{ "main_category.name": { $regex: regex } }]}
      }
    }

    const categories = await Category.find(filter).sort(
      query ? { "main_category.name": 1 } : {}
    );

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[ADMIN:GET-CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);

    const _id = url.searchParams.get("_id");
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;

    const userInfo: any = await UserInfo.findOne({ email }).lean();

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!_id) {
      return new NextResponse("Not Found", { status: 404 });
    }
    const getCloudinaryImagesId = await Category.findOne(
      { _id },
      { folder_cloudinary_images_id: 1 }
    );

    const folderId = getCloudinaryImagesId?.folder_cloudinary_images_id;
    if (!folderId) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const folderName = `circle-shopping/categories/${folderId}`;
    await Promise.all([removeFolder({ folderId: folderName })]);
    const deleteOne = await Category.deleteOne({ _id });

    return NextResponse.json(deleteOne);
  } catch (error) {
    console.log("[ADMIN:DELETE-CATEGORY]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
