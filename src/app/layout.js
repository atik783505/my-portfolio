import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProvider from "@/components/ScrollProvider";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata = {
  title: "Atikur Rahman | MERN Stack Developer",
  description: "MERN Stack developer crafting immersive, high-performance, and visually stunning web applications.",
  icons: {
    icon: "/Images/atik.png",
    shortcut: "/Images/atik.png",
    apple: "/Images/atik.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-text font-outfit antialiased selection:bg-accent/30 selection:text-accent overflow-x-hidden">
        <ScrollProvider>
          <LoadingScreen />
          <ScrollProgressBar />
          <CustomCursor />
          <Background />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ScrollProvider>
      </body>
    </html>
  );
}


