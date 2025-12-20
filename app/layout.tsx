import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zyrr Gallery",
  description: "Gallery-first digital poster marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Elms+Sans:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
            
            .elms-sans-display {
              font-family: "Elms Sans", sans-serif;
              font-optical-sizing: auto;
              font-weight: 400;
              font-style: normal;
            }
            
            .open-sans-body {
              font-family: "Open Sans", sans-serif;
              font-optical-sizing: auto;
              font-weight: 400;
              font-style: normal;
              font-variation-settings: "wdth" 100;
            }
          `}
        </style>
      </head>
      <body
        className={`elms-sans-display antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
