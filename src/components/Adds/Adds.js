import React from "react";
import VivoMobile from "../../img/bg-cover2.png";
import "./Adds.css";

function Adds() {
  return (
    <div className="mb-4">
      <h2 className="adds__title">ব্যবসা করার ডিজিটাল মাধ্যম</h2>
      <img src={VivoMobile} alt="Adds" className=" adds__container img-fluid" />
    </div>
  );
}

export default Adds;
