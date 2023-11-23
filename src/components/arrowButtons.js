const ArrowButtons = (props) => {

  const {
    nextArrow,
    prevArrow,
    currentIndex,
    prevCard,
    itemCount,
    nextCard
  } = props

  return (
    <>
      <button
        className={`cardCarousel-arrow prev-button ${currentIndex == 0 ? 'disabled' : 'active'}`}
        onClick={ prevCard }>
        {nextArrow || <span className="cardCarousel-arrow-inner" />}
      </button>

      <button
        className={`cardCarousel-arrow next-button ${currentIndex == itemCount ? 'disabled' : 'active'}`}
        onClick={ nextCard }>
        {prevArrow || <span className="cardCarousel-arrow-inner" />}
      </button>
    </>
  )
}

export default ArrowButtons