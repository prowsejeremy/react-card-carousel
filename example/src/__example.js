import { useRef } from 'react'
import CardCarousel from "./__CardCarousel/index.tsx"

import './example.css'

const CardCarouselExample = () => {

  const myCarouselRef = useRef()

  const settings = {
    pagination: true,
    arrows: true,
    touchControls: true,
    gap: 20,
    padding: 80,
    slidesToShow: 0,
    beforeChange: (currentIndex, newIndex) => {
      console.log('Before Change', currentIndex, newIndex)
    },
    afterChange: (newIndex) => {
      console.log('After Change', newIndex)
    }
  }

  const carouselItems = [
    {
      title: 'Carousel Card 01',
      image: 'https://picsum.photos/301/150',
      alt: 'my image alt text'
    },
    {
      title: 'Carousel Card 02',
      image: 'https://picsum.photos/300/150',
      alt: 'my image alt text'
    },
    {
      title: 'Carousel Card 03',
      image: 'https://picsum.photos/302/150',
      alt: 'my image alt text'
    },
    {
      title: 'Carousel Card 04',
      image: 'https://picsum.photos/299/150',
      alt: 'my image alt text'
    },
    {
      title: 'Carousel Card 05',
      image: 'https://picsum.photos/298/150',
      alt: 'my image alt text'
    },
    {
      title: 'Carousel Card 06',
      image: 'https://picsum.photos/303/150',
      alt: 'my image alt text'
    }
  ]

  return (
    <div className='my-component'>

      {/* Optionally you can define your own completely custom buttons */}
      {/* <button onClick={ () => myCarouselRef?.current?.prevCard() }>Prev</button> */}
      {/* <button onClick={ () => myCarouselRef?.current?.nextCard() }>Next</button> */}

      <CardCarousel ref={myCarouselRef} settings={settings}>
        {
          carouselItems?.map((card, key) => {
            return (
              <div key={key} className='my-carousel-card'>
                <img src={card.image} alt={card.title || card.alt} />
                { card.title && <p>{card.title}</p> }
              </div>
            )
          })
        }
      </CardCarousel>
    </div>
  )
}

export default CardCarouselExample