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
     title:"Service & Parts",
     isSubMenu:true,
     subMenu:[
      {title:"Schedule a Service Appointment", href:"/schedule-a-service-appointment"},
      {title:"Order a Parts", href:"/order-a-part"},
   
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
    {
    title: "Customer Corner",
    isSubMenu: true,
    subMenu: [
    
      { title: "Dealership Events", href: "/dealership-events" },
      { title: "Customer Reviews", href: "/customer-reviews" },
     
    ],
  },
  
];
