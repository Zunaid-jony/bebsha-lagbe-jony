import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  facebookLogin,
  githubLogin,
  googleLogin,
} from "../../Redux/Actions/auth";
import "./Button.css";

function LoginButton(props) {
  const history = useHistory();
  return (
    <div>
      <Link to="/login">
        <button className="loginBtn">
          <span className="text-center">ইমেইল দিয়ে সাইন ইন করুন</span>
        </button>
      </Link>
      <button className="loginBtn" onClick={() => props.googleLogin(history)}>
        <span className="text-center">গুগল দিয়ে সাইন ইন করুন </span>
      </button>
      <button className="loginBtn" onClick={() => props.facebookLogin(history)}>
        <span className="text-center">ফেসবুক দিয়ে সাইন ইন করুন</span>
      </button>
      <button
        className="loginBtn mb-2"
        onClick={() => props.githubLogin(history)}
      >
        <span className="text-center">গিটহাব দিয়ে সাইন ইন করুন</span>
      </button>
      <span className="text-center detailMsg">
        আমরা আপনার ব্যক্তিগত তথ্য কারো সাথে শেয়ার করব না
      </span>
    </div>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    facebookLogin: (history) => dispatch(facebookLogin(history)),
    googleLogin: (history) => dispatch(googleLogin(history)),
    githubLogin: (history) => dispatch(githubLogin(history)),
  };
}
export default connect(null, mapDispatchToProps)(LoginButton);
