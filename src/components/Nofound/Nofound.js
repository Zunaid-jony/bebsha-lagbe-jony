import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ErrorImg from "../images/404.webp";
function Nofound() {
  return (
    <div>
      <Header />

      <div className="container d-flex justify-content-center ">
        <div className="row my-5">
          <div className="col-lg-6 col-md-12">
            <h1 className="display-3">দুঃখিত!</h1>
            <h4>আমরা এটা খুঁজে পাচ্ছি না।</h4>
            <h6>আপনার অনুসন্ধান আবার চেষ্টা করুন</h6>
            <h4 className="pt-3">ত্রুটি 404!</h4>
            <h4>
              এখানে কিছু সহায়ক লিঙ্ক আছে: <Link to="/"> 🛖 হোম </Link>
            </h4>
          </div>
          <div className="col-lg-6 col-md-12">
            <img
              src={ErrorImg}
              alt="error-img"
              className="img-fluid"
              width="50%"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Nofound;
