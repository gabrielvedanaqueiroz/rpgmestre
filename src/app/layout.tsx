import "./globals.css";
import type { Metadata, Viewport } from "next";
import Sidebar from "@/components/sidebar/";
// import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "RPGMestre",
  description: "Organizador do mestre de RPG",
  creator: 'Gabriel Vedana Queiroz',
  generator: 'Next.js- VSCode',
  applicationName: 'RPGMestre',
};

export const viewport: Viewport = {
  themeColor: '#004953',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({  children, }: Readonly<{  children: React.ReactNode; }>) {
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
