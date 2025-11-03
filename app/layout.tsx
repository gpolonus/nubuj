import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Courier_Prime } from "next/font/google";
import "./globals.css";
import { SiteMenu } from "@/components/ui/menu";
import { createClient } from "@/utils/supabase/server";

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", '700']
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "NuBuj: Purchase Tracking Made Easy",
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
        <meta name='theme-color' content='#333333' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel='icon' type='image/png' href='/icon.png' />
      </head>
      <body className={`${courierPrime.className} antialiased`} >
        <SiteMenu isSignedIn={!user.error} />
        <main className="font-sans items-center min-h-screen p-8 pt-24 sm:p-0 sm:pt-24 pb-0 gap-8 sm:gap-16 sm:m-auto max-w-200">
          {children}
        </main>
      </body>
    </html>
  );
}
