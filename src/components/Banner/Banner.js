import React from "react";
import BannerImg from "../../img/bg-cover1.png";
import "./Banner.css";

function Banner() {
  return (
    <>
      <div
        className="Banner__HeroImg"
        style={{ backgroundImage: `url(${BannerImg})` }}
      ></div>
    </>
  );
}

export default Banner;
