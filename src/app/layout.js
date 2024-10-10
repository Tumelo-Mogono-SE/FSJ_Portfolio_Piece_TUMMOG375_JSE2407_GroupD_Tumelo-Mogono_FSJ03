import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { AuthProvider } from "./context/authContext";
import PWAInstallPrompt from "@/components/PWAInstallation";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "SwiftCart E-commerce Store",
  description: "Welcome to our e-commerce store, offering great products.",
  keywords: "e-commerce, products, buy online, shopping",
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png"></link>
      <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png"></link>
      <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png"></link>
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png"></link>
      <link rel="icon" type="image/png" sizes="48x48" href="/icons/favicon-48x48.png"></link>
      <link rel="icon" type="image/png" sizes="144x144" href="/icons/ms-icon-144x144.png"></link>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PWAInstallPrompt />
        <AuthProvider>
          <NavBar />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
