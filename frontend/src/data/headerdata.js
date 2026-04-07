import {
  RiSearchLine,
  RiUser3Line,
  RiHeart3Line,
  RiShoppingBagLine,
  RiArrowDropDownLine,
} from "@remixicon/react";

export const headerData = {
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
    { label: "Shop", link: "/shop", icon: RiArrowDropDownLine },
    {
      label: "Categories",
      link: "/categories",
      badge: "SALE",
      icon: RiArrowDropDownLine,
      megaMenu: true,
    },
    {
      label: "Products",
      link: "/products",
      badge: "HOT",
      icon: RiArrowDropDownLine,
    },
    { label: "Top Deals", link: "/top-deals", icon: RiArrowDropDownLine },
    { label: "Elements", link: "/elements", icon: RiArrowDropDownLine },
  ],
};