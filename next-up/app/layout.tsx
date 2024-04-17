import { type ReactNode } from "react";
import type { Metadata } from "next";
import { Syne, Inter } from 'next/font/google';
import "./styles/globals.css";
import TopNav from './components/top-nav';
import Footer from './components/footer';

const inter = Inter({
  variable: '--font-inter',
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ["latin"],
});

const syne = Syne({
  variable: '--font-syne',
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: "nextUp - Movie App",
  description: "nextUp - Movie App picker for your next movie night",
  // openGraph: {
  //   images: [image],
  //   title: title,
  //   description: description,
  //   type: 'website',
  // },
  // twitter: {
  //   images: [image],
  //   title: title,
  //   description: description,
  //   card: 'summary_large_image',
  // },
};

type RootLayoutProps = Record<'children' | 'modal', ReactNode>

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="w-full h-screen flex flex-col justify-between gap-8 bg-gradient-to-b from-navy-800 to-navy-700 text-light-blue-300 font-body">
        <TopNav />

        <main className="p-4">{children}</main>
        {modal}

        <Footer />
      </body>
    </html>
  );
}
