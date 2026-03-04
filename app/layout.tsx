import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

export const metadata: Metadata = {
  title: "NebulaLink - Free Custom URL Shortener & Link Management",
  description: "Transform long, complex URLs into clean, memorable, and trackable short links instantly with NebulaLink. Boost your digital presence, track analytics, and share effortlessly.",
  keywords: [
    "url shortener", "link shortener", "custom url", "link management", 
    "short links", "track links", "free link shortener", "custom domains",
    "QR code generator", "NebulaLink"
  ],
  authors: [{ name: "NebulaLink Team" }],
  creator: "NebulaLink",
  publisher: "NebulaLink",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "NebulaLink - Connect Your Audience Faster",
    description: "The premium free URL shortener to transform long, ugly links into clean, trackable short URLs. Elevate your digital presence today.",
    url: "https://nebulalink.com",
    siteName: "NebulaLink",
    images: [
      {
        url: "https://nebulalink.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NebulaLink URL Shortener",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NebulaLink - Free Custom URL Shortener",
    description: "Transform complex URLs into clean, manageable links. Boost your digital reach today.",
    images: ["https://nebulalink.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" />
      <body className={inter.className}>
        <AnimatedBackground />
        <Navbar />
        <main className="min-h-screen pt-20 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
