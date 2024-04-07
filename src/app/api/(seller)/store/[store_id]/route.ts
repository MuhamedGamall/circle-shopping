import mongoConnect from "@/actions/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { Store } from "@/models/store";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params: { store_id } }: { params: { store_id: string } }
) {
  try {
    await mongoConnect();
    const body = await req.json();

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
    const existingRecord: any = await Store.findOne({
      $or: [
        { personal_email: email },
        { business_email: body.business_email },
        { finance_email: body.finance_email },
        { store_phone_number: body.store_phone_number },
      ],
    }).lean();
    const errorsMessages = [];

    if (
      existingRecord?.business_email === body.business_email &&
      body?.business_email !== store.business_email
    )
      errorsMessages.push(
        "Your business email is already associated with a store"
      );

    if (
      existingRecord?.finance_email === body.finance_email &&
      body?.finance_email !== store.finance_email
    )
      errorsMessages.push(
        "Your Finance email is already associated with a store"
      );
    if (
      existingRecord?.store_phone_number === body.store_phone_number &&
      body?.store_phone_number!== store.store_phone_number
    )
      errorsMessages.push(
        "Your Phone number is already associated with a store"
      );
    if (
      existingRecord?.display_name === body.display_name &&
      body?.display_name!== store.display_name
    )
      errorsMessages.push(
        "Your Display name is already associated with a store"
      );

    if (errorsMessages?.length) {
      return new NextResponse(errorsMessages + "", { status: 409 });
    }

    const updateStore = await Store.updateOne({ _id: store_id }, body);

    return NextResponse.json(updateStore);
  } catch (error) {
    console.log("[SELLER:UPDATE-STORE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
