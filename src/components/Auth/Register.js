import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Form, FormGroup, Input, Label, Navbar } from "reactstrap";
import * as Yup from "yup";
import firebase from "../../config/firebase";
import logo from "../../img/logo.png";
import "./style.css";

function Userform() {
  const [downloadUrl, setDownloadUrl] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  document.title = "ব্যবসা লাগবে? - নিবন্ধন করুন";

  const onImgUpload = (e) => {
    const random = Math.random * 45545 * 54545454;
    const imgName = e.target.files[0].name + random;
    firebase
      .storage()
      .ref()
      .child(imgName)
      .put(e.target.files[0])
      .then(function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          setDownloadUrl((prevState) => [...prevState, downloadURL]);
        });
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "সর্বনিম্ন ৩ অক্ষর দিতে হবে ")
        .max(20, "সর্বোচ্চ ২০ অক্ষর দিতে হবে ")
        .required("নাম দেয়া আবশ্যক!"),
      email: Yup.string()
        .email(" ইমেলটি বৈধ নয় ")
        .required("ইমেইল দেয়া আবশ্যক!"),
      password: Yup.string()
        .min(8, "ন্যূনতম ৮ অক্ষর দিতে হবে ")
        .required("পাসওয়ার্ড দেয়া আবশ্যক!"),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      const { email, password, name } = values;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          console.log(user.uid, "USer Uid");
          const userInfo = {
            name: name,
            email: email,
            imageUrl: downloadUrl,
            uid: user.uid,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
          };
          console.log(userInfo, "REgister USer Info");
          firebase
            .database()
            .ref("/")
            .child(`users/${user.uid}`)
            .set(userInfo)
            .then(() => console.log("User Add SuccessFully"));
          dispatch({ type: "SETUSER", payload: userInfo });
          history.replace("/");
          toast.success("সফলভাবে রেজিস্ট্রেশন সম্পন্ন হয়েছে");
        })
        .catch((err) => {
          console.error("error Upload Data", err);
          toast.error("রেজিস্ট্রেশন এ ত্রুটি দেখা দিয়েছে");
        });
    },
  });

  return (
    <>
      <Navbar color="faded" light className="navbar">
        <ToastContainer />
        <Link to="/" className="postNavbar pt-2">
          <span className="pr-3">
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
        <div className="row justify-content-center mb-5">
          <div className="col-lg-6 col-md-6 col-12 background shadow mt-5 pt-2">
            <div className="text-center">
              <img src={logo} alt="logo" width="35%" />
            </div>
            <Form onSubmit={formik.handleSubmit} className="mt-2">
              <FormGroup>
                <Label for="username">আপনার নাম</Label>
                <Input
                  type="text"
                  name="name"
                  id="username"
                  placeholder="আপনার নাম লিখুন"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && formik.touched.name && (
                  <p className="text-danger  mt-2">{formik.errors.name}</p>
                )}
              </FormGroup>

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
                  <p className="text-danger  mt-2">{formik.errors.email}</p>
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
                  <p className="text-danger  mt-2">{formik.errors.password}</p>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="file">প্রোফাইল ছবি</Label>
                <Input
                  type="file"
                  name="image"
                  id="image"
                  placeholder="আপনার প্রোফাইল ছবি"
                  onChange={(e) => onImgUpload(e)}
                  required
                />
              </FormGroup>
              <button className="btn btn-success btn-block " type="submit">
                <span className="login__button"> নিবন্ধন করুন</span>
              </button>
            </Form>
            <div className="my-3 text-bold d-flex routeLink">
              <Link to="/login">
                <span className="routeLinkName">লগইন করুন</span>
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
