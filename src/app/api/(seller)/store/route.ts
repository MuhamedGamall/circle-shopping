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

    const store: any = await Store.findOne({
      personal_email: email,
    }).lean();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (store?.ban?.is_banned) {
      return new NextResponse("Forbidden", { status: 403 });
    }
    if (store) {
      return new NextResponse("Conflict", { status: 409 });
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
