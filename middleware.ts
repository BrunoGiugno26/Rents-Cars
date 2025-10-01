import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define las rutas que son públicas y no requieren autenticación
const isPublicRoute = createRouteMatcher([
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/trpc(.*)",
    // 🔑 Incluimos el webhook y uploadthing aquí para que la lógica interna los reconozca.
    "/api/uploadthing(.*)", 
    "/api/webhook",
]);

// 🔑 NUEVA FUNCIÓN: Identificar todas las rutas de API (incluyendo las públicas)
const isApiRoute = createRouteMatcher([
    "/api/(.*)" // Coincide con /api/uploadthing, /api/trpc, /api/checkout, etc.
])


export default clerkMiddleware(async (auth, req) => {
    // 1. ESCAPE PARA LAS APIS PÚBLICAS: Si es una ruta de API y es pública, déjala pasar.
    if (isApiRoute(req) || isPublicRoute(req)) {
        return NextResponse.next();
    }
    
    // 2. LÓGICA DE PROTECCIÓN (Solo para rutas que requieren autenticación)
    const url = new URL(req.url);
    const { userId } = auth();

    if (!userId) {
        url.pathname = "/sign-in";
        return NextResponse.redirect(url);
    }
    
    return NextResponse.next();
});

export const config = {
    // 🔑 USAMOS EL MATCHER SIMPLE: Esto permite que nuestra lógica interna de API funcione
    matcher: [
        "/((?!_next|static|favicon.ico).*)",
    ],
};
