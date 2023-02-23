export const resetScroll = (): void => {
  document.body.style.scrollBehavior = 'smooth'
  document.documentElement.style.scrollBehavior = 'smooth'
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 0)
  setTimeout(() => {
    document.body.style.scrollBehavior = 'none'
    document.documentElement.style.scrollBehavior = 'none'
  }, 100)
}
