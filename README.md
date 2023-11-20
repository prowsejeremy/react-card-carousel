# React Card Carousel
### react-card-carousel

A basic card carousel for react.

### Install

Instal package via npm or yarn:

```
  npm i -s https://github.com/prowsejeremy/react-card-carousel
```

```
  yarn add https://github.com/prowsejeremy/react-card-carousel
```

### Usage

Example usage:

```
  import CardCarousel from 'react-card-carousel'

  const MyComponent = () => {

    const carouselItems = [
      {
        title: 'Carousel Card 01',
        image: '/path-to/my-image01.jpg',
        alt: 'my image alt text'
      },
      {
        title: 'Carousel Card 02',
        image: '/path-to/my-image02.jpg',
        alt: 'my image alt text'
      },
      {
        title: 'Carousel Card 03',
        image: '/path-to/my-image03.jpg',
        alt: 'my image alt text'
      }
    ]

    return (
      <CardCarousel>
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
    )
  }

  export default MyComponent
```

### Optional parameters

- nextArrow / prevArrow
  - HTML or component to be renered as the next or prev arrow respectively.
- buffer
  - A buffer for the edge of the carousel viewbox. If an item in the carousel overlaps the viewbox by this amount, treat it as visible and skip to show the next item on change.