"use client";
import { navLinks } from "@/data/nav";
import { ChevronDown, Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Menu as HeadlessMenu,
  Transition,
  Disclosure,
} from "@headlessui/react";
import { siteIdentity } from "@/data/siteIdentity";
import SearchInventory from "@/components/pageComponents/inventory/search/SearchInventory";
import InventoryHover from "./hoverInventory/InventoryHover";
export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inventoryHover, setInventoryHover] = useState(false);

  return (
    <header className="w-full bg-white shadow-lg">
      <div className="section-container md:h-24 h-30 text-black flex items-center justify-center">
        {/* Navbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between w-full">
          <div className="flex items-center justify-between md:justify-start w-full md:w-auto">
            {/* Logo */}
            <Link href="/">
              <img
                className="h-12 w-auto md:max-w-32 max-w-[100px] object-contain"
                src={siteIdentity.logo}
                alt={siteIdentity.siteName}
              />
            </Link>
            <button
              className="lg:hidden flex items-center px-2 py-1 ml-2"
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

          <div className="w-full md:px-6 mt-3 md:mt-0">
            <div className="mb-2 max-w-2xl">
              <SearchInventory />
            </div>
            <nav className="hidden lg:block">
                       <ul className="flex space-x-6 items-center text-gray-400 justify-center">
            {navLinks.map((nav, idx) => {
              if (nav.title && nav.title.toLowerCase() === "inventory") {
                // Inventory nav item with hover card
                return (
                  <li
                    key={idx}
                    className="relative"
                    onMouseEnter={() => setInventoryHover(true)}
                    onMouseLeave={() => setInventoryHover(false)}
                  >
                    <Link
                      href={nav.href}
                      className="text-gray-600 hover:text-gray-900 scroll-smooth tracking-tight"
                    >
                      {nav.title}
                    </Link>
                    <InventoryHover show={inventoryHover} />
                  </li>
                );
              }
              if (nav.isSubMenu) {
                return (
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
                );
              }
              return (
                <li key={idx}>
                  <Link href={nav.href} className="text-gray-600 hover:text-gray-900 scroll-smooth tracking-tight">
                    {nav.title}
                  </Link>
                </li>
              );
            })}
          </ul>
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        <Transition
          show={menuOpen}
          enter="transition ease-out duration-300"
          enterFrom="opacity-0 -translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-4"
        >
          <div className="lg:hidden bg-white absolute top-24 left-0 w-full z-40 shadow-md">
            <nav className="flex flex-col ">
              <ul className="flex flex-col  items-left gap-2 px-4 py-2 justify-center">
                {navLinks.map((nav, idx) =>
                  nav.isSubMenu ? (
                    <li key={idx}>
                      <HeadlessMenu
                        as="div"
                        className="relative inline-block w-full text-left"
                      >
                        <HeadlessMenu.Button className="flex items-center h-10 w-full justify-between text-gray-600 cursor-pointer">
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
                          <HeadlessMenu.Items className="absolute left-0 mt-2 w-48 rounded-md bg-white  shadow-lg ring-1 ring-black/10 focus:outline-none z-50">
                            {nav.subMenu?.map((item, i) => (
                              <HeadlessMenu.Item key={i}>
                                {({ focus }) => (
                                  <Link
                                    href={item.href}
                                    className={`px-4 py-3 text-sm flex items-center text-gray-600 ${
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
                    <li key={idx} className="h-10 flex items-center">
                      <Link
                        href={nav.href}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {nav.title}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
        </Transition>
      </div>
    </header>
  );
}
