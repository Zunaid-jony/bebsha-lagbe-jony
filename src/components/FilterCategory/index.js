import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Badge,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
} from "reactstrap";
import Category from "../Category/Category";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./style.css";

function Index() {
  const products = useSelector((state) => state.products);
  const { category } = useParams();
  const history = useHistory();
  const filterCategory = products.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );

  const routeHandler = (item) => {
    // window.location.href = window.location.origin;
    history.replace(`/products/${item.title}/${item.productId}`, {
      product: item,
    });
    console.log(
      `${window.location.origin}/products/${item.title}/${item.productId}`
    );
  };
  useEffect(() => {
    document.title = category;
  }, [category]);
  return (
    <>
      <Header />
      <Category />
      <div className="container-fluid mx-3 my-3 filter__section">
        <h2 className="text-dark ml-2">{category} ক্যাটাগরি</h2>
        <div className="row productRow">
          {filterCategory.map((item, i) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6"
              key={i}
              onClick={() => routeHandler(item)}
            >
              <Card>
                {item.condition === "নতুন" && (
                  <Badge
                    color="success"
                    className="product__badge text-uppercase"
                  >
                    সুগঠন বিশিষ্ট
                  </Badge>
                )}
                <CardImg
                  className="CardImg"
                  top
                  width="100%"
                  src={item.images[0]}
                  alt="Card image cap"
                />
                <CardBody className="product__cardbody">
                  <CardTitle>📣 {item.title}</CardTitle>
                  <CardSubtitle>💵 {item.price}</CardSubtitle>
                  <CardSubtitle>🏷️ {item.location}</CardSubtitle>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;
