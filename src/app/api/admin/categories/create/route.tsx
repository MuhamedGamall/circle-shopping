import mongoConnect from "@/actions/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { UserInfo } from "@/models/user-info";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Category } from "@/models/category";
import { uploadImages, uploadSubCategoryImages } from "@/utils/cloudinary";

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

    const mainCatefolderName = `/circle-shopping/categories/mian-categories`;
    const subCatesfolderName = `/circle-shopping/categories/mian-categories/sub-categories`;

    // Upload base64 images to Cloudinary

    const uploadMainCategoryImage = await uploadImages({
      images: [main_category?.image],
      folderName: mainCatefolderName,
    });

    const uploadSubCategoriesimages = await uploadSubCategoryImages({
      data: sub_categories,
      folderName: subCatesfolderName,
    })

    const createCategory = await Category.create({
      main_category: { ...main_category, image: uploadMainCategoryImage?.[0] },
      sub_categories: uploadSubCategoriesimages,
    });

    return NextResponse.json(createCategory);
  } catch (error) {
    console.log("[ADMIN:NOTIFIACTIN]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
