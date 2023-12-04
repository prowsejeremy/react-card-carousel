import {
  SettingsInterface,
  PropsInterface,
  ImperitiveHandleInterface
} from './types.ts'

import {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle
} from 'react'

import ArrowButtons from './components/arrowButtons.tsx'
import Pagination from './components/pagination.tsx'

import {
  itemInView,
  getMoveVal
} from './helpers.ts'

import './styles.scss'

const CardCarousel = forwardRef<ImperitiveHandleInterface, PropsInterface>((props, carouselRef) => {

  const {
    children,
    settings
  } = props

  const defaultSettings: SettingsInterface = {
    // Presentation settings
    buffer: 50, // buffer for whether to switch to next card if it sits right on the border of the viewbox (px)
    gap: 20, // gap size between each card/silde (px)
    padding: 50, // padding either side of the viewbox.
    cardsToShow: 0, // Defines the width of each card, if set to 0 the width will be inherited from the each cards children
    transitionSpeed: 300, // speed for transitions (ms)
    
    // Control settings
    touchChangeThreshold: 100, // how far someone has to swipe on a touch device to trigger a change (px)
    pagination: false,
    touchControls: true,
    arrows: true, // enable or disable arrows
    nextArrow: null, // provide custom markup for the next button
    prevArrow: null, // provide custom markup for the prev button

    // Events
    beforeChange: null, // fires just before change
    afterChange: null // fires just after change
  }

  const [config, setConfig] = useState<SettingsInterface>({
    ...defaultSettings,
    ...settings
  })

  const [itemWidth, setItemWidth] = useState<number>(0)
  const [itemsWrapperWidth, setItemsWrapperWidth] = useState<number>(0)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [transitionIndex, setTransitionIndex] = useState<number>(0)
  const [itemCount, setItemCount] = useState<number>(0)

  const carouselItemsRef = useRef<HTMLDivElement | null>(null)
  const carouselWrapperRef = useRef<HTMLDivElement | null>(null)


  useEffect(() => {
    setConfig({
      ...defaultSettings,
      ...settings
    })
  }, [settings])


  useEffect(() => {
    if (!children?.length) return
    if (itemCount !== children.length-1) {
      setItemCount(children.length-1)
    }
  }, [children])


  // Set inital width for the carousel items
  useEffect(() => {
    if (itemCount !== 0 && itemsWrapperWidth === 0) {
      getItemsWrapperWidth()
    }
  }, [carouselItemsRef.current, itemCount])


  // Set inital width for each card, if applicable
  useEffect(() => {
    if (config.cardsToShow !== 0 && itemWidth === 0) {
      getItemWidth()
    }
  }, [carouselWrapperRef.current])


  // Add window resize listener
  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }

  }, [typeof window !== undefined])

  
  // Handle resize of browser window
  const handleResize = () => {
    getItemWidth()
    getItemsWrapperWidth(true)
  }


  // Trigger move logic when the transition index changes
  useEffect(() => {
    handleMove(transitionIndex)
  }, [transitionIndex])


  // If cardsToShow has been set, calculate the width of each item based on the viewBox size.
  const getItemWidth = () => {
    if (config.cardsToShow !== 0 && carouselWrapperRef.current) {
      const carouselWrapperBox = carouselWrapperRef.current.getBoundingClientRect()
      setItemWidth(carouselWrapperBox.width/config.cardsToShow)
    }
  }


  // Check for the presense of images in the card content,
  // wait for them to load before calculating width of cards.
  const checkIfCardImagesLoaded = (element:Element) => {
    const hasImages = element.getElementsByTagName('img')

    if (!hasImages || typeof hasImages !== 'object') return Promise.resolve(true)

    return Promise.all(
      Array.from(hasImages).map((img) =>
        new Promise(resolve => { img.onload = img.onerror = resolve; })
      )
    )
  }


  // Get the inital wrapper width based on the width of all children with their associated padding values
  const getItemsWrapperWidth = (onResize=false) => {
    if ((onResize && config.cardsToShow === 0) || !carouselItemsRef.current) return
    
    const carouselChildren = carouselItemsRef.current.children;
    const paddingWidth = config.gap * itemCount;

    if (carouselChildren) {
      let carouselWidth = 0;

      Promise.all(
        Array.from(carouselChildren).map((child) =>
          checkIfCardImagesLoaded(child).then(() => {
            const childBox = child.getBoundingClientRect()
            carouselWidth += itemWidth || childBox.width
          })
        )
      ).then(() => {
        console.log('all loaded!', carouselWidth)
        setItemsWrapperWidth(carouselWidth + paddingWidth)
      })
    }
  }

  // Main movement function that actually updates index and position values
  const handleMove = (index) => {

    if (
      currentIndex === index ||
      !carouselItemsRef.current ||
      !carouselWrapperRef.current
    ) return

    const dir = index > currentIndex ? 'next' : 'prev'

    const currentItem = carouselItemsRef.current.children.item(index)
    
    if (!currentItem) return

    const currentItemBox = currentItem.getBoundingClientRect()
    const carouselWrapperBox = carouselWrapperRef.current.getBoundingClientRect()

    if (itemInView(currentItemBox, carouselWrapperBox, config.buffer)) {
      if (dir === 'next') {
        return setTransitionIndex(transitionIndex+1)
      } else {
        return setTransitionIndex(transitionIndex-1)
      }
    } else {
      
      // trigger beforeChange listener
      config.beforeChange && config.beforeChange(currentIndex, transitionIndex)

      const moveVal = getMoveVal(currentItem, carouselWrapperBox, dir)
      carouselItemsRef.current.style.transform = `translateX(${moveVal}px)`
    }

    setCurrentIndex(transitionIndex)
    
    // trigger afterChange listener
    config.afterChange && config.afterChange(transitionIndex)
  }


  // Touch Controls
  let touchStartVal = 0
  const handleTouchStart = (e) => {
    if (!config.touchControls) return
    
    touchStartVal = e.changedTouches[0].clientX
  }


  const handleTouchEnd = (e) => {
    if (!config.touchControls) return
    
    let touchEndVal = e.changedTouches[0].clientX
    let touchDelta = touchEndVal-touchStartVal

    if (touchDelta > config.touchChangeThreshold) {
      return handleMoveInteract('prev')
    } else if (touchDelta * -1 > config.touchChangeThreshold) {
      return handleMoveInteract('next')
    }
  }


  // Generic movement function called by next / prev movement interactions.
  const handleMoveInteract = (dir) => {
    let changedIndex = 0

    if (dir === 'next') {
      changedIndex = currentIndex+1 < itemCount ? currentIndex+1 : itemCount
    } else {
      changedIndex = currentIndex-1 > 0 ? currentIndex-1 : 0
    }

    return setTransitionIndex(changedIndex)
  }


  // Interaction functions
  const nextCard = () => handleMoveInteract('next')
  const prevCard = () => handleMoveInteract('prev')
  const goToCard = (index) => {
    if (
      !carouselItemsRef.current || 
      !carouselWrapperRef.current  
    ) return
    const currentItem = carouselItemsRef.current.children.item(index)
    const currentItemBox = currentItem.getBoundingClientRect()
    const carouselWrapperBox = carouselWrapperRef.current.getBoundingClientRect()
    if (!itemInView(currentItemBox, carouselWrapperBox, config.buffer)) {
      setTransitionIndex(index)
    }
  }


  // Pass functions to external
  useImperativeHandle(carouselRef, () => ({
    nextCard,
    prevCard,
    goToCard: (index) => goToCard(index),
    getCurrentIndex: () => {return currentIndex}
  }));

  if (
    !children?.length
  ) return null

  if (
    children.length < 1
  ) return null

  // Main Carousel markup
  return (
    <div
      className={`cardCarousel ${itemsWrapperWidth ? 'show' : ''}`}
      onTouchStart={ handleTouchStart }
      onTouchEnd={ handleTouchEnd }
      style={{ "padding": `0 ${config.padding}px` }}>
      <div className="cardCarousel-inner" ref={carouselWrapperRef}>
        <div
          ref={carouselItemsRef}
          className="cardCarousel-items"
          style={{
            "width": itemsWrapperWidth ? `${itemsWrapperWidth}px` : '99999px',
            "gap": `${config.gap}px`,
            "transitionDuration": `${config.transitionSpeed}ms`
          }}>
          { children?.map((child, key) => {
            return (
              <div
                key={key}
                className="cardCarousel-item-content"
                data-active={key === currentIndex}
                style={itemWidth ? {"width": `${itemWidth}px`} : {}}>
                {child}
              </div>
            )
          }) }
        </div>
      </div>

      { config.pagination &&
        <Pagination
          itemCount={itemCount}
          goToCard={goToCard}
        />
      }

      { config.arrows &&
        <ArrowButtons
          nextArrow={config.nextArrow}
          prevArrow={config.prevArrow}
          currentIndex={currentIndex}
          prevCard={prevCard}
          itemCount={itemCount}
          nextCard={nextCard}
        />
      }

    </div>
  )
})

export default CardCarousel