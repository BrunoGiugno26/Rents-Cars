import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Importamos Outfit
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

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
      <html lang="en">
        <body className={outfit.className}>
          <NextTopLoader color="0000"/>
          {children}
        </body>
      </html>
    </ClerkProvider>
    );
}
