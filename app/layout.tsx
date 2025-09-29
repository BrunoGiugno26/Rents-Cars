import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Importamos Outfit
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"

// Definimos la fuente Outfit
const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrunoCars",
  description: "Rentals cars by Bruno Giugno",

  icons:{
    icon:[
      {
        // 🔑 Ícono principal: Usamos una alta resolución (192x192) y cambiamos el parámetro v=4
        url:"https://ik.imagekit.io/fefgntjox/Rents-Cars/untitled-0.png?updatedAt=1758552652106&v=4", 
        sizes:"192x192", 
        type:"image/png"
      },
      // 🔑 Resolución máxima (para pantallas HiDPI/Retina)
      {
        url:"https://ik.imagekit.io/fefgntjox/Rents-Cars/untitled-0.png?updatedAt=1758552652106&v=4", 
        sizes:"512x512", 
        type:"image/png"
      },
    ],
    // También es buena práctica configurarlo en 'apple'
    apple: [
      {
        url:"https://ik.imagekit.io/fefgntjox/Rents-Cars/untitled-0.png?updatedAt=1758552652106&v=4",
        sizes: "180x180",
      },
    ],
    shortcut:[],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="overflow-y-scroll">
        <body className={outfit.className}>
          <NextTopLoader color="0000"/>
          {children}
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
    );
}
