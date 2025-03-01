import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { NextAuthProvider } from "@/components/providers/session-provider";
import { getSession } from "@/lib/auth/helpers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";
import { Toaster } from "sonner";

// Polices
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StreetVibes - Hoodies & Sweatshirts",
  description: "Confort et élégance à chaque instant.",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getSession();

  return (
    <html lang="fr" className="h-full">
      <body className={`${inter.className} h-full`}>
        <NextAuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header session={session} />
            {children}
            <Footer />
          </div>
          <Toaster position="top-center" />
        </NextAuthProvider>
      </body>
    </html>
  );
}
