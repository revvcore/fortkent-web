import { Geist_Mono, Manrope } from "next/font/google";
import "../globals.css";
import SiteHeader from "@/components/commonComponents/header/SiteHeader";
import SiteFooter from "@/components/commonComponents/footer/SiteFooter";

const fontSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fort Kent Powersports - Experience the family difference",
  description: "Experience the difference at Fort Kent Powersports",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        <SiteHeader/>
        {children}
        <SiteFooter/>
      </body>
    </html>
  );
}
