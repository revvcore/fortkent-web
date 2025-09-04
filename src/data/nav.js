export const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Products",
    isSubMenu: true,
    subMenu: [
      { title: "SmartChat", href: "/product/smart-chat" },
      { title: "SmartPass", href: "/product/smart-pass" },
      {
        title: "RevvCore",
        href: "/product/revvcore",
        isFeatured: true,
      },
    ],
  },
  {
    title: "Services",
    isSubMenu: true,
    subMenu: [
      {
        title: "Mobile Wallet Marketing",
        href: "/product/mobile-wallet-marketing",
      },
      { title: "MyCar Smart Pass", href: "/product/mycar-smart-pass" },
      { title: "Geofencing", href: "/product/geo-fencing" },
      { title: "Smart Business Card", href: "/product/smart-business-card" },
      { title: "Service Special Page", href: "/product/service-special-page" },
    ],
  },

  {
    title: "Pricing",
    href: "/pricing", // Add this new menu item
  },

  {
    title: "About",
    isSubMenu: true,
    subMenu: [
      {
        title: "About i1SmartMarketing",
        href: "/about/about-i1smartmarketing",
      },
      {
        title: "Team",
        href: "/about/team",
      },
      { title: "Privacy Policy", href: "/about/privacy-policy" },
    ],
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const signInLinks = [
  {
    title: "SmartPass",
    href: "https://smartpass.i1smartmarketing.com/en/login",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/google.svg",
    desc: "Access SmartPass for secure login and authentication.",
  },
  {
    title: "SmartChat",
    href: "https://smartchat.i1smartmarketing.com/#/login",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg",
    desc: "Join SmartChat for real-time communication and collaboration.",
  },
  {
    title: "RevvCore",
    href: "https://portal.revvcore.com/login",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg",
    desc: "Log in to RevvCore for inventory management and team collaboration.",
  },
  {
    title: "Marketing",
    href: "https://marketing.i1smartmarketing.com/",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg",
    desc: "Access the Marketing portal for campaign management and analytics.",
  },
  {
    title: "Call Monitoring",
    href: "https://calls.i1smartmarketing.com/accounts/login/?next=/",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg",
    desc: "Monitor calls and manage customer interactions with Call Monitoring.",
  },
];
