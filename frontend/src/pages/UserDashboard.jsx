import React from 'react';
import Topbar from '../components/Topbar';
import Header from '../components/Header';
import {RiSearchLine,RiUser3Line,RiHeart3Line,RiShoppingBagLine,RiArrowDropDownLine ,RiTruckLine, RiBankFill , RiDiscountPercentLine, RiCustomerServiceLine ,RiDoubleQuotesL  } from '@remixicon/react'
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import { categoriesData } from '../data/categories';
import { productsData } from '../data/product';
import SubBanner from '../components/SubBanner';
import TrendingProducts from '../components/TrendingProducts';
import Delicate from '../components/Delicate';
import Parallax from '../components/Parallax';
import Services from '../components/Services';
import CmsBanner from '../components/CmsBanner';
import Signed from '../components/Signed';
import BlogSlider from "../components/Blog/BlogSlider";
import { blogsData } from "../data/blogs";
import Newsletter from '../components/NewsLetter';

const UserDashboard = () => {
 
 




const heroData=[
  {img:'/main-banner-1.jpg',heading:'Glamour And Glitz to Your Style With Stunning',description:'lorem ipsum is simply a dummy text of printing and typesetting',label:'SHOP NOW',link:'/shop'},

  {img:'/main-banner-2.jpg',heading:'Sparkle And Shine With Dazzling Jewellary',description:'lorem ipsum is simply a dummy text of printing and typesetting',label:'SHOP NOW',link:'/shop'}
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

  const cms={
  img_1:'/cms-banner-1.jpg',
  discount:'20% SALE EVENT  THIS WEEKEND',
  heading:'Best Charms Embracing The Essence Of Classic Style',
  img_2:'/cms-banner-2-1.jpg',
  discount:'30% SALE EVENT  THIS WEEKEND',
  heading:'Radiant Adornments Adding Glamour To Your Ensemble',


}

const signed={
  icon:RiDoubleQuotesL,
  description:"There are many passengets of lorem ipsum available but the majorityy suffered alteration in some form by injected humour or random words which don't look even slighlty believable. ",
  name:[
    'Mr. Meckdom Mery','Stefaine Rashford','Augusta Wind',
  ],
  designation:[
     'Designer','Founder','CEO'
  ],
  logos:['/1.png','/2.png','/3.png','/4.png','/5.png','/1.png','/2.png','/3.png','/4.png','/5.png']
}


  
  return (
    <div>
    
      <Hero data={heroData}/>
      <CategorySection categories={categoriesData} />
      <SubBanner data={sub_banner}/>
      <TrendingProducts products={productsData} limit={7} />
      <Delicate data={delicate}/>
      <Parallax data={parallex}/>
      <Services data={services}/>
      <TrendingProducts products={productsData} title="Featured Products" subtitle="Best Collection" showTabs={false}filterTrending={false} />
      <CmsBanner data={cms}/>
      <Signed data={signed}/>
      <BlogSlider blogs={blogsData} />
      



    </div>
  );
};

export default UserDashboard;