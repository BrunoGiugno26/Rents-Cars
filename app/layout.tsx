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
  title: "Admin Bruno Giugno",
  description: "Rentals cars by Bruno Giugno",
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
