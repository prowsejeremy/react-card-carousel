import React, {forwardRef, useState, useEffect, useRef, useImperativeHandle} from "react"

import './styles.scss'

const CardCarousel = forwardRef((props, ref) => {

  const {
    children,
    settings
  } = props

  const defaultSettings = {
    buffer: 50, // Buffer for whether to switch to next slide if it sits right on the border of the viewbox (px)
    gap: 20, // gap size between each card/silde (px)
    touchChangeThreshold: 100, // how far someone has to swipe on a touch device to trigger a change (px)
    pagination: false,
    touchControls: true,
    arrows: true, // enable or disable arrows
    nextArrow: false, // provide custom markup for the next button
    prevArrow: false, // provide custom markup for the prev button
    
    // Event hooks
    beforeChange: false,
    afterChange: false
  }

  const config = {
    ...defaultSettings,
    ...settings
  }

  const [itemsWrapperWidth, setItemsWrapperWidth] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [transitionIndex, setTransitionIndex] = useState(0)
  const [itemCount, setItemCount] = useState(0)

  const carouselItemsRef = useRef()
  const carouselWrapperRef = useRef()


  useEffect(() => {
    setItemCount(children.length-1)
  }, [children.length])


  useEffect(() => {
    getItemsWrapperWidth()
  }, [carouselItemsRef.current, config])


  useEffect(() => {
    window.addEventListener('resize', getItemsWrapperWidth)

    return () => {
      window.removeEventListener('resize', getItemsWrapperWidth)
    }

  }, [typeof window !== undefined])


  useEffect(() => {
    handleMove(transitionIndex)
  }, [transitionIndex])


  // Get the inital wrapper width based on the width of all children with their associated padding values
  const getItemsWrapperWidth = () => {
    const carouselChildren = carouselItemsRef.current.children

    if (carouselChildren) {
      let carouselWidth = 0;

      [...carouselChildren].map((child) => {
        return carouselWidth += child.offsetWidth
      });

      setItemsWrapperWidth(carouselWidth)
    }
  }


  // Is the current item in view, checking the left and right borders of an item relative to the viewbox
  const itemInView = (currentItemBox, viewBox) => {
    return (currentItemBox.left > (viewBox.left - config.buffer)) && (currentItemBox.right < (viewBox.right + config.buffer))
  }


  // Get the int value of how far to move
  const getMoveVal = (item, viewBox, dir='next') => {
    if (dir == 'next') {
      return (item.offsetLeft - viewBox.width + item.offsetWidth) * -1
    } else {
      return item.offsetLeft * -1
    }
  }

  // Main movement function that actually updates index and position values
  const handleMove = (index) => {

    if (currentIndex == index) return
    const dir = index > currentIndex ? 'next' : 'prev'

    const currentItem = carouselItemsRef.current.children[index]
    
    if (!currentItem) return

    const currentItemBox = currentItem.getBoundingClientRect()
    const carouselWrapperBox = carouselWrapperRef.current.getBoundingClientRect()

    if (itemInView(currentItemBox, carouselWrapperBox)) {
      if (dir == 'next') {
        return setTransitionIndex(transitionIndex+1)
      } else {
        return setTransitionIndex(transitionIndex-1)
      }
    } else {
      
      // trigger beforeChange listener
      config?.beforeChange && config?.beforeChange(currentIndex, transitionIndex)

      const moveVal = getMoveVal(currentItem, carouselWrapperBox, dir)
      carouselItemsRef.current.style.transform = `translateX(${moveVal}px)`
    }

    setCurrentIndex(transitionIndex)
    
    // trigger afterChange listener
    config?.afterChange && config?.afterChange(transitionIndex)
  }


  // Touch Controls
  let touchStartVal = 0
  const handleTouchStart = (e) => {
    if (!config?.touchControls) return
    
    touchStartVal = e.changedTouches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (!config?.touchControls) return
    
    let touchEndVal = e.changedTouches[0].clientX
    let touchDelta = touchEndVal-touchStartVal

    if (touchDelta > config?.touchChangeThreshold) {
      return handleMoveInteract('prev')
    } else if (touchDelta * -1 > config?.touchChangeThreshold) {
      return handleMoveInteract('next')
    }
  }


  // Generic movement function called by next / prev movement interactions.
  const handleMoveInteract = (dir) => {
    let changedIndex = 0

    if (dir == 'next') {
      changedIndex = currentIndex+1 < itemCount ? currentIndex+1 : itemCount
    } else {
      changedIndex = currentIndex-1 > 0 ? currentIndex-1 : 0
    }

    return setTransitionIndex(changedIndex)
  }


  // Interaction functions
  const nextCard = () => handleMoveInteract('next')
  const prevCard = () => handleMoveInteract('prev')
  const goToCard = (index) => setTransitionIndex(index)


  // Pass functions to external
  useImperativeHandle(ref, () => ({
    nextCard,
    prevCard,
    goToCard: (index) => goToCard(index)
  }));


  // Generate pagination markup
  const getPaginationList = () => {
    const paginationItems = []

    for (let index = 0; index <= itemCount; index++) {
      paginationItems.push(
        <button
          key={index} 
          onClick={() => goToCard(index)}
          className="cardCarousel-pagination-button" /> 
      )
    }

    return (
      <div className="cardCarousel-pagination">
        {paginationItems}
      </div>
    )
  }


  // Main Carousel markup
  return !children?.length > 1 ? null : (
    <div
      className={`cardCarousel ${itemsWrapperWidth ? 'show' : ''}`}
      onTouchStart={ handleTouchStart }
      onTouchEnd={ handleTouchEnd }>
      <div className="cardCarousel-inner" ref={carouselWrapperRef}>
        <div
          ref={carouselItemsRef}
          className="cardCarousel-items"
          style={{ "width": itemsWrapperWidth ? `${itemsWrapperWidth}px` : '99999px' }}>
          { children?.map((child, key) => {
            return (
              <div
                key={key}
                className="cardCarousel-item-content"
                data-active={key === currentIndex}
                style={{"paddingRight": key >= itemCount ? 0 : `${config?.gap}px`}}>
                {child}
              </div>
            )
          }) }
        </div>
      </div>

      { config?.pagination && getPaginationList() }

      { config?.arrows &&
        <>
          <button
            className={`cardCarousel-arrow prev-button ${currentIndex == 0 ? 'disabled' : 'active'}`}
            onClick={ prevCard }>
            {config?.nextArrow || <span className="cardCarousel-arrow-inner" />}
          </button>

          <button
            className={`cardCarousel-arrow next-button ${currentIndex == itemCount ? 'disabled' : 'active'}`}
            onClick={ nextCard }>
            {config?.prevArrow || <span className="cardCarousel-arrow-inner" />}
          </button>
        </>
      }

    </div>
  )
})

export default CardCarousel