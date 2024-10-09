import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { AuthProvider } from "./context/authContext";


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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
