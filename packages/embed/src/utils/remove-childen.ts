export const removeChildren = (element: HTMLElement) => {
  if (element.hasChildNodes()) {
    while (element.firstChild) {
      element.removeChild(element.lastChild)
    }
  }
}
