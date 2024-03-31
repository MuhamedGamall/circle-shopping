import mongoConnect from "@/actions/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { Store } from "@/models/store";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await mongoConnect();
    const body = await req.json();

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
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
    if (existingRecord?.personal_email === email)
      errorsMessages.push(
        "Your personal email is already associated with a store"
      );
    console.log(existingRecord?.personal_email, email);

    if (existingRecord?.business_email === body.business_email)
      errorsMessages.push(
        "Your business email is already associated with a store"
      );
    if (existingRecord?.finance_email === body.finance_email)
      errorsMessages.push(
        "Your Finance email is already associated with a store"
      );
    if (existingRecord?.store_phone_number === body.store_phone_number)
      errorsMessages.push(
        "Your Phone number  is already associated with a store"
      );

    if (errorsMessages?.length) {
      return new NextResponse(errorsMessages + "", { status: 409 });
    }

    const create = await Store.create({ ...body, personal_email: email });

    return NextResponse.json(create);
  } catch (error) {
    console.log("[SELLER:CREATE-STORE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await mongoConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;

    const store: any = await Store.findOne({
      personal_email: email,
    }).lean();

    if (!user || !store) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (store?.ban?.is_banned) {
      return new NextResponse(store?.ban?.reason, {
        status: 403,
        statusText: "Forbidden",
      });
    }
    return NextResponse.json(store);
  } catch (error) {
    console.log("[SELLER:GET-STORE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
