import React from "react";
import Adds from "../components/Adds/Adds";
import Appadds from "../components/Appadds/Appadds.jsx";
import Banner from "../components/Banner/Banner.js";
import Category from "../components/Category/Category";
import Featured from "../components/Featured/Featured.js";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Products from "../components/Products/Products";
function Home() {
  document.title = "ব্যবসা লাগবে?";
  return (
    <>
      <Header />
      <Category />
      <Banner />
      <Adds />
      <Featured />
      <Products />
      <Appadds />
      <Footer />
    </>
  );
}

export default Home;
