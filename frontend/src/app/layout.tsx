import type { Metadata } from "next";
import "./style/layout.css";
import "./style/typography.css";
import "./style/globals.css";
import Navbar from "./components/Navbar";
import { ReactNode } from "react";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Sound Sensei",
  description: "Online store for headphones",
};

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
