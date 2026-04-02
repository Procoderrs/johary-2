import React from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import { productsData } from "../data/product";

export default function ProductPage() {
  const { slug } = useParams();

  const product = productsData.find((item) => item.slug === slug);

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}