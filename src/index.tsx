import {
  SettingsInterface,
  PropsInterface,
  ImperitiveHandleInterface,
} from "./types.ts";

import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  useMemo,
} from "react";

import ArrowButtons from "./components/arrowButtons.tsx";
import Pagination from "./components/pagination.tsx";

import { getCenterMoveVal, getMoveVal } from "./helpers.ts";

import "./styles.scss";

const CardCarousel = forwardRef<ImperitiveHandleInterface, PropsInterface>(
  (props, carouselRef): React.JSX.Element => {
    const { children, settings } = props;

    const defaultSettings: SettingsInterface = {
      // Presentation settings
      gap: 20, // gap size between each card/silde (px)
      padding: 50, // padding either side of the viewbox.
      cardsToShow: 0, // Defines the width of each card, if set to 0 the width will be inherited from the each cards children
      transitionSpeed: 300, // speed for transitions (ms)

      // Control settings
      centerMode: false,
      yieldToImages: false,
      pagination: false,
      touchControls: true,
      arrows: true, // enable or disable arrows
      nextArrow: null, // provide custom markup for the next button
      prevArrow: null, // provide custom markup for the prev button

      // Events
      beforeChange: null, // fires just before change
      afterChange: null, // fires just after change
      onTouchStart: null, // fires just after touch start
      onTouchMove: null, // fires just after touch move
      onTouchEnd: null, // fires just after touch end
    };

    const [config, setConfig] = useState<SettingsInterface>({
      ...defaultSettings,
      ...settings,
    });

    // State
    const [touchX, setTouchX] = useState<number>(0);
    const [itemsContained, setItemsContained] = useState<boolean>(true); // Are the items contained within the items wrapper?
    const [itemWidth, setItemWidth] = useState<number>(0);
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const [itemsWrapperWidth, setItemsWrapperWidth] = useState<number>(0);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [itemCount, setItemCount] = useState<number>(0);
    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
    const [animateTransition, setAnimateTransition] = useState<boolean>(false);
    const [scrolling, setScrolling] = useState<boolean>(false);
    const [swiping, setSwiping] = useState<boolean>(false);

    // Refs
    const resizeTimer = useRef<number | null>(null);
    const previousWindowWidth = useRef<number>(0);
    const carouselItemsRef = useRef<HTMLDivElement | null>(null);
    const carouselWrapperRef = useRef<HTMLDivElement | null>(null);
    const offsetRef = useRef<number>(0);

    useMemo(() => {
      setConfig({
        ...defaultSettings,
        ...settings,
      });
    }, [settings]);

    useEffect(() => {
      if (!children?.length) return;
      if (itemCount !== children.length - 1) {
        setItemCount(children.length - 1);
      }
    }, [children]);

    // Animate to item
    useEffect(() => {
      if (animateTransition) {
        scrub(`${offsetRef.current}px`);
        setTimeout(() => {
          setAnimateTransition(false);
        }, config.transitionSpeed);
      }
    }, [animateTransition, config.transitionSpeed]);

    // Set inital width for the carousel items
    useEffect(() => {
      if (itemCount !== 0 && itemsWrapperWidth === 0) {
        getItemsWrapperWidth();
      }
    }, [carouselItemsRef.current, itemCount]);

    // Run checks to reposition the carousel items on width change
    useEffect(() => {
      !isResizing && itemsWrapperWidth !== 0 && updateCarouselPosition();
    }, [isResizing, itemsWrapperWidth]);

    // Run checks to resize and reposition the carousel on config changes
    useEffect(() => {
      getItemsWrapperWidth();
      updateCarouselPosition();
    }, [
      itemCount,
      config.gap,
      config.padding,
      config.cardsToShow,
      config.centerMode,
      config.yieldToImages,
    ]);

    // Set inital width for each card, if applicable
    useEffect(() => {
      if (config.cardsToShow !== 0 && itemWidth === 0) {
        getItemWidth();
      }
    }, [carouselWrapperRef.current]);

    // Add window resize listener
    useEffect(() => {
      window.addEventListener("resize", handleResize);
      previousWindowWidth.current = window.innerWidth;

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [typeof window !== undefined, imagesLoaded, itemCount]);

    // Handle resize of browser window
    const handleResize = () => {
      clearTimeout(resizeTimer.current);
      // Only handle resize if the width has changed, we don't care about the height.
      // Mainly a fix for iOS Safari and mobile browsers which change browser height on scroll.
      // Lock the width, height and position of certain elements to ensure resizing doesn't
      // mess with the page layout.
      if (window.innerWidth !== previousWindowWidth.current) {
        const currentCarouselWrapper =
          carouselWrapperRef.current.getBoundingClientRect();
        carouselWrapperRef.current.style.width = `${currentCarouselWrapper.width}px`;
        carouselWrapperRef.current.style.height = `${currentCarouselWrapper.height}px`;
        carouselItemsRef.current.style.position = "absolute";
        setItemsWrapperWidth(99999);
        setIsResizing(true);
        previousWindowWidth.current = window.innerWidth;

        // Reset everything once resizing has finished.
        resizeTimer.current = setTimeout(() => {
          carouselItemsRef.current.style.removeProperty("position");
          carouselWrapperRef.current.style.removeProperty("width");
          carouselWrapperRef.current.style.removeProperty("height");
          setIsResizing(false);
          getItemWidth();
          getItemsWrapperWidth();
          resizeTimer.current = null;
        }, 500);
      }
    };

    // /////////////////////////////////
    // WIP - Tidy up reset on resize
    // /////////////////////////////////

    const updateCarouselPosition = () => {
      const itemsBox = carouselItemsRef.current?.getBoundingClientRect();
      const wrapperBox = carouselWrapperRef.current?.getBoundingClientRect();

      // Only enable controls if the items container is larger than the wrapper.
      setItemsContained(itemsBox?.width <= wrapperBox?.width);
      snapToItem(0);
    };

    useEffect(() => {
      itemsContained && scrub(0);
    }, [itemsContained]);

    // If cardsToShow has been set, calculate the width of each item based on the viewBox size.
    const getItemWidth = () => {
      const wrapperBox = carouselWrapperRef.current?.getBoundingClientRect();

      if (config.cardsToShow !== 0 && carouselWrapperRef.current) {
        setItemWidth(wrapperBox.width / config.cardsToShow);
      }
    };

    // Check for the presense of images in the card content,
    // wait for them to load before calculating width of cards.
    const checkIfCardImagesLoaded = (element: Element) => {
      const hasImages = element.querySelectorAll("img");

      if (!hasImages || typeof hasImages !== "object")
        return Promise.resolve(true);

      return Promise.all(
        Array.from(hasImages).map((img) => {
          return new Promise((resolve) => {
            if (img.complete) resolve(1);
            img.onload = img.onerror = resolve;
          });
        })
      );
    };

    // Get the inital wrapper width based on the width of all children with their associated padding values
    const getItemsWrapperWidth = () => {
      if (!carouselItemsRef.current) return;

      const carouselChildren = carouselItemsRef.current.children;
      const paddingWidth = config.gap * itemCount;

      if (carouselChildren) {
        let carouselWidth = 0;

        const processWidth = (child: any) => {
          const firstChild = child.children[0];
          const childWidth = firstChild?.offsetWidth;
          carouselWidth += config.cardsToShow > 0 ? itemWidth : childWidth;
        };

        if (config.yieldToImages && !imagesLoaded) {
          Promise.all(
            Array.from(carouselChildren).map((child: HTMLElement) =>
              checkIfCardImagesLoaded(child).then(() => {
                processWidth(child);
              })
            )
          ).then(() => {
            setImagesLoaded(true);
            setItemsWrapperWidth(carouselWidth + paddingWidth);
          });
        } else {
          Array.from(carouselChildren).map((child: any) => {
            processWidth(child);
          });
          setItemsWrapperWidth(carouselWidth + paddingWidth);
        }
      }
    };

    const snapToItem = async (index: number) => {
      let newOffset = 0;

      // Check if we are at the start of the list and haven't changed index,
      // if so just center to 0 and return.
      if (currentIndex === index && currentIndex === 0 && !config.centerMode) {
        offsetRef.current = newOffset;
        setAnimateTransition(true);
        return;
      }

      const dir = index >= currentIndex ? "next" : "prev";
      const targetItem = carouselItemsRef.current.children.item(index);

      if (!targetItem) return;

      const wrapperBox = carouselWrapperRef.current?.getBoundingClientRect();

      // trigger beforeChange listener
      config.beforeChange &&
        currentIndex !== index &&
        config.beforeChange(currentIndex, index);

      if (config.centerMode) {
        // Get move calculation for centerMode
        newOffset = await getCenterMoveVal(targetItem, wrapperBox);
      } else {
        // Get move calculation where not centerMode
        const { moveVal, atStart, atEnd } = await getMoveVal(
          targetItem,
          carouselItemsRef.current,
          wrapperBox,
          dir
        );

        newOffset = moveVal;
        // Update offset.
        if (atStart) {
          index = 0;
        } else if (atEnd) {
          index = itemCount;
        }
      }

      offsetRef.current = newOffset;
      setAnimateTransition(true);
      setCurrentIndex(index);

      config.afterChange && currentIndex !== index && config.afterChange(index);
    };

    // //////////////////////////////////////////////////////¿
    // Touch Controls
    // //////////////////////////////////////////////////////¿

    const handleTouchStart = (e) => {
      if (!config.touchControls || scrolling) return;
      const _touchX = e.x ?? e?.changedTouches[0]?.clientX; // desktop event props ?? mobile (touch) event props
      setTouchX(_touchX);
      config.onTouchStart && config.onTouchStart(_touchX);
    };

    const handleTouchMove = (e) => {
      if (!config.touchControls || scrolling) return;
      const _eX = e.x ?? e?.changedTouches[0]?.clientX; // desktop event props ?? mobile (touch) event props
      const _touchDelta = _eX - touchX;
      config.onTouchMove && config.onTouchMove(_touchDelta);

      // If the user has interacted with the carousel, set swiping to true
      if (Math.abs(_touchDelta) > 5) {
        setSwiping(true);
      }

      scrub(`${offsetRef.current + _touchDelta * 1.25}px`);
    };

    const handleTouchEnd = () => {
      // Release the scroll back to the body and remove swiping state
      setScrolling(false);
      setSwiping(false);

      if (!config.touchControls) return;
      config.onTouchEnd && config.onTouchEnd();
      checkActiveItem();
    };

    // Window touch listeners to disable scroll if user
    // interacts with the carousel
    let winTSY = 0;

    const winTSListener = (e) => {
      winTSY = e?.changedTouches[0]?.clientY;
    };

    const winTMListener = (e) => {
      if (swiping) {
        e.preventDefault();
        return false;
      }

      const winTMY = e?.changedTouches[0]?.clientY;
      if (Math.abs(winTSY - winTMY) > 5) {
        setScrolling(true);
      }
    };

    const winTEListener = (e) => {
      setScrolling(false);
      setSwiping(false);
    };

    // Bind/unBind touch events to window
    useEffect(() => {
      window.addEventListener("touchstart", winTSListener);
      window.addEventListener("touchmove", winTMListener, { passive: false });
      window.addEventListener("touchend", winTEListener);
      return () => {
        window.removeEventListener("touchstart", winTSListener);
        window.removeEventListener("touchmove", winTMListener);
        window.removeEventListener("touchend", winTEListener);
      };
    }, [swiping]);

    // Handle move transform
    const scrub = (val) => {
      if (itemsContained || resizeTimer.current !== null) val = 0;
      carouselItemsRef.current.style.transform = `translateX(${val})`;
    };

    // Check which item is currently front and center
    const checkActiveItem = (callback?) => {
      const wrapperBox = carouselWrapperRef.current?.getBoundingClientRect();
      const scrollItems = carouselItemsRef.current.children;
      const centerPoint = wrapperBox.width / 2;
      const centerPointBuffer = config.gap / 2;

      // Itterate over each child and check it's position
      Array.from(scrollItems).map((child, index) => {
        const childRect = child.getBoundingClientRect();

        // If the childs left bounds are less than the center point and right bounds are greater than
        // the center point, we've found our star!
        if (
          (childRect.left - wrapperBox.left - centerPointBuffer <=
            centerPoint &&
            childRect.right - wrapperBox.left + centerPointBuffer >=
              centerPoint) ||
          (childRect.left > centerPoint && 0 === index) || // check for first item
          (childRect.right < centerPoint && itemCount === index) // check for last item
        ) {
          snapToItem(index);
          callback && callback(index);
        }
      });
    };

    // Generic movement function called by next / prev movement interactions.
    const handleMoveInteract = (dir) => {
      let changedIndex = 0;

      if (dir === "next") {
        changedIndex =
          currentIndex + 1 < itemCount ? currentIndex + 1 : itemCount;
      } else {
        changedIndex = currentIndex - 1 > 0 ? currentIndex - 1 : 0;
      }

      return snapToItem(changedIndex);
    };

    // //////////////////////////////////////////////////////¿
    // Interaction functions
    // //////////////////////////////////////////////////////¿

    const nextCard = () => handleMoveInteract("next");
    const prevCard = () => handleMoveInteract("prev");

    const goToCard = (index) => {
      if (!carouselItemsRef.current || !carouselWrapperRef.current) return;
      snapToItem(index);
    };

    // Pass functions to external
    useImperativeHandle(carouselRef, () => ({
      nextCard,
      prevCard,
      goToCard: (index) => goToCard(index),
      getCurrentIndex: () => {
        return currentIndex;
      },
    }));

    if (!children?.length || children?.length < 1) return null;

    // //////////////////////////////////////////////////////¿
    // Main Carousel markup
    // //////////////////////////////////////////////////////¿

    return (
      <div
        className={`cardCarousel ${isResizing ? "resizing" : ""} ${
          itemsWrapperWidth !== 0 ? "show" : ""
        }`}
        style={{ padding: `0 ${config.padding}px` }}
      >
        <div
          className="cardCarousel-inner"
          ref={carouselWrapperRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={carouselItemsRef}
            className={`cardCarousel-items ${
              config.centerMode ? "itemsContained" : ""
            }`}
            style={{
              display: "flex", // Here as a placeholder value so that rendering is correct if a delay in loading styles occurs
              alignItems: "center", // Here as a placeholder value so that rendering is correct if a delay in loading styles occurs
              width:
                itemsWrapperWidth !== 0 ? `${itemsWrapperWidth}px` : "99999px",
              gap: `${config.gap}px`,
              transition: animateTransition
                ? `transform ease-in-out ${config.transitionSpeed}ms`
                : "",
            }}
          >
            {children?.map((child, key) => {
              return (
                <div
                  key={key}
                  className="cardCarousel-item-content"
                  data-active={key === currentIndex}
                  style={itemWidth ? { width: `${itemWidth}px` } : {}}
                >
                  {child}
                </div>
              );
            })}
          </div>
        </div>

        {!itemsContained && (
          <>
            {config.pagination && (
              <Pagination
                currentIndex={currentIndex}
                itemCount={itemCount}
                goToCard={goToCard}
              />
            )}

            {config.arrows && (
              <ArrowButtons
                nextArrow={config.nextArrow}
                prevArrow={config.prevArrow}
                currentIndex={currentIndex}
                prevCard={prevCard}
                itemCount={itemCount}
                nextCard={nextCard}
              />
            )}
          </>
        )}
      </div>
    );
  }
);

export default CardCarousel;
