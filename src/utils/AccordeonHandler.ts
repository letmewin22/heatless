export default class AccordeonHandler {
  elem: NodeListOf<HTMLElement>
  child: string
  resizeCb: () => void

  constructor(elem: string, child: string) {
    this.elem = document.querySelectorAll(elem)
    this.child = child

    this.render = this.render.bind(this)

    this.elem.forEach(el => {
      el.addEventListener('click', this.render)
    })
  }

  render(e: MouseEvent): void {
    const elem = e.currentTarget as HTMLElement

    if (elem.classList.contains('opened')) elem.classList.remove('opened')
    else {
      this.elem.forEach(el => el.classList.remove('opened'))

      this.resizeCb = () => {
        this.setSizes(elem)
      }

      window.addEventListener('resize', this.resizeCb)
      this.resizeCb()
      elem.classList.add('opened')
    }
  }

  setSizes(elem: HTMLElement): void {
    const h = elem.querySelector(this.child).scrollHeight * 0.01
    elem.style.setProperty('--h', `${h}px`)
  }

  destroy(): void {
    window.removeEventListener('resize', this.resizeCb)

    this.elem.forEach(el => {
      el.removeEventListener('click', this.render)
    })
  }
}
