// pages/pageOrderError.tsx

import { Navbar } from "@/components/Shared/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { XCircle } from "lucide-react"; // Importa un icono de error

export default function pageOrderError() {
  return (
    <div>
      <Navbar />
      <div className="p-6 mx-auto mt-10 max-w-2xl bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          {/* Ícono de error */}
          <XCircle size={64} className="text-red-500 mb-2" />

          {/* Título de error */}
          <h1 className="text-3xl font-bold">Oops! Something went wrong, please try again!</h1>

          {/* Mensaje de error */}
          <p className="text-gray-600">
            There was a problem processing your payment. Please review your details or try again later.
          </p>
          
          {/* Botón con estilo mejorado */}
          <Link href={"/"}>
            <Button className="mt-4 bg-red-600 text-white hover:bg-red-700 font-semibold px-8">
              See The Cars Again
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

