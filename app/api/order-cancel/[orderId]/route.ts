import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";

export async function DELETE(
    req: Request,
    { params }: { params: { orderId: string } }
) {
    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        // 1. Verificar si la orden existe y pertenece al usuario
        const order = await db.order.findUnique({
            where: {
                id: params.orderId,
                userId: userId, 
            },
        });

        if (!order) {
            return new NextResponse("Order not found or access denied.", { status: 404 });
        }

        // 2. Solo permitir cancelar si está en "pending"
        if (order.status !== "pending") {
            return new NextResponse("Cannot cancel a confirmed or already cancelled order.", { status: 400 });
        }
        
        // 3. Actualizar el estado a 'cancelled'
        const cancelledOrder = await db.order.update({
            where: {
                id: params.orderId,
            },
            data: {
                status: "cancelled", 
            },
        });

        console.log(`❌ Order ${params.orderId} manually CANCELLED.`);
        return NextResponse.json(cancelledOrder);

    } catch (error) {
        console.error("[ORDER_CANCEL_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}