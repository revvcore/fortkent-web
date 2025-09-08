export const navLinks = [
  {
    title: "Home",
    href: "/",
  },
 
   {
    title: "inventory",
    href: "/inventory",
  },
  {
     title:"Financing",
     isSubMenu:true,
     subMenu:[
      {title:"Financing", href:"/financing"},
      {title:"Pre-Qualify", href:"/financing/pre-qualify"},
      {title:"Credit Application", href:"/financing/credit-application"},
     ]
     
  },
  {
    title: "Dealership Info",
    isSubMenu: true,
    subMenu: [
      {
        title: "About",
        href: "/about",
      },
      { title: "Employment", href: "/about/employment" },
      { title: "Meet Our Staff", href: "/about/meet-our-staff" },
      { title: "Contact Us", href: "/about/contact-us" },
    ],
  },
  
];
