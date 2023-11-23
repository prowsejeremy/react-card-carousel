'use strict';

var React$1 = require('react');

const ArrowButtons = props => {
  const {
    nextArrow,
    prevArrow,
    currentIndex,
    prevCard,
    itemCount,
    nextCard
  } = props;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: `cardCarousel-arrow prev-button ${currentIndex == 0 ? 'disabled' : 'active'}`,
    onClick: prevCard
  }, nextArrow || /*#__PURE__*/React.createElement("span", {
    className: "cardCarousel-arrow-inner"
  })), /*#__PURE__*/React.createElement("button", {
    className: `cardCarousel-arrow next-button ${currentIndex == itemCount ? 'disabled' : 'active'}`,
    onClick: nextCard
  }, prevArrow || /*#__PURE__*/React.createElement("span", {
    className: "cardCarousel-arrow-inner"
  })));
};

const Pagination = props => {
  const {
    itemCount,
    goToCard
  } = props;
  const paginationItems = [];
  for (let index = 0; index <= itemCount; index++) {
    paginationItems.push( /*#__PURE__*/React.createElement("button", {
      key: index,
      onClick: () => goToCard(index),
      className: "cardCarousel-pagination-button"
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "cardCarousel-pagination"
  }, paginationItems);
};

// Is the current item in view, checking the left and right borders of an item relative to the viewbox
const itemInView = (currentItemBox, viewBox, buffer = 0) => {
  if (!currentItemBox || !viewBox) return;
  return currentItemBox.left > viewBox.left - buffer && currentItemBox.right < viewBox.right + buffer;
};

// Get the int value of how far to move
const getMoveVal = (item, viewBox, dir = 'next') => {
  if (!item || !viewBox) return;
  if (dir == 'next') {
    return (item.offsetLeft - viewBox.width + item.offsetWidth) * -1;
  } else {
    return item.offsetLeft * -1;
  }
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".cardCarousel {\n  display: flex;\n  flex-direction: column;\n  position: relative; }\n  .cardCarousel .cardCarousel-arrow,\n  .cardCarousel .cardCarousel-pagination-button {\n    cursor: pointer;\n    padding: 0;\n    border: none;\n    outline: none;\n    background: none; }\n\n.cardCarousel-inner {\n  position: relative; }\n\n.cardCarousel-items {\n  transition: all 400ms ease-out;\n  position: relative;\n  display: flex;\n  align-items: center; }\n\n.cardCarousel-item-content {\n  width: auto;\n  display: inline-block;\n  overflow: hidden;\n  max-width: 100vw; }\n\n.cardCarousel-arrow {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  z-index: 10;\n  opacity: 1;\n  visibility: visible;\n  transition: all 400ms ease-out; }\n  .cardCarousel-arrow.disabled {\n    opacity: 0;\n    visibility: hidden; }\n  .cardCarousel-arrow:hover .cardCarousel-arrow-inner {\n    background-color: black; }\n    .cardCarousel-arrow:hover .cardCarousel-arrow-inner:before {\n      border-color: white; }\n\n.cardCarousel-arrow-inner {\n  display: flex;\n  width: 60px;\n  height: 60px;\n  border-radius: 30px;\n  background-color: white;\n  position: relative;\n  transition: all 300ms ease-out; }\n  .cardCarousel-arrow-inner:before {\n    content: '';\n    display: block;\n    margin: auto auto auto 20px;\n    width: 12px;\n    height: 12px;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(45deg);\n    transition: all 300ms ease-out; }\n\n.prev-button {\n  left: 20px; }\n  .prev-button .cardCarousel-arrow-inner {\n    transform: rotate(180deg); }\n  @media screen and (min-width: 768px) {\n    .prev-button {\n      left: 50px; } }\n\n.next-button {\n  right: 20px; }\n  @media screen and (min-width: 768px) {\n    .next-button {\n      right: 50px; } }\n\n.cardCarousel-pagination {\n  width: auto;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 10px;\n  position: relative;\n  margin: 40px auto 0; }\n  .cardCarousel-pagination .cardCarousel-pagination-button {\n    display: block;\n    width: 10px;\n    height: 10px;\n    border-radius: 5px;\n    border: 1px solid black;\n    background-color: transparent;\n    transition: all 300ms ease-out; }\n    .cardCarousel-pagination .cardCarousel-pagination-button.active, .cardCarousel-pagination .cardCarousel-pagination-button:hover {\n      background-color: black; }\n";
styleInject(css_248z);

const CardCarousel = /*#__PURE__*/React$1.forwardRef((props, carouselRef) => {
  const {
    children,
    settings
  } = props;
  const defaultSettings = {
    // Presentation settings
    buffer: 50,
    // buffer for whether to switch to next card if it sits right on the border of the viewbox (px)
    gap: 20,
    // gap size between each card/silde (px)
    padding: 50,
    // padding either side of the viewbox.
    slidesToShow: 0,
    // Defines the width of each card, if set to 0 the width will be inherited from the each cards children
    transitionSpeed: 300,
    // speed for transitions (ms)

    // Control settings
    touchChangeThreshold: 100,
    // how far someone has to swipe on a touch device to trigger a change (px)
    pagination: false,
    touchControls: true,
    arrows: true,
    // enable or disable arrows
    nextArrow: false,
    // provide custom markup for the next button
    prevArrow: false,
    // provide custom markup for the prev button

    // Event hooks
    beforeChange: false,
    // fires just before change
    afterChange: false // fires just after change
  };

  const [config, setConfig] = React$1.useState({
    ...defaultSettings,
    ...settings
  });
  const [itemWidth, setItemWidth] = React$1.useState(false);
  const [itemsWrapperWidth, setItemsWrapperWidth] = React$1.useState(false);
  const [currentIndex, setCurrentIndex] = React$1.useState(0);
  const [transitionIndex, setTransitionIndex] = React$1.useState(0);
  const [itemCount, setItemCount] = React$1.useState(children.length - 1);
  const carouselItemsRef = React$1.useRef();
  const carouselWrapperRef = React$1.useRef();
  React$1.useEffect(() => {
    setConfig({
      ...defaultSettings,
      ...settings
    });
  }, [settings]);

  // Set inital width for the carousel items
  React$1.useEffect(() => {
    getItemsWrapperWidth();
  }, [carouselItemsRef.current, itemWidth, config]);

  // Set inital width for each card, if applicable
  React$1.useEffect(() => {
    getItemWidth();
  }, [carouselWrapperRef.current, config]);

  // Add window resize listener
  React$1.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [typeof window !== undefined, itemWidth]);

  // Handle resize of browser window
  const handleResize = () => {
    getItemWidth();
    getItemsWrapperWidth(true);
  };

  // Trigger move logic when the transition index changes
  React$1.useEffect(() => {
    handleMove(transitionIndex);
  }, [transitionIndex]);

  // If slidesToShow has been set, calculate the width of each item based on the viewBox size.
  const getItemWidth = () => {
    if (config.slidesToShow !== 0) {
      const carouselWrapperBox = carouselWrapperRef.current.getBoundingClientRect();
      setItemWidth(carouselWrapperBox.width / config.slidesToShow);
    }
  };

  // Get the inital wrapper width based on the width of all children with their associated padding values
  const getItemsWrapperWidth = (onResize = false) => {
    if (onResize && config.slidesToShow === 0) return;
    const carouselChildren = carouselItemsRef.current.children;
    const paddingWidth = config.gap * itemCount;
    if (carouselChildren) {
      let carouselWidth = 0;
      [...carouselChildren].map(child => {
        const childBox = child.getBoundingClientRect();
        return carouselWidth += itemWidth || childBox.width;
      });
      setItemsWrapperWidth(carouselWidth + paddingWidth);
    }
  };

  // Main movement function that actually updates index and position values
  const handleMove = index => {
    if (currentIndex == index) return;
    const dir = index > currentIndex ? 'next' : 'prev';
    const currentItem = carouselItemsRef.current.children[index];
    if (!currentItem) return;
    const currentItemBox = currentItem.getBoundingClientRect();
    const carouselWrapperBox = carouselWrapperRef.current.getBoundingClientRect();
    if (itemInView(currentItemBox, carouselWrapperBox, config.buffer)) {
      if (dir == 'next') {
        return setTransitionIndex(transitionIndex + 1);
      } else {
        return setTransitionIndex(transitionIndex - 1);
      }
    } else {
      // trigger beforeChange listener
      config.beforeChange && config.beforeChange(currentIndex, transitionIndex);
      const moveVal = getMoveVal(currentItem, carouselWrapperBox, dir);
      carouselItemsRef.current.style.transform = `translateX(${moveVal}px)`;
    }
    setCurrentIndex(transitionIndex);

    // trigger afterChange listener
    config.afterChange && config.afterChange(transitionIndex);
  };

  // Touch Controls
  let touchStartVal = 0;
  const handleTouchStart = e => {
    if (!config.touchControls) return;
    touchStartVal = e.changedTouches[0].clientX;
  };
  const handleTouchEnd = e => {
    if (!config.touchControls) return;
    let touchEndVal = e.changedTouches[0].clientX;
    let touchDelta = touchEndVal - touchStartVal;
    if (touchDelta > config.touchChangeThreshold) {
      return handleMoveInteract('prev');
    } else if (touchDelta * -1 > config.touchChangeThreshold) {
      return handleMoveInteract('next');
    }
  };

  // Generic movement function called by next / prev movement interactions.
  const handleMoveInteract = dir => {
    let changedIndex = 0;
    if (dir == 'next') {
      changedIndex = currentIndex + 1 < itemCount ? currentIndex + 1 : itemCount;
    } else {
      changedIndex = currentIndex - 1 > 0 ? currentIndex - 1 : 0;
    }
    return setTransitionIndex(changedIndex);
  };

  // Interaction functions
  const nextCard = () => handleMoveInteract('next');
  const prevCard = () => handleMoveInteract('prev');
  const goToCard = index => {
    const currentItem = carouselItemsRef.current.children[index];
    const currentItemBox = currentItem.getBoundingClientRect();
    const carouselWrapperBox = carouselWrapperRef.current.getBoundingClientRect();
    if (!itemInView(currentItemBox, carouselWrapperBox, config.buffer)) {
      setTransitionIndex(index);
    }
  };

  // Pass functions to external
  React$1.useImperativeHandle(carouselRef, () => ({
    nextCard,
    prevCard,
    goToCard: index => goToCard(index),
    getCurrentIndex: () => {
      return currentIndex;
    }
  }));

  // Main Carousel markup
  return !children?.length > 1 ? null : /*#__PURE__*/React$1.createElement("div", {
    className: `cardCarousel ${itemsWrapperWidth ? 'show' : ''}`,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    style: {
      "padding": `0 ${config.padding}px`
    }
  }, /*#__PURE__*/React$1.createElement("div", {
    className: "cardCarousel-inner",
    ref: carouselWrapperRef
  }, /*#__PURE__*/React$1.createElement("div", {
    ref: carouselItemsRef,
    className: "cardCarousel-items",
    style: {
      "width": itemsWrapperWidth ? `${itemsWrapperWidth}px` : '99999px',
      "gap": `${config.gap}px`,
      "transitionDuration": `${config.transitionSpeed}ms`
    }
  }, children?.map((child, key) => {
    return /*#__PURE__*/React$1.createElement("div", {
      key: key,
      className: "cardCarousel-item-content",
      "data-active": key === currentIndex,
      style: itemWidth ? {
        "width": `${itemWidth}px`
      } : {}
    }, child);
  }))), config.pagination && /*#__PURE__*/React$1.createElement(Pagination, {
    itemCount: itemCount,
    goToCard: goToCard
  }), config.arrows && /*#__PURE__*/React$1.createElement(ArrowButtons, {
    nextArrow: config.nextArrow,
    prevArrow: config.prevArrow,
    currentIndex: currentIndex,
    prevCard: prevCard,
    itemCount: itemCount,
    nextCard: nextCard
  }));
});

module.exports = CardCarousel;
