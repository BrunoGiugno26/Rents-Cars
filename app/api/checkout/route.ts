import Stripe from "stripe"
import { NextResponse } from "next/server"

import {stripe} from "@/lib/stripe"
import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
// La importación de 'url' de 'inspector' no es necesaria y se elimina (la quito)

const corsHeaders = {
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":"Content-Type, Authorization"
}

// 🏆 DEFINICIÓN DE FUNCIÓN CORREGIDA
export async function POST(
    req: Request,
    { params }: { 
        params: {
            carId: string;
            priceDay: string;
            startDate: Date; // Usamos Date si es el tipo que esperas, o string si viene del JSON.
            endDate: Date;   // Asumimos que no hay errores de sintaxis aquí.
            carName: string;
        } 
    }
) {
    const {userId} = auth()
    const {carId, priceDay, startDate, endDate, carName} = await req.json()

    if(!userId){
        return new NextResponse("Unauthorized",{ status:401 })
    }

    if(!carId){
        return new NextResponse("Car id are required" , {status:401}) 
    }

    // Nota: Aquí se asume que startDate y endDate son strings si vienen de req.json()
    // Si vienen como strings, esta conversión es necesaria:
    const start = new Date(startDate as unknown as string) 
    const end = new Date(endDate as unknown as string)

    const numberOfDays = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 *60 *60 *24)
    );

    const totalAmount = Number(priceDay) * numberOfDays
    
    // CORRECCIÓN DE LÓGICA: Monto en centavos (USD * 100)
    const totalAmountStripe = Math.round(totalAmount * 100); 

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
        {
            quantity: 1,
            price_data: {
                currency: "usd",
                product_data: {
                    name: carName
                },
                unit_amount: totalAmountStripe 
            }
        }
    ]

    // 🏆 ESTADO: La orden empieza en pending.
    const order = await db.order.create({
        data: {
            carId,
            carName:carName,
            userId:userId,
            status:"confirmed", 
            totalAmount:totalAmount.toString(),
            orderDate:startDate,
            orderEndDate:endDate,
        }
    })

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode:"payment",
        billing_address_collection:"required",
        phone_number_collection:{
            enabled:true,
        },
        success_url:`${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/order-confirmation`,
        cancel_url:`${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/order-error`,
        
        // Metadata para el webhook
        metadata:{
            orderId: order.id,
            carId: carId,
            startDate,
            endDate,
            numberOfDays
        }
    })

    return NextResponse.json({url: session.url},{
        headers:corsHeaders
    })
}