# React Card Carousel
### @jpd.nz/react-card-carousel

A basic card carousel for react, usable with items of either fixed or variable widths.

To play around with the example code, head over to the [github repo](https://github.com/prowsejeremy/react-card-carousel) and download the source. Change (cd) into the `example/` directory, run `npm install` then `npm run start`. Open `/example/src/__example.js` to modify the carousel settings.


### Install

Instal the package via npm or yarn:

~~~terminal
npm i -s '@jpd.nz/react-card-carousel'
~~~

~~~terminal
yarn add '@jpd.nz/react-card-carousel'
~~~


### Usage

~~~jsx
import { useRef } from 'react'
import CardCarousel from '@jpd.nz/react-card-carousel'

const MyComponent = () => {

  const myCarouselRef = useRef()

  const settings = {
    pagination: true,
    arrows: true,
    touchControls: true,
    buffer: 100,
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

export default MyComponent
~~~


### Optional settings

#### Presentation settings

| Property | Type | Unit | Default | Description                           |
| -------- | ---- | ---- | ------- | ------------------------------------- |
| gap | int | px | 20 | Gap size between each card/silde |
| padding | int | px | 50 | Padding value either side of the main card slider |
| cardsToShow | int | n/a | 0 | Number of cards to display in one view. Set to 0 to inherit widths from card contents and support variable widths |
| transitionSpeed | int | ms | 300 | Speed of the carousel move transition |


#### Control settings

| Property | Type | Unit | Default | Description                           |
| -------- | ---- | ---- | ------- | ------------------------------------- |
| buffer | int | px | 50 | A buffer for the edge of the carousel viewbox. If an item in the carousel overlaps the viewbox by this amount, treat it as visible and skip to show the next item on change |
| touchChangeThreshold | int | px | 100 | How far someone has to swipe on a touch device to trigger a change |
| pagination | bool | n/a | false | Enable or disable pagination |
| touchControls | bool | n/a | true | Enable or disable touch controls |
| arrows | bool | n/a | true | Enable or disable arrows |
| nextArrow | html | n/a | false | Provide custom markup for the next button |
| prevArrow | html | n/a | false | Provide custom markup for the prev button |


### Event Hooks

| Name | Description |
| ---- | ----------- |
| beforeChange | Fires just before the change takes place, returns the currentIndex and the newIndex |
| afterChange | Fires immediately after the change takes place, returns the newIndex |


### Functions

| Name | Description |
| ---- | ----------- |
| nextCard() | Change to the next card |
| prevCard() | Change to the previous card |
| goToCard(index) | Change to a specific card, ignored if card is currently in view (must provide an index) |
| getCurrentIndex() | Retrieve the current index the carousel is at |