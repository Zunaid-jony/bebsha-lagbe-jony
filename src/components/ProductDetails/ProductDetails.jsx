import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Carousel, CarouselControl, CarouselItem } from "reactstrap";
import BreadCrumb from "../BreadCrumbs/BreadCrumb";
import ProductDescription from "./ProductDescription";
import ProductDetailSectionTwo from "./SectionTwo";

const ProductDetails = () => {
  const history = useHistory();
  const param = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const {
    location: {
      state: { product },
    },
  } = history;
  const dispatch = useDispatch();
  const store = useSelector((state) => state.products);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [param]);

  useEffect(() => {
    function filterCategory(param) {
      const filterCategory1 = store.filter((item) => item.category === param);
      dispatch({ type: "SETFILTERCATEGORY", payload: filterCategory1 });
    }

    filterCategory(product.category);
    document.title = `${product.category} - ${product.title}`;
  }, [dispatch, product.category, product.title, store]);

  const next = () => {
    if (animating) return;
    if (product.images.length > 1) {
      const nextIndex =
        activeIndex === product.images.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  };

  const previous = () => {
    if (animating) return;
    if (product.images.length > 1) {
      const nextIndex =
        activeIndex === 0 ? product.images.item.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  };

  const slides = product.images.map((item, i) => {
    return (
      <CarouselItem
        className="productsCarousel"
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={i}
      >
        <img src={item} alt={item} width="100%" height="600px" />
      </CarouselItem>
    );
  });

  return (
    <>
      <BreadCrumb category={product.category} productname={product.title} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-7 col-md-12 col-12 col-sm-12">
            <Carousel activeIndex={activeIndex} next={next} previous={previous}>
              {slides}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={previous}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={next}
              />
            </Carousel>
            <ProductDescription product={product} />
          </div>
          <ProductDetailSectionTwo product={product} />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
