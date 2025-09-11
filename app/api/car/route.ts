import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const {
      name,
      cv,
      transmission,
      people,
      photo,
      priceDay,
      engine,
      type,
      isPublish,
    } = body;

    const car = await db.car.create({
      data: {
        userId,
        name,
        cv,
        transmission,
        people,
        photo,
        priceDay,
        engine,
        type,
        isPublish,
      },
    });

    return NextResponse.json(car);
  } catch (error) {
    console.log("[CAR_POST_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}