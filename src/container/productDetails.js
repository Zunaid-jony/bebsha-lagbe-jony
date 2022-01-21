import React from "react";
import Appadds from "../components/Appadds/Appadds.jsx";
import FeaturedProduct from "../components/Featured/FeaturedProduct";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ProductDetails from "../components/ProductDetails/ProductDetails.jsx";

function ProductDetailsContainer() {
  return (
    <>
      <Header />
      <ProductDetails />
      <FeaturedProduct />
      <Appadds />
      <Footer />
    </>
  );
}

export default ProductDetailsContainer;
