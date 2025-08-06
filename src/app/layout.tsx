import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShortPoint Standalone - Intranet Solution",
  description: "Multi-tenant SaaS intranet solution for small to medium businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasValidClerkKeys = 
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== "pk_test_placeholder"

  if (hasValidClerkKeys) {
    return (
      <ClerkProvider>
        <html lang="en">
          <body className={`${inter.className} antialiased`}>
            {children}
          </body>
        </html>
      </ClerkProvider>
    );
  }

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
