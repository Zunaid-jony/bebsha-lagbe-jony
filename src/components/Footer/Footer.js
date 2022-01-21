import React from "react";
import appstore from "../images/appstore.png";
import facebook from "../images/facebook-brands.svg";
import instagram from "../images/instagram-brands.svg";
import playstore from "../images/playstore.png";
import twitter from "../images/twitter-square-brands.svg";
import youtube from "../images/youtube-brands.svg";
import "./footer.css";

function Footer() {
  return (
    <div>
      <footer
        className="footer__parent"
        id="footer"
        style={{ backgroundColor: "#EBEEEF" }}
      >
        <div className="footer__main container-fluid pt-5">
          <div className="section__parent row">
            <section className="footer__section col-lg-3 col-md-3 col-sm-6">
              জনপ্রিয় ক্যাটাগরি
              <ul>
                <li>
                  <span className="footer__list">খামার</span>
                </li>
                <li>
                  <span className="footer__list">কারখানা</span>
                </li>
                <li>
                  <span className="footer__list">পশু-পাখি</span>
                </li>
                <li>
                  <span className="footer__list">জমি-জমা</span>
                </li>
              </ul>
            </section>
            <section className="footer__section col-lg-2 col-md-2 col-sm-6">
              ট্রেন্ডিং অনুসন্ধান
              <ul>
                <li>
                  <span className="footer__list">পশু-পাখি</span>
                </li>
                <li>
                  <span className="footer__list">জমি-জমা</span>
                </li>
                <li>
                  <span className="footer__list">গাড়ি-ট্র্যাক</span>
                </li>
                <li>
                  <span className="footer__list">হোটেল-মোটেল</span>
                </li>
              </ul>
            </section>
            <section className="footer__section col-lg-2 col-md-2 col-sm-6">
              যোগাযোগ
              <ul>
                <li>
                  <span className="footer__list">আমাদের সম্পর্কে</span>
                </li>
                <li>
                  <span className="footer__list">ফোন: +৮৮০-১৭৯০-১২৩৪৫৬</span>
                </li>
                <li>
                  <span className="footer__list">ইমেল: ইনফো@ব্যবসা.কম</span>
                </li>
                <li>
                  <span className="footer__list">
                    ঠিকানা: ঢাকা, বাংলাদেশ - ১২০৫
                  </span>
                </li>
              </ul>
            </section>
            <section className="footer__section col-lg-2 col-md-2 col-sm-6">
              বিভাগ সমূহ
              <ul>
                <li>
                  <span className="footer__list">আমাদের বৈশিষ্ট্য</span>
                </li>
                <li>
                  <span className="footer__list">সচরাচর জিজ্ঞাস্য</span>
                </li>
                <li>
                  <span className="footer__list">গোপনীয়তা নীতি</span>
                </li>
                <li>
                  <span className="footer__list">শর্তাদি & শর্তসমূহ</span>
                </li>
              </ul>
            </section>
            <section className="footer__section _2oZEg ">
              <div className="_1NJc2">
                <span className="lastHeading">সামাজিক মাধ্যম</span>
                <div className="_2lcRE mt-2">
                  <span className="footer__list">
                    <span className="footer__icon">
                      <img src={facebook} alt="" width="20" />
                    </span>
                  </span>
                  <span className="footer__list">
                    <span className="footer__icon">
                      <img src={instagram} alt="" width="20" />
                    </span>
                  </span>
                  <span className="footer__list">
                    <span className="footer__icon">
                      <img src={twitter} alt="" width="20" />
                    </span>
                  </span>
                  <span className="footer__list">
                    <span className="footer__icon">
                      <img src={youtube} alt="" width="20" />
                    </span>
                  </span>
                  <div className="mt-3">
                    <img src={appstore} alt="" className="img-fluid mr-2" />
                    <img src={playstore} alt="" className="img-fluid" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="container">
          <div className="d-flex justify-content-center">
            <p className="text-center text-secondary">
              © কপিরাইট ২০২১ ব্যবসা লাগবে কতৃক সমস্ত অধিকার সংরক্ষিত।
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
