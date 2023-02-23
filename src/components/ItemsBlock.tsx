import { Link } from 'gatsby'
import * as React from 'react'
import { TImage, TLink } from '../types/types'
import { getLink } from '../utils/getLink'
import { keysGenerator } from '../utils/keysGenerator'
import { Arrow } from './icons/Arrow'

interface IBlockItem {
  icon: TImage
  heading: string
  text: string
  link: TLink[]
}

interface IContent {
  items: IBlockItem[]
}

interface IProps {
  blok: IContent
}

export const ItemsBlock: React.FC<IProps> = ({ blok }) => {
  let itemsClass = ''
  const { items } = blok

  if (items.length >= 3) {
    itemsClass = 'items-block__items--3'
  }

  return (
    <div className="items-block">
      <div className="container items-block__container">
        <ul className={`items-block__items ${itemsClass}`}>
          {items.length &&
            items.map(el => (
              <li key={keysGenerator(8)} className="items-block__item ib-item">
                <Link to={getLink(el.link[0].to)}>
                  <div className="ib-item__icon">
                    <img src={el.icon.filename} alt="" />
                  </div>
                  <div className="ib-item__top">
                    <div className="h3 ib-item__h">{el.heading}</div>
                    <div className="h3 ib-item__arrow">
                      <Arrow />
                    </div>
                  </div>
                  <div className="ib-item__text">{el.text}</div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
