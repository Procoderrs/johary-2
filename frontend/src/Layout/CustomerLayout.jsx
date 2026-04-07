import { Outlet } from "react-router-dom"
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import {RiSearchLine,RiUser3Line,RiHeart3Line,RiShoppingBagLine,RiArrowDropDownLine ,RiTruckLine, RiBankFill , RiDiscountPercentLine, RiCustomerServiceLine ,RiDoubleQuotesL  } from '@remixicon/react'
import Topbar from "../components/Topbar"
import Newsletter from "../components/NewsLetter"
export default function CustomerLayout(){



  const headerData = {
  logo: "/logo.svg",
  searchPlaceholder: "Search products...",
  searchIcon: RiSearchLine,
  actionIcons: [
    {
      type: "user",
      icon: RiUser3Line,
      link: "/account",
    },
    {
      type: "wishlist",
      icon: RiHeart3Line,
      link: "/wishlist",
      badge: 0,
    },
    {
      type: "cart",
      icon: RiShoppingBagLine,
      link: "/cart",
      badge: 0,
      extraText: "$0.00",
    },
  ],

  navItems: [
    { label: "Home", link: "/" },
    { label: "Shop", link: "/shop",icon: RiArrowDropDownLine , },
    { label: "Categories", link: "/categories", badge: "SALE",icon: RiArrowDropDownLine , },
    { label: "Products", link: "/products",badge: "HOT" ,icon: RiArrowDropDownLine ,},
    { label: "Top Deals", link: "/top-deals",icon: RiArrowDropDownLine ,  },
    { label: "Elements", link: "/elements",icon: RiArrowDropDownLine , },
  ],
};

const topbarData = {
  phone: "Free shipping world wide for all orders over $199",
  leftItems: [               // Left side buttons / links
    { label: "SHOP NOW", link: "/shop" },
    //{ label: "TRACK ORDER", link: "/track" }, // optional future buttons
  ],
  menuItems: [               // Right side menu
    { label: "About Us", link: "/about-us" },
    { label: "Blog", link: "/blog" },
    { label: "Contact Us", link: "/contact-us" },
    { label: "FAQs", link: "/faq" },
  ],
};

  return(
    <>
   
   
         <Topbar data={topbarData}  />
   
      {/* Shared Header */}
       <Header data={headerData} />

      {/* Page Content */}
      <main className="min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>
<Newsletter/>
      {/* Shared Footer */}
      <Footer />
    </>
  
  )
}