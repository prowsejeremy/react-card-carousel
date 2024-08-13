// Is the current item in view, checking the left and right borders of an item relative to the viewbox
export const itemInView = (currentItemBox:DOMRect, viewBox:DOMRect, buffer:number=0): boolean => {
  if (!currentItemBox || !viewBox) return
  return (currentItemBox.left > (viewBox.left - buffer)) && (currentItemBox.right < (viewBox.right + buffer))
}

interface getMoveValReturnObj {
  moveVal: number
  atStart: boolean
  atEnd: boolean
}

// Get the int value of how far to move
export const getMoveVal = (item:Element, itemsWrapper:Element, viewBox:DOMRect, dir:string='next'): getMoveValReturnObj => {
  if (!item || !(item instanceof HTMLElement) || !(itemsWrapper instanceof HTMLElement) || !viewBox) return

  const itemsBox = itemsWrapper.getBoundingClientRect()
  const itemBox = item.getBoundingClientRect()

  const maxLeft = 0
  const maxRight = (itemsBox.width - viewBox.width) * -1
  
  const returnObj = {
    moveVal: 0,
    atStart: false,
    atEnd: false
  }

  if (dir === 'next') {
    returnObj.moveVal = item.offsetLeft * -1

    if (itemsBox.width - item.offsetLeft <= viewBox.right) {
      returnObj.moveVal = maxRight
      returnObj.atEnd = true
    }
  }

  if (dir === 'prev') {
    returnObj.moveVal = (item.offsetLeft - viewBox.width + item.offsetWidth) * -1

    if ((item.offsetLeft - viewBox.width + item.offsetWidth) * -1 >= 0) {
      console.log('passed left?')
      returnObj.moveVal = maxLeft
      returnObj.atStart = true
    }
  }

  return returnObj
}