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

    const store = await Store.findOne({
      personal_email: email,
      _id: store_id,
    }).lean();

    if (!user || !store) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updateStore = await Store.updateOne(
      {
        personal_email: email,
        _id: store_id,
      },
      body
    );

    return NextResponse.json(updateStore);
  } catch (error) {
    console.log("[UPDATE-STORE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
