import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MysteryIdea - Premium Idea Marketplace",
  description:
    "Discover and unlock premium ideas from creators worldwide. Post, price, and profit from your best ideas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className="dark">
        <body
          className={`${inter.className} bg-gray-950 text-white antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
