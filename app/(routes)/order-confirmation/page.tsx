// pages/orderConfirmationPage.tsx

import { Navbar } from "@/components/Shared/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function orderConfirmationPage() {
  return (
    <div>
      <Navbar />
      <div className="p-6 mx-auto mt-10 max-w-2xl bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          {/* Ícono de éxito */}
          <CheckCircle2 size={64} className="text-green-500 mb-2" />

          {/* Título mejorado */}
          <h1 className="text-3xl font-bold">¡¡Thanks you for trusting us!!</h1>
          
          {/* Mensajes con mejor espaciado */}
          <p className="text-gray-600">
            In a few minutes you will receive all the information for your
            email.
          </p>
          <p className="text-gray-600">
            You can view all your reservations in your client area.
          </p>

          {/* Botón con estilo mejorado */}
          <Link href={"/"}>
            <Button className="mt-4 bg-green-600 text-white hover:bg-green-700 font-semibold px-8">
              See The Cars Again
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
