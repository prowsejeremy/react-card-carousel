import { ArrowPropsInterface } from "../types.ts"

const ArrowButtons = (props:ArrowPropsInterface) => {

  const {
    nextArrow,
    prevArrow,
    currentIndex,
    itemCount,
    prevCard,
    nextCard
  } = props

  return (
    <>
      <button
        className={`cardCarousel-arrow prev-button ${currentIndex === 0 ? 'disabled' : 'active'}`}
        onClick={ prevCard }>
        <>
          {prevArrow || <span className="cardCarousel-arrow-inner" />}
        </>
      </button>

      <button
        className={`cardCarousel-arrow next-button ${currentIndex === itemCount ? 'disabled' : 'active'}`}
        onClick={ nextCard }>
        <>
          {nextArrow || <span className="cardCarousel-arrow-inner" />}
        </>
      </button>
    </>
  )
}

export default ArrowButtons