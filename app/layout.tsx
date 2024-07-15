import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/providers/theme-providers";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/nav/Navbar";
import { AppKnockProviders } from "./providers/NotificationProvider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bid Buddy",
  description:
    "Bid Buddy is a dynamic auction platform where users can sign up, place bids on listed items, create their own auctions, and receive notifications for outbids. The platform allows users to set specific end dates for their auctions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/auction.svg" />
      </head>
      <body className={`${inter.className}`}>
        {" "}
        <SessionProvider>
          <AppKnockProviders>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <Toaster />
            </ThemeProvider>
          </AppKnockProviders>
        </SessionProvider>
      </body>
    </html>
  );
}
