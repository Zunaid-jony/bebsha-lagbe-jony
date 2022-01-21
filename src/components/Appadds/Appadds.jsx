import React from "react";
import AppImg from "../../img/bg-cover3.jpg";
import appStoreBtn from "../images/appstore_2x.png";
import playStoreBtn from "../images/playstore_2x.png";
import "./Appadds.css";

function Appadds() {
  return (
    <div className="row mainAppAdds py-5">
      <div className="col-lg-4 col-md-12 col-12 col-sm-4">
        <img src={AppImg} alt="App Screens" className="img-fluid" />
      </div>
      <div className="col-lg-4 col-md-12 col-12 col-sm-4 mt-4">
        <h1 className="display-5 app__heading mt-5">আপনি হবেন লাভবান!</h1>
        <p>
          আমাদের এই ব্যবসার ডিজিটাল মাধ্যম ব্যবহার করে আপনি খুব দ্রুত আরো বেশী
          লাভবান হতে পারবেন এবং আপনার ব্যবসার পরিধি আরো বড় হবে।
        </p>
      </div>
      <div className="col-lg-4 col-md-12 col-12 col-sm-4 mt-4">
        <h5 className="apptoday"> আমাদের মোবাইল এপ ব্যবহার করুন </h5>
        <img
          src={playStoreBtn}
          alt="PlayStore Button"
          className="img-fluid playstorebtn"
        />
        <img
          src={appStoreBtn}
          alt="appStore Button"
          className="img-fluid appstorebtn"
        />
      </div>
    </div>
  );
}

export default Appadds;
