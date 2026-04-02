import React from 'react';
import Topbar from '../components/Topbar';
import Header from '../components/Header';
import {RiSearchLine,RiUser3Line,RiHeart3Line,RiShoppingBagLine,RiArrowDropDownLine ,RiTruckLine, RiBankFill , RiDiscountPercentLine, RiCustomerServiceLine   } from '@remixicon/react'
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import { categoriesData } from '../data/categories';
import { productsData } from '../data/product';
import SubBanner from '../components/SubBanner';
import TrendingProducts from '../components/TrendingProducts';
import Delicate from '../components/Delicate';
import Parallax from '../components/Parallax';
import Services from '../components/Services';

const UserDashboard = () => {
 
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


const heroData=[
  {img:'/main-banner-1.jpg',heading:'Sparkle and Shine with Dazzling Jewelry',description:'lorem ipsum is simply a dummy text of printing and typesetting'},
  {img:'/main-banner-2.jpg',heading:'Glamour And Glitz to Your Style With Stunning',description:'lorem ipsum is simply a dummy text of printing and typesetting'}
]


const sub_banner=[
  {off:'UP TO 20% OFF',heading:'Gold-Plated Handcrafted Hoop Earrings',label:'SHOP NOW',link:'/shop-1',img:'/sub-banner-1-1.jpg'},
  {off:'UP TO 30% OFF', heading:' Teardrop Half Rose Gold Hoop Earrings',label:'SHOP NOW',link:'/shop-2',img:'/sub-banner-2-1.jpg'},
  {off:'UP TO 25% OFF',heading:'Fashion Gold Plated Pearls Necklaces',label:'SHOP NOW',link:'/shop-3',img:'/sub-banner-3.jpg'}
]


const delicate={
  heading:'Earrings For Sophisticated Style Delicate',
  description:'There are many variations of passages of lorem Ipsum available but the majority have suffered alteration in some form by injected humou.',
  label:'SHOP NOW',
  link:'/shop-now-4',
  img1:'/about-img-1.jpg',
  img2:'/about-img-2.jpg',
}

const parallex={
  heading:'Earrings For Sophisticated Style Delicate',
  description:'Lorem Ipsum is simply dummy text of printing & typesetting',
  label:'SHOP NOW',
  link:'/shop-5',
  img:'/parallax-banner-1.jpg'
}


const services=[
  {icon:RiTruckLine,heading:'Worldwide Shipping', description:'Contrary to popular belief lorem Ipsum is not simply',},
   {icon:RiBankFill,heading:'Money Back Guarantee', description:'Contrary to popular belief lorem Ipsum is not simply',},
   {icon: RiDiscountPercentLine,heading:'Offers And Discounts', description:'Contrary to popular belief lorem Ipsum is not simply',},
   {icon:RiCustomerServiceLine,heading:'24/7 Support Services', description:'Contrary to popular belief lorem Ipsum is not simply',},
  ]

  
  return (
    <div>
      <Topbar data={topbarData}  />
      <Header data={headerData} />
      <Hero data={heroData}/>
      <CategorySection categories={categoriesData} />
      <SubBanner data={sub_banner}/>
      <TrendingProducts products={productsData} limit={7} />
      <Delicate data={delicate}/>
      <Parallax data={parallex}/>
      <Services data={services}/>
    </div>
  );
};

export default UserDashboard;