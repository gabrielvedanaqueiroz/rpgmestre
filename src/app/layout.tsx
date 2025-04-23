import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/sidebar/";
// import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "RPGMestre",
  description: "Organizador do mestre de RPG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <style type="text/css">
          @import url('https://fonts.googleapis.com/css2?family=Julee&display=swap');
        </style>
      </head>
      <body className="app-container">
        <Sidebar/>

        {children}
        {/* <ToastContainer/> */}
      </body>
    </html>
  );
}
