import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Form, FormGroup, Input, Label, Navbar, Spinner } from "reactstrap";
import * as Yup from "yup";
import firebase from "../../config/firebase";
import logo from "../../img/logo.png";
import "./style.css";

function Posts(props) {
  const [fileDownlodedUrl, setfileDownlodedUrl] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { currentUser } = props;
  useEffect(() => {
    if (Object.keys(currentUser).length < 1) {
      history.push("/");
    }
  }, [currentUser, history]);

  const onFileChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile["id"] = Math.random();
      const random = Math.random * 45545 * 54545454;
      const imgName = e.target.files[i].name + random;
      firebase
        .storage()
        .ref()
        .child(imgName)
        .put(e.target.files[i])
        .then(function (snapshot) {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            setfileDownlodedUrl((prevState) => [...prevState, downloadURL]);
          });
        });
    }
  };

  const formik = useFormik({
    initialValues: {
      category: "",
      title: "",
      price: "",
      description: "",
      condition: "",
      new: true,
      phone: "",
      location: "",
    },

    validationSchema: Yup.object({
      category: Yup.string().required("বিভাগ নির্বাচন করা আবশ্যক!"),
      title: Yup.string().required("বিজ্ঞাপনের শিরোনাম নাম দেয়া আবশ্যক!"),
      description: Yup.string().required(
        "সম্পদের বিস্তারিত বর্ণনা দেয়া আবশ্যক!"
      ),
      location: Yup.string().required("আপনার ঠিকানা দেয়া আবশ্যক!"),
      phone: Yup.string()
        .min(10, "ন্যূনতম ১১ অক্ষর দিতে হবে")
        .max(13, "সর্বোচ্চ ১৩ অক্ষর দিতে হবে")
        .required("আপনার ফোন নম্বর দেয়া আবশ্যক!"),
      price: Yup.string()
        .required("সম্পদ ইজারার ডাউন পেমেন্ট মূল্যে দেয়া আবশ্যক!")
        .min(2, "ন্যূনতম ২ অক্ষর দিতে হবে"),
    }),
    onSubmit: (values) => {
      setSpinner(true);
      var productId = firebase.database().ref("/allassets").push().key;
      var db = firebase.database().ref("/allassets").child(productId);
      const { uid } = firebase.auth().currentUser;
      const record = { ...values, images: fileDownlodedUrl, productId, uid };

      db.set(record)
        .then(function (docRef) {
          console.log("Product Add Succesfully", docRef);
          history.push("/adds");
          toast.success("বিজ্ঞাপনটি সফলভাবে আপলোড হয়েছে ");
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
          setSpinner(false);
          toast.error("বিজ্ঞাপন আপলোড করতে ত্রুটি দেখা দিয়েছে");
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
          <img src={logo} alt="logo" width="12%" />
        </Link>
      </Navbar>
      <div className="display__font">
        <div className="row justify-content-center">
          {spinner ? (
            <Spinner className="post__spinner" type="grow" color="success" />
          ) : (
            <div className="col-lg-6 col-md-6 col-12 background shadow mt-4 mb-5">
              <Form onSubmit={formik.handleSubmit}>
                <FormGroup>
                  <h3
                    htmlFor="title"
                    className="text-center text-uppercase mt-3 py-3 shadow"
                  >
                    আপনার বিজ্ঞাপন পোস্ট করুন
                  </h3>
                  <hr />
                  <Label htmlFor="category">
                    সম্পদের ক্যাটাগরি সিলেক্ট করুন
                  </Label>
                  <Input
                    type="select"
                    name="category"
                    value={formik.values.category}
                    id="category"
                    onChange={formik.handleChange}
                  >
                    <option>ক্যাটাগরি সিলেক্ট করুন</option>
                    <option>জমি-জমা</option>
                    <option>পশু-পাখি</option>
                    <option>খামার</option>
                    <option>কারখানা</option>
                    <option>হোটেল-মোটেল</option>
                    <option>গাড়ি-ট্র্যাক</option>
                    <option>বাসা-বাড়ি</option>
                  </Input>
                  {formik.errors.category && formik.touched.category && (
                    <p className="text-danger mt-2">{formik.errors.category}</p>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="title">বিজ্ঞাপনের শিরোনাম</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="বিজ্ঞাপনের শিরোনাম লিখুন"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.title && formik.touched.title && (
                    <p className="text-danger  mt-2">{formik.errors.title}</p>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="description">সম্পদের বিস্তারিত বর্ণনা</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    placeholder="সম্পদের বিস্তারিত বর্ণনা লিখুন"
                    defaultValue={formik.values.description}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.description && formik.touched.description && (
                    <p className="text-danger  mt-2">
                      {formik.errors.description}
                    </p>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="price">সর্বনিম্ন ডাউন পেমেন্ট</Label>
                  <Input
                    type="text"
                    name="price"
                    id="price"
                    placeholder="সম্পদ ইজারার ডাউন পেমেন্ট মূল্যে লিখুন"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                  />

                  {formik.errors.price && formik.touched.price && (
                    <p className="text-danger  mt-2">{formik.errors.price}</p>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="file">সম্পদের ছবি দিন</Label>
                  <Input
                    type="file"
                    multiple
                    onChange={onFileChange}
                    name="file"
                    id="file"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="file">সম্পদের অবস্থা</Label>
                  <Input
                    type="select"
                    name="condition"
                    value={formik.values.condition}
                    id="condition"
                    onChange={formik.handleChange}
                  >
                    <option>নতুন</option>
                    <option>ব্যবহৃত </option>
                  </Input>
                </FormGroup>
                <hr />
                <h4 className="pt-3">আপনার বিবরণ পর্যালোচনা করুন</h4>
                <FormGroup>
                  <Label htmlFor="phone">আপনার ফোন নম্বর</Label>
                  <Input
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="আপনার ফোন নম্বর লিখুন"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />

                  {formik.errors.phone && formik.touched.phone && (
                    <p className="text-danger  mt-2">{formik.errors.phone}</p>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="location">আপনার ঠিকানা</Label>
                  <Input
                    type="text"
                    name="location"
                    id="location"
                    placeholder="আপনার ঠিকানা লিখুন"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                  />

                  {formik.errors.location && formik.touched.location && (
                    <p className="text-danger  mt-2">
                      {formik.errors.location}
                    </p>
                  )}
                </FormGroup>
                <input
                  type="submit"
                  className="text-center chatwithSeller btn btn-block w-100"
                  value="এখনই পোস্ট করুন"
                />
              </Form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}
export default connect(mapStateToProps, null)(Posts);
