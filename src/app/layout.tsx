import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Heidi Store - B2B Wholesale Home",
  description: "High-Volume Wholesale Household Essentials. Dedicated supply chain partner for retail, property management, and hospitality.",
};

import { CartProvider } from "@/context/CartContext";
import PageTransition from "@/components/PageTransition";
import MobilePalletBar from "@/components/MobilePalletBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <CartProvider>
          <PageTransition>
            {children}
          </PageTransition>
          <MobilePalletBar />
        </CartProvider>
      </body>
    </html>
  );
}
