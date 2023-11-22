# React Card Carousel
### @jpd.nz/react-card-carousel

A basic card carousel for react, usable with items of either fixed or varying widths.


### Install

Instal the package via npm or yarn:

```
npm i -s @jpd.nz/react-card-carousel
```

```
yarn add @jpd.nz/react-card-carousel
```


### Usage

Example usage:

```
import { useRef } from 'react'
import CardCarousel from '@jpd.nz/react-card-carousel'

const MyComponent = () => {

  const myCarouselRef = useRef()

  const settings = {
    pagination: true,
    arrows: false,
    touchControls: true,
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
      image: '/path/to/my-image-01.jpg',
      alt: 'my image alt text'
    },
    {
      title: 'Carousel Card 02',
      image: '/path/to/my-image-02.jpg',
      alt: 'my image alt text'
    },
    {
      title: 'Carousel Card 03',
      image: '/path/to/my-image-03.jpg',
      alt: 'my image alt text'
    }
  ]

  return (
    <div className='my-component'>

      {/* Optionally you can define your own completely custom buttons */}
      <button onClick={ () => myCarouselRef?.current?.prevCard() }>Prev</button>
      <button onClick={ () => myCarouselRef?.current?.nextCard() }>Next</button>

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

export default MyComponent
```


### Optional settings

- buffer: int
  - A buffer for the edge of the carousel viewbox. If an item in the carousel overlaps the viewbox by this amount, treat it as visible and skip to show the next item on change.
- gap: int
  - Gap size between each card/silde (px)
- touchChangeThreshold: int
  - How far someone has to swipe on a touch device to trigger a change (px)
- pagination: bool
  - Enable or disable pagination
- touchControls: bool
  - Enable or disable touch controls
- arrows: bool
  - Enable or disable arrows
- nextArrow: html
  - Provide custom markup for the next button
- prevArrow: html
  - Provide custom markup for the prev button


### Event Hooks

- beforeChange: func
  - Fires just before the change takes place, returns the currentIndex and the newIndex
- afterChange: func
  - Fires immediately after the change takes place, returns the newIndex


### Functions

- nextCard()
  - Trigger change to the next card
- prevCard()
  - Trigger change to the prev card
- goToCard(index)
  - Trigger change to a specific card (must provide an index)