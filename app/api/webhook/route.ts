import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import db from "@/lib/db";

const succesResponse = new NextResponse(null, { status: 200 })

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature!,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: Signature verification failed`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session?.metadata?.orderId;

    if(!orderId){
        return succesResponse
    }

    if (event.type === "checkout.session.completed") {
        if (session.payment_status === "paid") {
            try {
                const stripeTotalAmountCentavos = session.amount_total!
                const finalAmountUSD = (stripeTotalAmountCentavos / 100).toFixed(2).toString();
                await db.order.update({
                    where: { id: orderId },
                    data: {
                        status: "confirmed",
                        totalAmount: finalAmountUSD,
                    },
                });
                console.log(`✅ Order ${orderId} updated to CONFIRMED.`);

            } catch (dbError) {
                console.log("❌ ERROR CRÍTICO DE PRISMA AL ACTUALIZAR LA DB:", dbError);
                return new NextResponse("Database update failed", { status: 500 });

            }
        }
    }
    if (event.type === "checkout.session.expired") {
        try {
            await db.order.update({
                where: { id: orderId },
                data: { status: "cancelled" },
            });
            console.log(`❌ Order ${orderId} updated to CANCELLED (Expired).`);
        } catch (dbError) {
            console.error("❌ ERROR CRÍTICO DE PRISMA AL CANCELAR (Expired:", dbError);
            return new NextResponse("Darabase update failed on expire", { status: 500 });

        }
    }
    return succesResponse
}