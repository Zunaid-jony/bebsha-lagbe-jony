import {
  faChevronDown,
  faMapMarkedAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navbar, NavbarText } from "reactstrap";
import logo from "../../img/logo.png";
import { checkUser } from "../../Redux/Actions/auth";
import { getAllProducts } from "../../Redux/Actions/Product";
import Login from "../Login/Login";
import "./Header.css";
import Sell from "./Sell.js";
import Signin from "./Signin";

function Header(props) {
  const { checkUser, getAllProducts } = props;
  const history = useHistory();

  useEffect(() => {
    checkUser();
    getAllProducts();
  }, [checkUser, getAllProducts]);

  const [isOpen, setIsOpen] = useState(false);
  const [searchField, setSearchField] = useState("");

  const toggle = () => setIsOpen(!isOpen);

  const searchProduct = () => {
    if (searchField !== "") {
      history.push(`/search/${searchField}`);
    }
  };

  return (
    <>
      <Login toggle={toggle} modal={isOpen} className="mt-4" />
      <ToastContainer />
      <Navbar color="light" light fixed="true" className="headerNavbar">
        <div className="container-fluid ContainerFluid mt-1">
          <div className="row w-100 rowParent">
            <div className="col-lg-4 col-md-3 col-sm-2 d-flex logoParent">
              <Link to="/" className="ml-2 mt-3 navbar-brand">
                <img src={logo} alt="logo" width="200px" />
              </Link>
              <div className="header__category">
                <FontAwesomeIcon
                  icon={faMapMarkedAlt}
                  size="sm"
                  className="searchIcon"
                />
                <input
                  type="text"
                  className="inputCategory"
                  defaultValue="টাঙ্গাইল"
                />
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size="lg"
                  className="header__caretDown"
                />
              </div>
            </div>
            <div className="col-lg-6 header__searchParent">
              <div className="header__search">
                <input
                  type="text"
                  className="inputSearch"
                  onChange={(e) => setSearchField(e.target.value)}
                  placeholder="জমি, পশু, খামার, ফ্যাক্টরি, কারখানা, হোটেল, গাড়ি, বাড়ি সহ আরও অনেক কিছু খুঁজুন"
                />
                <span
                  className="header__searchParent"
                  onClick={() => searchProduct()}
                >
                  <FontAwesomeIcon
                    icon={faSearch}
                    size="lg"
                    className="header__searchBtn"
                  />
                </span>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-3">
              {Object.keys(props.currentUser).length > 0 ? (
                <Signin />
              ) : (
                <div className="d-flex">
                  <Link to="/login">
                    <p className="header__login">লগইন</p>
                  </Link>
                  <Link to="/login">
                    <Sell />
                  </Link>
                </div>
              )}
            </div>
            <NavbarText></NavbarText>
          </div>
        </div>
      </Navbar>
    </>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkUser: () => dispatch(checkUser()),
    getAllProducts: () => dispatch(getAllProducts()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
