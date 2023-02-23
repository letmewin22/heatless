import * as React from 'react'
import { IProps } from '../../types/types'
import { keysGenerator } from '../../utils/keysGenerator'

interface IColor {
  color: string
}

interface IItems {
  title: string
  title_color: IColor
  descriptor: string
  text: string
}

interface IContent {
  items: IItems[]
}

export const StatisticsV2: React.FC<IProps<IContent>> = ({ blok }) => {
  return (
    <div className="statistics-2">
      <div className="container statistics-2__container">
        <ul className="statistics-2__items">
          {blok.items.map(item => (
            <li key={keysGenerator(8)} className="statistics-2__item s-2-item">
              <div
                className="h2 s-2-item__number"
                style={{ color: item.title_color.color }}
              >
                {item.title}
              </div>
              <div className="s-2-item__tag">{item.descriptor}</div>
              <p className="s-2-item__text">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
