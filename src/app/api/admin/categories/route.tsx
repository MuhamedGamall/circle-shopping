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

export async function POST(req: NextRequest) {
  try {
    await mongoConnect();
    const { main_category, sub_categories } = await req.json();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;

    const userInfo = await UserInfo.findOne({ email });

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const idForCloudonaryImages = randomBytes(12).toString("hex");

    const mainCatefolderName = `/circle-shopping/categories/mian-categories/${idForCloudonaryImages}`;
    const subCatesfolderName = `/circle-shopping/categories/mian-categories/sub-categories/${idForCloudonaryImages}`;

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
    const email = session?.user?.email;

    const userInfo = await UserInfo.findOne({ email });

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const categories = await Category.find();

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

    const userInfo = await UserInfo.findOne({ email });

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const getCloudinaryImagesId = await Category.findOne(
      { _id },
      { folder_cloudinary_images_id: 1 }
    );

    const mainCatefolderName = `circle-shopping/categories/mian-categories/${getCloudinaryImagesId?.folder_cloudinary_images_id}`;
    const subCatesfolderName = `circle-shopping/categories/mian-categories/sub-categories/${getCloudinaryImagesId?.folder_cloudinary_images_id}`;

    await Promise.all([
      removeFolder({ folderId: mainCatefolderName }),
      removeFolder({ folderId: subCatesfolderName }),
    ]);
    const deleteOne = await Category.deleteOne({ _id });

    return NextResponse.json(deleteOne);
  } catch (error) {
    console.log("[ADMIN:DELETE-CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
