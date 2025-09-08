"use client";
import { navLinks } from "@/data/nav";
import { ChevronDown, Search } from "lucide-react"; // ✅ Search icon added from lucide-react
import Link from "next/link";
import { useState } from "react";
import {
  Menu as HeadlessMenu,
  Transition,
  Disclosure,
} from "@headlessui/react";
import { siteIdentity } from "@/data/siteIdentity";
import SearchInventory from "@/components/pageComponents/inventory/search/SearchInventory";

export default function SiteHeader() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="w-full section-container text-black">
     

      {/* Navbar */}
      <div className="page-container flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:w-1/5">
          <img
            className="h-12 lg:h-20"
            src={siteIdentity.logo}
            alt={siteIdentity.siteName}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block md:w-4/5">
         {/* 🔍 Search Bar */}
      <div className="flex items-center justify-center p-3">
        <div className="relative w-full max-w-full">
          <SearchInventory />
        </div>
      </div>
          <ul className="flex space-x-6 items-center text-gray-400 justify-center">
            {navLinks.map((nav, idx) =>
              nav.isSubMenu ? (
                <li key={idx}>
                  <HeadlessMenu
                    as="div"
                    className="relative inline-block text-left"
                  >
                    <HeadlessMenu.Button className="flex items-center gap-1 cursor-pointer">
                      {nav.title}
                      <ChevronDown className="size-4" />
                    </HeadlessMenu.Button>
                    <Transition
                      as="div"
                      enter="transition ease-out duration-100"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <HeadlessMenu.Items className="absolute left-0 mt-2 w-48 rounded-md bg-white text-black shadow-lg ring-1 ring-black/10 focus:outline-none z-50">
                        {nav.subMenu?.map((item, i) => (
                          <HeadlessMenu.Item key={i}>
                            {({ focus }) => (
                              <Link
                                href={item.href}
                                className={`px-4 py-3 text-sm flex items-center ${
                                  focus ? "bg-gray-100" : ""
                                }`}
                              >
                                {item.title}
                                {item.isFeatured && (
                                  <div className="ml-2 rounded-full px-2 font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
                                    Featured
                                  </div>
                                )}
                              </Link>
                            )}
                          </HeadlessMenu.Item>
                        ))}
                      </HeadlessMenu.Items>
                    </Transition>
                  </HeadlessMenu>
                </li>
              ) : (
                <li key={idx}>
                  <Link href={nav.href} className="hover:text-blue-400">
                    {nav.title}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden  px-6 py-4">
          <ul className="space-y-4">
            {navLinks.map((nav, idx) =>
              nav.isSubMenu ? (
                <Disclosure key={idx} as="div">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex items-center justify-between w-full text-left">
                        {nav.title}
                        <ChevronDown
                          className={`size-4 transition-transform ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="pl-4 space-y-2">
                        {nav.subMenu?.map((item, i) => (
                          <Link
                            key={i}
                            href={item.href}
                            className="block text-sm hover:text-blue-400"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ) : (
                <li key={idx}>
                  <Link href={nav.href} className="hover:text-blue-400 block">
                    {nav.title}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
