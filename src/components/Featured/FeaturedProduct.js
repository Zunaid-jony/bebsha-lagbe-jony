import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from "reactstrap";
import noPhoto from "../../img/no-photo.jpg";
import "./featured.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function FeaturedProduct({ deviceType }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const category = useSelector((state) => state.filterCategory);

  const history = useHistory();
  const routeHandler = (item) => {
    history.replace(`/products/${item.title}/${item.productId}`, {
      product: item,
    });
  };

  return (
    <div className="featured__main">
      <h3 className="text-dark text-center pt-4">
        আপনার ব্যবসার অনুসন্ধানের উপর ভিত্তি করে
      </h3>
      <Carousel
        className="featuredParent"
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={false}
        autoPlay={deviceType !== "mobile" ? true : false}
        autoPlaySpeed={10000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={1500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {category?.map((item, i) => (
          <div key={i} onClick={() => routeHandler(item)}>
            <Card>
              <CardImg
                className="CardImg"
                top
                width="100%"
                src={item?.images ? item?.images[0] : noPhoto}
                alt={item?.title}
              />
              <CardBody className="productRow">
                <CardTitle>📣 {item?.title}</CardTitle>
                <CardSubtitle>💵 {item?.price}</CardSubtitle>
                <CardSubtitle>🏷️ {item?.location}</CardSubtitle>
              </CardBody>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default FeaturedProduct;
