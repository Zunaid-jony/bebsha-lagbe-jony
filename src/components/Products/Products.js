import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Badge,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
} from "reactstrap";
import noPhoto from "../../img/no-photo.jpg";
import loadingImage from "../../img/village.webp";
import "./style.css";

function Products(props) {
  const history = useHistory();
  const routeHandler = (item) => {
    history.push(`products/${item.title}/${item.productId}`, { product: item });
  };
  return (
    <div className="container-fluid mx-3 products__section">
      <h3
        className={
          props?.products.length === 0 ? "mt-3" : "text-dark ml-2 pb-2"
        }
      >
        সকল বিজ্ঞাপন সমূহ
      </h3>
      <div className="row productRow">
        {props?.products?.map((item, i) => (
          <div className="col-md-3" key={i} onClick={() => routeHandler(item)}>
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
                src={item?.images ? item?.images[0] : noPhoto}
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
        {props?.products.length === 0 ? (
          <div className="d-flex align-items-center justify-content-center">
            <div className="my-5 text-center">
              <img
                src={loadingImage}
                className="img-fluid mx-auto d-block"
                alt="loading-img"
                width="50%"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     getAllProducts: () => dispatch(getAllProducts()),
//   };
// }

export default connect(mapStateToProps, null)(Products);
