// Types
import { getMoveValReturnObj } from "./types"

// ////////////////////////////////////////////////////////////////////////
// Legacy, however keeping in case it is resurrected in a future build
// ////////////////////////////////////////////////////////////////////////
// // Is the current item in view, checking the left and right borders of an item relative to the viewbox
// export const itemInView = (currentItemBox:DOMRect, viewBox:DOMRect, buffer:number=0): boolean => {
//   if (!currentItemBox || !viewBox) return
//   return (currentItemBox.left > (viewBox.left - buffer)) && (currentItemBox.right < (viewBox.right + buffer))
// }

// ////////////////////////////////////////////////////////////////////////
// Get value of how far to move, and if the start/end have been reached
// ////////////////////////////////////////////////////////////////////////

export const getMoveVal = (item:Element, itemsWrapper:Element, viewBox:DOMRect, dir:string='next'): getMoveValReturnObj => {
  if (!item || !(item instanceof HTMLElement) || !(itemsWrapper instanceof HTMLElement) || !viewBox) return

  const itemsBox = itemsWrapper.getBoundingClientRect()

  const maxLeft = 0
  const maxRight = (itemsBox.width - viewBox.width) * -1
  
  const returnObj = {
    moveVal: 0,
    atStart: false,
    atEnd: false
  }

  if (dir === 'next') {
    returnObj.moveVal = item.offsetLeft * -1

    if (itemsBox.width - item.offsetLeft <= viewBox.width) {
      returnObj.moveVal = maxRight
      returnObj.atEnd = true
    }
  }

  if (dir === 'prev') {
    returnObj.moveVal = (item.offsetLeft - viewBox.width + item.offsetWidth) * -1

    if ((item.offsetLeft - viewBox.width + item.offsetWidth) * -1 >= 0) {
      returnObj.moveVal = maxLeft
      returnObj.atStart = true
    }
  }

  return returnObj
}

// ////////////////////////////////////////////////////////////////////////
// Get distance to move when items are set to centerMode
// ////////////////////////////////////////////////////////////////////////

export const getCenterMoveVal = (item:Element, viewBox:DOMRect): number => {
  if (!item || !(item instanceof HTMLElement) || !viewBox) return

  const centerPoint = viewBox.width * 0.5
  const itemCenterPoint = item.offsetLeft + (item.offsetWidth * 0.5)

  return centerPoint - itemCenterPoint
}