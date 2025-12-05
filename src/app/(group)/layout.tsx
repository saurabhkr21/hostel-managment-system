import React from "react";
// import "../styles/globals.css";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Next.js with Tailwind CSS",
  description: "A boilerplate project with Next.js and Tailwind CSS",
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <Header />
        {children}
        </body>
    </html>
  );
}
