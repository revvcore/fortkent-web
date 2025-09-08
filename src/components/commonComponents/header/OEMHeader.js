"use client";
import Link from "next/link";
import { siteIdentity } from "@/data/siteIdentity";

export default function OEMHeader({ make }) {
  return (
    <header className="w-full section-container text-black">
      {/* Navbar */}
      <div className="page-container flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:w-1/5">
          <img
            className="h-12 w-auto"
            src={siteIdentity.logo}
            alt={siteIdentity.siteName}
          />
        </Link>
        <img className="h-12 w-auto" src={make.logo} alt={make.name} />
      </div>
    </header>
  );
}
