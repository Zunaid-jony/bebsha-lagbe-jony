import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { signOut } from "../../Redux/Actions/auth";
import avatar from "../images/avatar.png";
import Sell from "./Sell";
import "./sell.css";

function Signin(props) {
  const imgUrl = props.currentUser.imageUrl || avatar;
  return (
    <>
      <UncontrolledDropdown nav inNavbar className="d-flex">
        <DropdownToggle nav caret>
          <img
            src={imgUrl}
            alt="avatar"
            className="img-rounded border-radius-50"
            width="40"
            height="40"
          />
        </DropdownToggle>
        <Link to="/posts">
          <Sell />
        </Link>
        <DropdownMenu left={true.toString()} className="dropdown__menu">
          <DropdownItem onClick={() => props.signOut()}>লগ আউট </DropdownItem>
          <Link to="/adds">
            <DropdownItem>আমার বিজ্ঞাপন</DropdownItem>
          </Link>
        </DropdownMenu>
      </UncontrolledDropdown>
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
    signOut: () => dispatch(signOut()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
