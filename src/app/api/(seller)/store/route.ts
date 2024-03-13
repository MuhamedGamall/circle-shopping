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

    const store = await Store.findOne({
      personal_email: email,
    });

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (store) {
      return new NextResponse("Conflict", { status: 409 });
    }

    const create = await Store.create({ ...body, personal_email: email });

    return NextResponse.json(create);
  } catch (error) {
    console.log("[CREATE-STORE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// export async function GET(req: NextRequest) {
//   try {
//     await mongoConnect();
//     const session = await getServerSession(authOptions);
//     const user = session?.user;
//     const email = session?.user?.email;

//     const store = await Store.findOne({
//       personal_email: email,
//     }).lean();

//     if (!user) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }
//     if (!store) {
//       return new NextResponse("Not Found", { status: 404 });
//     }
//     return NextResponse.json(store);
//   } catch (error) {
//     console.log("[GET-STORE]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }
