// middleware.ts

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define las rutas que son públicas y no requieren autenticación
const isPublicRoute = createRouteMatcher([
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/trpc(.*)",
    "/api/uploadthing(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    // Si la URL es la del webhook, la ignoramos.
    if (req.nextUrl.pathname === '/api/webhook') {
        return NextResponse.next();
    }
    
    if (!isPublicRoute(req)) {
        const url = new URL(req.url);
        const { userId } = auth();

        if (!userId) {
            url.pathname = "/sign-in";
            return NextResponse.redirect(url);
        }
    }
    return NextResponse.next();
});

export const config = {
    // 🔑 SOLUCIÓN DE AISLAMIENTO: Ignora explícitamente el webhook.
    matcher: ["/((?!api/webhook|_next|static|favicon.ico|api/uploadthing).*)"],
};
