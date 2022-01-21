import {
  faHeart,
  faPhoneAlt,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import firebase from "../../config/firebase";
import avatar from "../images/avatar.png";
import MapImg from "../images/map.png";
import "./ProductDetails.css";

function ProductDetailSectionTwo({ product }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    firebase
      .database()
      .ref("/users")
      .child(product.uid)
      .once("value", (snapshots) => {
        setUser(snapshots.val());
      });
  }, [product.uid]);

  return (
    <div className="col-lg-5 col-12 col-md-12 product__box">
      <div className="border border-success rounded mx-2">
        <h3 className="ml-3 my-3 mb-4">{product.title}</h3>
        <div className="priceandicon">
          <div>
            <span className="ml-3 text-secondary">
              সম্পদ ইজারার ডাউন পেমেন্ট মূল্যে
            </span>
            <h5 className="ml-3 mt-2">৳ {product.price}</h5>
          </div>
        </div>
        <br />
        <div className="priceandicon mb-2">
          <div>
            <span className="ml-3 text-secondary">সম্পদের ঠিকানা</span>
            <h5 className="ml-3  mt-2">{product.location}</h5>
          </div>
          <div className="pt-3">
            <FontAwesomeIcon
              icon={faShareAlt}
              size="lg"
              className="mx-3 icon__color"
            />
            <FontAwesomeIcon
              icon={faHeart}
              size="lg"
              className="mr-4 icon__color"
            />
          </div>
        </div>
      </div>
      <div className="border border-dark rounded mx-2 my-3">
        <h5 className="ml-3 my-3 ">বিজ্ঞাপন দাতা</h5>
        <div className="avatarandname">
          <div>
            <img
              src={user.imageUrl || avatar}
              alt="user-img"
              className="img-rounded ml-3 border-radius-50"
              width="68"
              height="68"
            />
          </div>
          <div>
            <h4 className="ml-3">{user.name}</h4>
            <p className="ml-3">{new Date(user.timestamp).toDateString()}</p>
          </div>
        </div>
        <br />
        <button className="text-center chatwithSeller ml-3 mr-5 btn btn-block">
          বিজ্ঞাপন দাতার সাথে চ্যাট করুন
        </button>

        <div className="d-flex justify-content-center mb-3">
          <FontAwesomeIcon
            icon={faPhoneAlt}
            size="lg"
            className="mx-3 mt-1 icon__color"
          />
          <span className="productDetails__phoneNum">+880{product.phone}</span>
        </div>
      </div>
      <div className="border border-success rounded mx-2 p-3 pb-4 mb-5">
        <h5>পোস্ট করা হয়েছে {product.location} থেকে </h5>
        <img src={MapImg} alt="google-map" className="h-auto img-fluid mt-2" />
      </div>
    </div>
  );
}

export default ProductDetailSectionTwo;
