export const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Inventory",
    href: "/inventory",
  },
  {
    title: "About",
    isSubMenu: true,
    subMenu: [
      {
        title: "About Dealership",
        href: "/about",
      },
      {
        title: "Team",
        href: "/about/team",
      },
      { title: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
