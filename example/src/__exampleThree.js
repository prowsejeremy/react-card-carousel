import { useRef } from "react";
import CardCarousel from "./__CardCarousel/index.tsx";

import "./example.css";

const CardCarouselExample = () => {
  const myCarouselRef = useRef();

  const settings = {
    centerMode: false,
    pagination: true,
    arrows: true,
    touchControls: true,
    gap: 20,
    padding: 0,
    yieldToImages: false,
    cardsToShow: 0,
    beforeChange: (currentIndex, newIndex) => {
      console.log("Before Change", currentIndex, newIndex);
    },
    afterChange: (newIndex) => {
      console.log("After Change", newIndex);
    },
  };

  const carouselItems = [
    {
      title: "Carousel Card 01",
      image: "https://picsum.photos/300/300",
      alt: "my image alt text",
    },
    {
      title: "Carousel Card 02",
      image: "https://picsum.photos/150/300",
      alt: "my image alt text",
    },
    {
      title: "Carousel Card 03",
      image: "https://picsum.photos/500/300",
      alt: "my image alt text",
    },
  ];

  return (
    <div className="my-inline-component">
      {/* Optionally you can define your own completely custom buttons */}
      {/* <button onClick={ () => myCarouselRef?.current?.prevCard() }>Prev</button> */}
      {/* <button onClick={ () => myCarouselRef?.current?.nextCard() }>Next</button> */}

      <div className="intro">
        <h2>Card Carousel</h2>
        <p>
          This is the intro, the content is to the right of this description and
          sits in a carousel component. As you resize the page this carousel
          should move beneath me and add arrows / pagination as needed.
        </p>
      </div>
      <CardCarousel ref={myCarouselRef} settings={settings}>
        {carouselItems?.map((card, key) => {
          return (
            <div key={key} className="my-carousel-card">
              {card.image && (
                <img src={card.image} alt={card.title || card.alt} />
              )}
              {card.title && <h4>{card.title}</h4>}
            </div>
          );
        })}
      </CardCarousel>
    </div>
  );
};

export default CardCarouselExample;
