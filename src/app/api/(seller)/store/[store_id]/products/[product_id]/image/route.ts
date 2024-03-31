import mongoConnect from "@/actions/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { Product } from "@/models/product";
import { Store } from "@/models/store";
import { removeImage, uploadImages } from "@/utils/cloudinary";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  {
    params: { store_id, product_id },
  }: { params: { store_id: string; product_id: string } }
) {
  try {
    await mongoConnect();

    const body = await req.json();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    const store: any = await Store.findOne({
      personal_email: email,
      _id: store_id,
    }).lean();

    if (!email || !store) {
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

    const folderName = `/circle-shopping/products/${email}/${product_id}`;

    const uploadImage = await uploadImages({
      images: body,
      folderName,
    });

    const updateProduct = await Product.updateOne(
      { store_id, _id: product_id },
      { images: uploadImage, is_published: false }
    );

    return NextResponse.json(updateProduct);
  } catch (error) {
    console.error("[SELLER:PATCH-IMAGES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// delete from cloudinary database
export async function DELETE(
  req: NextRequest,
  {
    params: { store_id, product_id, ids },
  }: { params: { store_id: string; product_id: string; ids: any } }
) {
  try {
    await mongoConnect();

    const url = new URL(req.url);
    const ids: any = url.searchParams.get("ids");

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

    if (!store || !product_id) {
      return new NextResponse("Not Found", { status: 404 });
    }
    if (ids?.length) {
      const remove = await removeImage({
        public_ids: ids,
      });

      return NextResponse.json(remove);
    }
  } catch (error) {
    console.error("[SELLER:DELETE-PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
