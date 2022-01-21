import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import "./BreadCrumbs.css";

const BreadCrumb = ({ category, productname }) => {
  return (
    <div className="breadcrumb__section">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">
            <span className="pl-4">হোম</span>
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={`/category/${category}`}>
            <span>{category}</span>
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <span>{productname}</span>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumb;
