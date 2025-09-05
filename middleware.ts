import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define las rutas que son públicas y no requieren autenticación
const isPublicRoute = createRouteMatcher([
"/",
"/sign-in(.*)",
"/sign-up(.*)",
"/api/trpc(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
if (!isPublicRoute(req)) {
    // Si la ruta no es pública, redirige al usuario si no está autenticado
    // Esta es la forma correcta de hacerlo sin usar el método .protect()
    // en versiones más recientes de Clerk
    // Puedes reemplazar la URL de redirección si es necesario
    const url = new URL(req.url);
    const { userId } = await auth();
    if (!userId) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
    }
}
});

export const config = {
matcher: [
    // El matcher protege todas las rutas excepto las que empiezan con _next, static, o favicon.ico
    "/((?!_next|static|favicon.ico).*)",
],
};

















