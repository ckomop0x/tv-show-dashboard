export default {
  mounted(el: HTMLElement) {
    el.addEventListener('wheel', (e) => {
      if (e.deltaY === 0) return
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }, { passive: false })
  },
}
