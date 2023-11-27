// Is the current item in view, checking the left and right borders of an item relative to the viewbox
export const itemInView = (currentItemBox:DOMRect, viewBox:DOMRect, buffer:number=0): boolean => {
  if (!currentItemBox || !viewBox) return
  return (currentItemBox.left > (viewBox.left - buffer)) && (currentItemBox.right < (viewBox.right + buffer))
}

// Get the int value of how far to move
export const getMoveVal = (item:Element, viewBox:DOMRect, dir:string='next'): number => {
  if (!item || !(item instanceof HTMLElement) || !viewBox) return

  if (dir == 'next') {
    return (item.offsetLeft - viewBox.width + item.offsetWidth) * -1
  } else {
    return item.offsetLeft * -1
  }
}