'use strict';

var React = require('react');

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

var css_248z = ".cardCarousel {\n  display: flex;\n  flex-direction: column;\n  padding: 0 20px;\n  position: relative; }\n  .cardCarousel .cardCarousel-arrow,\n  .cardCarousel .cardCarousel-pagination-button {\n    cursor: pointer;\n    padding: 0;\n    border: none;\n    outline: none;\n    background: none; }\n  @media screen and (min-width: 768px) {\n    .cardCarousel {\n      padding: 0 100px; } }\n\n.cardCarousel-inner {\n  position: relative; }\n\n.cardCarousel-items {\n  transition: all 400ms ease-out;\n  position: relative;\n  display: flex;\n  align-items: center; }\n\n.cardCarousel-item-content {\n  width: auto;\n  display: inline-block;\n  overflow: hidden;\n  max-width: 100vw; }\n\n.cardCarousel-arrow {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  z-index: 10;\n  opacity: 1;\n  visibility: visible;\n  transition: all 400ms ease-out; }\n  .cardCarousel-arrow.disabled {\n    opacity: 0;\n    visibility: hidden; }\n  .cardCarousel-arrow:hover .cardCarousel-arrow-inner {\n    background-color: black; }\n    .cardCarousel-arrow:hover .cardCarousel-arrow-inner:before {\n      border-color: white; }\n\n.cardCarousel-arrow-inner {\n  display: flex;\n  width: 60px;\n  height: 60px;\n  border-radius: 30px;\n  background-color: white;\n  position: relative;\n  transition: all 300ms ease-out; }\n  .cardCarousel-arrow-inner:before {\n    content: '';\n    display: block;\n    margin: auto auto auto 20px;\n    width: 12px;\n    height: 12px;\n    border-top: 2px solid black;\n    border-right: 2px solid black;\n    transform: rotate(45deg);\n    transition: all 300ms ease-out; }\n\n.prev-button {\n  left: 20px; }\n  .prev-button .cardCarousel-arrow-inner {\n    transform: rotate(180deg); }\n  @media screen and (min-width: 768px) {\n    .prev-button {\n      left: 50px; } }\n\n.next-button {\n  right: 20px; }\n  @media screen and (min-width: 768px) {\n    .next-button {\n      right: 50px; } }\n\n.cardCarousel-pagination {\n  width: auto;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 10px;\n  position: relative;\n  margin: 40px auto 0; }\n  .cardCarousel-pagination .cardCarousel-pagination-button {\n    display: block;\n    width: 10px;\n    height: 10px;\n    border-radius: 5px;\n    border: 1px solid black;\n    background-color: transparent;\n    transition: all 300ms ease-out; }\n    .cardCarousel-pagination .cardCarousel-pagination-button.active, .cardCarousel-pagination .cardCarousel-pagination-button:hover {\n      background-color: black; }\n";
styleInject(css_248z);

const CardCarousel = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    children,
    settings
  } = props;
  const defaultSettings = {
    buffer: 50,
    // buffer for whether to switch to next slide if it sits right on the border of the viewbox (px)
    gap: 20,
    // gap size between each card/silde (px)
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

  const config = {
    ...defaultSettings,
    ...settings
  };
  const [itemsWrapperWidth, setItemsWrapperWidth] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [transitionIndex, setTransitionIndex] = React.useState(0);
  const [itemCount, setItemCount] = React.useState(0);
  const carouselItemsRef = React.useRef();
  const carouselWrapperRef = React.useRef();
  React.useEffect(() => {
    setItemCount(children.length - 1);
  }, [children.length]);
  React.useEffect(() => {
    getItemsWrapperWidth();
  }, [carouselItemsRef.current, config]);
  React.useEffect(() => {
    window.addEventListener('resize', getItemsWrapperWidth);
    return () => {
      window.removeEventListener('resize', getItemsWrapperWidth);
    };
  }, [typeof window !== undefined]);
  React.useEffect(() => {
    handleMove(transitionIndex);
  }, [transitionIndex]);

  // Get the inital wrapper width based on the width of all children with their associated padding values
  const getItemsWrapperWidth = () => {
    const carouselChildren = carouselItemsRef.current.children;
    const paddingWidth = config?.gap * itemCount;
    if (carouselChildren) {
      let carouselWidth = 0;
      [...carouselChildren].map(child => {
        return carouselWidth += child.offsetWidth;
      });
      setItemsWrapperWidth(carouselWidth + paddingWidth);
    }
  };

  // Is the current item in view, checking the left and right borders of an item relative to the viewbox
  const itemInView = (currentItemBox, viewBox) => {
    return currentItemBox.left > viewBox.left - config.buffer && currentItemBox.right < viewBox.right + config.buffer;
  };

  // Get the int value of how far to move
  const getMoveVal = (item, viewBox, dir = 'next') => {
    if (dir == 'next') {
      return (item.offsetLeft - viewBox.width + item.offsetWidth) * -1;
    } else {
      return item.offsetLeft * -1;
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
    if (itemInView(currentItemBox, carouselWrapperBox)) {
      if (dir == 'next') {
        return setTransitionIndex(transitionIndex + 1);
      } else {
        return setTransitionIndex(transitionIndex - 1);
      }
    } else {
      // trigger beforeChange listener
      config?.beforeChange && config?.beforeChange(currentIndex, transitionIndex);
      const moveVal = getMoveVal(currentItem, carouselWrapperBox, dir);
      carouselItemsRef.current.style.transform = `translateX(${moveVal}px)`;
    }
    setCurrentIndex(transitionIndex);

    // trigger afterChange listener
    config?.afterChange && config?.afterChange(transitionIndex);
  };

  // Touch Controls
  let touchStartVal = 0;
  const handleTouchStart = e => {
    if (!config?.touchControls) return;
    touchStartVal = e.changedTouches[0].clientX;
  };
  const handleTouchEnd = e => {
    if (!config?.touchControls) return;
    let touchEndVal = e.changedTouches[0].clientX;
    let touchDelta = touchEndVal - touchStartVal;
    if (touchDelta > config?.touchChangeThreshold) {
      return handleMoveInteract('prev');
    } else if (touchDelta * -1 > config?.touchChangeThreshold) {
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
  const goToCard = index => setTransitionIndex(index);

  // Pass functions to external
  React.useImperativeHandle(ref, () => ({
    nextCard,
    prevCard,
    goToCard: index => goToCard(index),
    getCurrentIndex: () => {
      return currentIndex;
    }
  }));

  // Generate pagination markup
  const getPaginationList = () => {
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

  // Main Carousel markup
  return !children?.length > 1 ? null : /*#__PURE__*/React.createElement("div", {
    className: `cardCarousel ${itemsWrapperWidth ? 'show' : ''}`,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd
  }, /*#__PURE__*/React.createElement("div", {
    className: "cardCarousel-inner",
    ref: carouselWrapperRef
  }, /*#__PURE__*/React.createElement("div", {
    ref: carouselItemsRef,
    className: "cardCarousel-items",
    style: {
      "width": itemsWrapperWidth ? `${itemsWrapperWidth}px` : '99999px',
      "gap": `${config?.gap}px`
    }
  }, children?.map((child, key) => {
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: "cardCarousel-item-content",
      "data-active": key === currentIndex
    }, child);
  }))), config?.pagination && getPaginationList(), config?.arrows && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: `cardCarousel-arrow prev-button ${currentIndex == 0 ? 'disabled' : 'active'}`,
    onClick: prevCard
  }, config?.nextArrow || /*#__PURE__*/React.createElement("span", {
    className: "cardCarousel-arrow-inner"
  })), /*#__PURE__*/React.createElement("button", {
    className: `cardCarousel-arrow next-button ${currentIndex == itemCount ? 'disabled' : 'active'}`,
    onClick: nextCard
  }, config?.prevArrow || /*#__PURE__*/React.createElement("span", {
    className: "cardCarousel-arrow-inner"
  }))));
});

module.exports = CardCarousel;
