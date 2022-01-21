import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, FormGroup, Input, Label, Navbar } from "reactstrap";
import * as Yup from "yup";
import firebase from "../../config/firebase";
import logo from "../../img/logo.png";
import LoginCarousel from "../Carousel/Carousel";
import "./style.css";

function Userform() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  document.title = "ব্যবসা লাগবে? - লগইন করুন";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(" ইমেলটি বৈধ নয়")
        .required("ইমেইল দেয়া আবশ্যক!"),
      password: Yup.string()
        .min(8, "ন্যূনতম ৮ অক্ষর দিতে হবে")
        .required("পাসওয়ার্ড দেয়া আবশ্যক!"),
    }),
    onSubmit: (values) => {
      // console.log(JSON.stringify(values));
      const { email, password } = values;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          const userID = user.user.uid;
          firebase
            .database()
            .ref("/")
            .child(`users/${userID}`)
            .once("value", (snapshot) => {
              const userInfo = snapshot.val();
              console.log(userInfo, "USer Info Login Page");
              dispatch({ type: "SETUSER", payload: userInfo });
              history.push("/posts");
              console.log("firebase Login Successfully");
              toast.success("সফলভাবে লগ ইন হয়েছে");
            });
        })
        .catch((err) => {
          console.log(err, "firebases Login error");
          toast.error("লগইন এ ত্রুটি দেখা দিয়েছে");
        });
    },
  });

  return (
    <>
      <Navbar color="faded" light className="navbar">
        <ToastContainer />
        <Link to="/" className="postNavbar pt-2">
          <span className="pr-3 ">
            <FontAwesomeIcon
              icon={faArrowLeft}
              size="lg"
              className="faArrowLeft"
            />
          </span>
          <img src={logo} alt="logo" width="10%" />
        </Link>
      </Navbar>

      <div className="display__font">
        <div className="row justify-content-center pt-5">
          <div className="col-lg-6 col-md-6 col-12 background shadow mb-5 pt-2">
            <div className="text-center">
              <img src={logo} alt="logo" width="40%" />
            </div>
            <LoginCarousel />
            <Form onSubmit={formik.handleSubmit}>
              <FormGroup>
                <Label for="exampleEmail">ইমেইল</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="আপনার ইমেইল লিখুন"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-danger pt-2">{formik.errors.email}</p>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="password">পাসওয়ার্ড</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />

                {formik.errors.password && formik.touched.password && (
                  <p className="text-danger pt-2">{formik.errors.password}</p>
                )}
              </FormGroup>
              <button className="btn btn-success btn-block " type="submit">
                <span className="login__button">লগইন করুন</span>
              </button>
            </Form>
            <div className="my-3 text-bold routeLink">
              <Link to="/register">
                <span className="routeLinkName">নিবন্ধন করুন </span>
              </Link>
              <Link to="/">
                <span className="routeLinkName">হোমপেজে যান </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Userform;
