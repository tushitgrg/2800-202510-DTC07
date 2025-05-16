import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { ClientUrl } from "@/lib/urls";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Scholiast",
  description: "Making study fun!",
  openGraph: {
    title: "Scholiast",
    description: "Making study fun!",
    images: [
      {
        url: `${ClientUrl}/landing.png`,
        width: 1200,
        height: 630,
        alt: "Scholiast Preview Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scholiast",
    description: "Making study fun!",
    images: [`${ClientUrl}/landing.png`],
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <div className="flex min-h-[100dvh] items-center flex-col bg-black text-white">
          <Toaster />

          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
