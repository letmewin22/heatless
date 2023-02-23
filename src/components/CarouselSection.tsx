import * as React from 'react'
import { Link } from 'gatsby'
import { Arrow } from './icons/Arrow'
import { keysGenerator } from '../utils/keysGenerator'
import { TImage, TLinkTo } from '../types/types'
import { OptimizedFluidImageWithWrapper } from './OptimizedImage'

interface ICarousel {
  link: TLinkTo
  image: TImage
  text: string
}

interface IContent {
  heading: string
  slider: ICarousel[]
}

interface IProps {
  blok: IContent
}

export const CarouselSection: React.FC<IProps> = ({ blok }) => {
  const arrLength = blok.slider.length
  const [current, setCurrent] = React.useState(0)
  const [isNextDisabled, setIsNextDisabled] = React.useState(false)
  const carousel = React.useRef(null)
  const wrapper = React.useRef(null)

  const getOffset = () => {
    const items: HTMLElement[] =
      carousel.current.querySelectorAll('.carousel__item')
    const offset =
      carousel.current.getBoundingClientRect().right -
      items[0].getBoundingClientRect().width
    const wrapperWidth = wrapper.current.getBoundingClientRect().right

    if (offset <= wrapperWidth) {
      setIsNextDisabled(true)
    } else {
      setIsNextDisabled(false)
    }

    return offset <= wrapperWidth
  }

  const prevHandler = () => {
    setIsNextDisabled(false)
    setCurrent(prev => {
      if (prev >= 0) {
        return prev - 1
      } else {
        return prev
      }
    })
  }

  const nextHandler = () => {
    getOffset()
    setCurrent(prev => {
      return prev + 1
    })
  }

  const moveSlider = {
    transform: `translateX(-${current * (100 / arrLength)}%)`,
  }
  return (
    <section className="cs">
      <div className="container cs__container">
        <div className="cs__top">
          <h2 className="h2 cs__h">{blok.heading}</h2>
          <nav className="cs__nav carousel-nav">
            <button
              disabled={current <= 0}
              aria-label="Carousel previous button"
              className="carousel-nav__btn carousel-nav__btn--prev"
              onClick={prevHandler}
            >
              <Arrow />
            </button>
            <button
              disabled={isNextDisabled}
              aria-label="Carousel next button"
              className="carousel-nav__btn carousel-nav__btn--next"
              onClick={nextHandler}
            >
              <Arrow />
            </button>
          </nav>
        </div>
      </div>
      <div ref={wrapper} className="container cs__carousel-wrapper">
        <div className="carousel">
          <ul ref={carousel} className="carousel__items" style={moveSlider}>
            {blok.slider.map(el => (
              <li key={keysGenerator(8)} className="carousel__item">
                <Link
                  to={
                    el.link.url === ''
                      ? '/' + el.link['cached_url'].replace(/\/$/gm, '') + '/'
                      : el.link.url
                  }
                  className="carousel__link"
                >
                  <div className="carousel__image-wrapper">
                    <OptimizedFluidImageWithWrapper
                      image={el.image.filename}
                      wrapperClass="carousel__image"
                    />
                    <div className="carousel__link-arrow">
                      <Arrow />
                    </div>
                  </div>
                  <div className="carousel__text">{el.text}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
