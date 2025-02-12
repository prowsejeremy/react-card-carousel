import { useRef } from "react";
import CardCarousel from "../__CardCarousel";

import { ImperitiveHandleInterface } from "../__CardCarousel/types.ts";

import "./example.css";

const CardCarouselExample = () => {
  const myCarouselRef = useRef<ImperitiveHandleInterface>(null);

  const settings = {
    centerMode: false,
    pagination: true,
    arrows: true,
    touchControls: true,
    gap: 0,
    padding: 0,
    yieldToImages: false,
    cardsToShow: 1,
    beforeChange: (currentIndex, newIndex) => {
      console.log("Before Change", currentIndex, newIndex);
    },
    afterChange: (newIndex) => {
      console.log("After Change", newIndex);
    },
  };

  const carouselItems: { image: string; alt: string }[] = [
    {
      image: "https://picsum.photos/1920/802",
      alt: "my image alt text",
    },
    {
      image: "https://picsum.photos/1920/801",
      alt: "my image alt text",
    },
    {
      image: "https://picsum.photos/1920/804",
      alt: "my image alt text",
    },
    {
      image: "https://picsum.photos/1920/799",
      alt: "my image alt text",
    },
    {
      image: "https://picsum.photos/1920/798",
      alt: "my image alt text",
    },
  ];

  return (
    <div className="my-component-full-width">
      <div className="intro">
        <h2>Full Width Slider</h2>
      </div>
      {/* Optionally you can define your own completely custom buttons */}
      {/* <button onClick={ () => myCarouselRef?.current?.prevCard() }>Prev</button> */}
      {/* <button onClick={ () => myCarouselRef?.current?.nextCard() }>Next</button> */}

      <CardCarousel ref={myCarouselRef} settings={settings}>
        {carouselItems?.map((card, key) => {
          return (
            <div key={key} className="my-carousel-card">
              {card.image && <img src={card.image} alt={card.alt} />}
            </div>
          );
        })}
      </CardCarousel>
    </div>
  );
};

export default CardCarouselExample;
