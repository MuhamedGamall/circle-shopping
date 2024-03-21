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

    const store = await Store.findOne({ _id: store_id, personal_email: email });
    if (!email || !store || !product_id)
      return new NextResponse("Unauthorized", { status: 401 });

    // Filter images: base64 and already uploaded
    const filterImagesBase64 = body.filter(
      (image: string) =>
        image.startsWith("data:image") && image.includes("base64")
    );
    const filterImagesAlreadyUploaded = body.filter(
      (image: string) => !image.includes("base64")
    );

    const folderName = `/circle-shopping/products/${email}/${product_id}`;

    // Upload base64 images to Cloudinary
    const uploadBase64 =
      filterImagesBase64.length > 0
        ? await uploadImages({
            images: filterImagesBase64,
            folderName,
          })
        : [];

    const images = [...uploadBase64, ...filterImagesAlreadyUploaded];

    const updateProduct = await Product.updateOne(
      { store_id, store_personal_email: email, _id: product_id },
      { images, is_published: false }
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
    const ids:any= url.searchParams.get("ids");

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;

    const store = await Store.findOne({ _id: store_id, personal_email: email });
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!store || !product_id) {
      return new NextResponse("Not Found", { status: 404 });
    }
    const remove = await removeImage({
      public_ids: ids,
    });

    return NextResponse.json(remove);
  } catch (error) {
    console.error("[SELLER:DELETE-PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
