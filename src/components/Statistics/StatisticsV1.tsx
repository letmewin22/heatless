import * as React from 'react'
import { TImage } from '../../types/types'
import { keysGenerator } from '../../utils/keysGenerator'
import { ILink } from '../AppLink'
import { OptimizedFluidImage } from '../OptimizedImage'
import { StoryLink } from '../StoryLink'

interface IItems {
  image: TImage
  descriptor: string
  text: string
}

interface IContent {
  heading: string
  text: string
  link: ILink
  items: IItems[]
}

interface IProps {
  blok: IContent
}

export const StatisticsV1: React.FC<IProps> = ({ blok }) => {
  return (
    <section className="statistics-1">
      <div className="container statistics-1__container">
        <div className="statistics-1__top">
          <h2 className="h2 statistics-1__h">{blok.heading}</h2>
          <div className="statistics-1__right">
            <p className="s-text statistics-1__text">{blok.text}</p>
            <StoryLink classes="statistics-1__link" link={blok.link[0]}>
              {blok.link[0].text}
            </StoryLink>
          </div>
        </div>
        <ul className="statistics-1__items">
          {blok.items.map(el => (
            <li key={keysGenerator(8)} className="statistics-1__item s-1-item">
              <OptimizedFluidImage
                image={el.image.filename}
                width={60}
                className="s-1-item__img"
              />
              <div className="s-1-item__text">
                <small className="s-1-item__desc">{el.descriptor}</small>
                <div className="s-1-item__h">{el.text}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
