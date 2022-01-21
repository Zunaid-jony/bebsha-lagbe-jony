import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Badge,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
} from "reactstrap";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import noAdds from "../images/myadds.webp";
import "./style.css";
function MyAdds() {
  const currentUser = useSelector((state) => state.currentUser);
  const history = useHistory();
  if (Object.keys(currentUser).length < 1) {
    history.push("/");
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = useSelector((state) => state.products);
  const routeHandler = (item) => {
    history.push(`products/${item.title}/${item.productId}`, { product: item });
  };
  console.log(products, "curent User From no Adds");
  const [userProducts, setUserProducts] = useState([]);
  const [userHaveProducts, setUserHaveProducts] = useState(false);

  useEffect(() => {
    if (Object.keys(currentUser.length > 0)) {
      const filterProduct = products.filter(
        (item) => item.uid === currentUser.uid
      );
      setUserProducts(filterProduct);
      if (filterProduct) {
        setUserHaveProducts(true);
      }
    }
  }, [currentUser.length, currentUser.uid, products]);

  return (
    <div className="no-adds-text ">
      <Header />
      {userHaveProducts ? (
        <div className="container-fluid mx-3">
          <h2 className="text-dark ml-2 my-3">আপনার বিজ্ঞাপন সমূহ </h2>
          <div className="row productRow mt-3 mb-4">
            {userProducts.map((item, i) => (
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
                    <CardTitle>📣 {item?.title}</CardTitle>
                    <CardSubtitle>💵 {item?.price}</CardSubtitle>
                    <CardSubtitle>🏷️ {item?.location}</CardSubtitle>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <center className="mb-5 no-adds-text">
          <img
            src={noAdds}
            alt="no-adds"
            className="img-fluid py-5"
            width="30%"
          />
          <h4 className="adds__heading">আপনি এখনও কিছু তালিকাভুক্ত করেন নি!</h4>
          <p className="adds__text">আপনার বিজ্ঞাপন দিন এখনই </p>
          <Link to="/posts">
            <button className="adds-btn">বিজ্ঞাপন দিন</button>
          </Link>
        </center>
      )}

      <Footer />
    </div>
  );
}

export default MyAdds;
