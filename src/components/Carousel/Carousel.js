import React, { useState } from "react";
import { Carousel, CarouselCaption, CarouselItem } from "reactstrap";
import Image3 from "../images/LoginImg/loginEntryPointChat.webp";
import Image2 from "../images/LoginImg/loginEntryPointFavorite.webp";
import Image1 from "../images/LoginImg/loginEntryPointPost.webp";
import "./Carousel.css";

const items = [
  {
    id: 1,
    altText: "ব্যবসা করার ডিজিটাল মাধ্যম আপনাকে স্বাগতম ",
    caption: "ব্যবসা করার ডিজিটাল মাধ্যম আপনাকে স্বাগতম ",
    src: Image3,
  },
  {
    id: 2,
    altText: "ব্যবসায়িক অংশীদারদের সাথে দ্রুত ডিল সম্পন্ন করুন",
    caption: "ব্যবসায়িক অংশীদারদের সাথে দ্রুত ডিল সম্পন্ন করুন",
    src: Image2,
  },
  {
    id: 3,
    altText: "আপনার ব্যবসার সমস্ত সম্পদ পেয়ে যাবেন এখানে  ",
    caption: "আপনার ব্যবসার সমস্ত সম্পদ পেয়ে যাবেন এখানে ",
    src: Image1,
  },
];
const LoginCarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item, i) => {
    return (
      <CarouselItem
        className="CarouselItem mt-2"
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={i}
      >
        <img src={item.src} alt={item.altText} className="CarouselItemImg" />
        <CarouselCaption
          className="CarouselCaption "
          captionText={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      {slides}
    </Carousel>
  );
};

export default LoginCarousel;
