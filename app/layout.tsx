import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteMenu } from "@/components/ui/menu";
import { createClient } from "@/utils/supabase/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nubuj: Purchase Tracking Made Easy",
  description: "Purchase Tracking Made Easy",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
console.log({user})
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        <SiteMenu isSignedIn={!user.error} />
          <main className="font-sans items-center min-h-screen p-8 pt-24 pb-0 gap-8 sm:p-28 sm:gap-16 sm:max-w-[50vw] sm:m-auto">
            {children}
          </main>
      </body>
    </html>
  );
}
