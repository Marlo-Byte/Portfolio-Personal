// Utilidades para manipulación del DOM

/**
 * Scroll suave a un elemento
 */
export const scrollToElement = (elementId: string, offset: number = 80): void => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.offsetTop - offset
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}

/**
 * Verifica si un elemento está visible en el viewport
 */
export const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Obtiene el scroll actual de la página
 */
export const getScrollPosition = (): number => {
  return window.pageYOffset || document.documentElement.scrollTop
}
