import mongo_connect from "@/actions/mongo-connect";
import { authOptions } from "@/lib/auth-option";
import { Store } from "@/models/store";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await mongo_connect();
    const body = await req.json();

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const store = await Store.create({ ...body, personal_email: email });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[CREATE-STORE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await mongo_connect();
    const body = await req.json();

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;

    const store = await Store.findOne({
      personal_email: email,
    }).lean();

    if (!user || !store) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updateStore = await Store.updateOne(
      {
        personal_email: email,
      },
      body
    );

    return NextResponse.json(updateStore);
  } catch (error) {
    console.log("[UPDATE-STORE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await mongo_connect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = session?.user?.email;

    const store = await Store.findOne({
      personal_email: email,
    }).lean();

    if (!user || !store) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json(store);
  } catch (error) {
    console.log("[GET-STORE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}