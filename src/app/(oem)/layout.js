import { Geist_Mono, Gabarito, Protest_Strike } from "next/font/google";
import "../globals.css";
import SiteFooter from "@/components/commonComponents/footer/SiteFooter";
import ContactBar from "@/components/commonComponents/header/ContactBar";
import GlobalRouteLoader from "@/components/commonComponents/loader/GlobalRouteLoader";

const fontSans = Gabarito({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});
const fontHeading = Protest_Strike({
  variable: "--font-for-heading",
  subsets: ["latin"],
  weight: ["400"],
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
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${fontHeading.variable} antialiased`}
      >
        <ContactBar />
        <GlobalRouteLoader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
