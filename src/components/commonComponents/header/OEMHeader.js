"use client";
import Link from "next/link";
import { siteIdentity } from "@/data/siteIdentity";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import StyledButton from "../actions/buttons/StyledButton";

export default function OEMHeader({ make }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-xl">
      <div className="section-container h-24 flex flex-row justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              className="h-12 w-auto md:max-w-32 max-w-[100px] object-contain"
              src={siteIdentity.logo}
              alt={siteIdentity.siteName}
            />
          </Link>
          <img
            className="h-12 w-auto md:max-w-32 max-w-[100px] object-contain"
            src={make.logo}
            alt={make.make}
          />
        </div>
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4">
          {oemMenu.map((menu, idx) =>
            menu.isButton ? (
              <Link
                key={idx}
                href={menu.href}
                onClick={() => setMenuOpen(false)}
              >
                <StyledButton size="sm">{menu.name}</StyledButton>
              </Link>
            ) : (
              <Link
                key={idx}
                href={menu.href}
                className="text-gray-600 hover:text-gray-900 scroll-smooth tracking-tight"
              >
                {menu.name}
              </Link>
            )
          )}
        </div>
        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex items-center px-2 py-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t fixed top-32 left-0 w-full z-40 shadow-md">
          <nav className="flex flex-col gap-2 px-4 py-2">
            {oemMenu.map((menu, idx) =>
              menu.isButton ? (
                <Link
                  key={idx}
                  href={menu.href}
                  onClick={() => setMenuOpen(false)}
                >
                  <StyledButton className="w-full">{menu.name}</StyledButton>
                </Link>
              ) : (
                <Link
                  key={idx}
                  href={menu.href}
                  className="text-gray-600 hover:text-gray-900 scroll-smooth py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {menu.name}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

const oemMenu = [
  { name: "Home", href: "/" },
  { name: "Explore Inventory", href: "#inventory" },
  { name: "Models", href: "#models" },
  { name: "Special Offers", href: "#offers" },
  { name: "Schedule a Service Appointment", href: "/service", isButton: true },
];
