import mongoConnect from "@/actions/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { UserInfo } from "@/models/user-info";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Category } from "@/models/category";
import {
  removeImage,
  uploadImages,
  uploadSubCategoryImages,
} from "@/utils/cloudinary";

export async function PATCH(
  req: NextRequest,
  { params: { category_id } }: { params: { category_id: string } }
) {
  try {
    await mongoConnect();
    const {
      main_category,
      sub_categories,
      categoriesIdsForDeleteFromCloudinary,
    } = await req.json();

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;

    const userInfo: any = await UserInfo.findOne({ email }).lean();

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const category = await Category.findOne({ _id: category_id }).lean();
    if (!category) {
      return new NextResponse("Not Found", { status: 404 });
    }
    
    const getCloudinaryImagesId = await Category.findOne(
      { _id: category_id },
      { folder_cloudinary_images_id: 1 }
    );

    const folderId = getCloudinaryImagesId?.folder_cloudinary_images_id;
    if (!folderId) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const mainCatefolderName = `circle-shopping/categories/${folderId}/main-categories`;
    const subCatesfolderName = `circle-shopping/categories/${folderId}/sub-categories`;
    if (categoriesIdsForDeleteFromCloudinary?.length)
      await removeImage({ public_ids: categoriesIdsForDeleteFromCloudinary });

    const uploadMainCategoryImage = await uploadImages({
      images: [main_category?.image],
      folderName: mainCatefolderName,
    });

    const uploadSubCategoriesimages = await uploadSubCategoryImages({
      data: sub_categories,
      folderName: subCatesfolderName,
    });

    const updateCategory = await Category.updateOne({
      main_category: { ...main_category, image: uploadMainCategoryImage?.[0] },
      sub_categories: uploadSubCategoriesimages,
      folder_cloudinary_images_id: folderId,
    });

    return NextResponse.json(updateCategory);
  } catch (error) {
    console.log("[ADMIN:PATCH-CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params: { category_id } }: { params: { category_id: string } }
) {
  try {
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;
    const userInfo: any = await UserInfo.findOne({ email }).lean();

    if (!user || !userInfo?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const category = await Category.findOne({ _id: category_id }).lean();
    if (!category) {
      return new NextResponse("Not Found", { status: 404 });
    }
    return NextResponse.json(category);
  } catch (error) {
    console.log("[ADMIN:GET-CATEGORY]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
