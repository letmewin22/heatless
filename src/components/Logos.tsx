import * as React from 'react'
import { TImage } from '../types/types'

type TItem = {
  image: TImage
}

interface IContent {
  items: TItem[]
}

interface IProps {
  blok: IContent
}

export const Logos: React.FC<IProps> = ({ blok }) => {
  return (
    <div className="container logos-wrapper">
      <ul className="logos">
        {blok.items.map(el => (
          <li key={el.image.filename} className="logos__item">
            <img
              width="100%"
              height="100%"
              src={el.image.filename}
              alt="partners logo"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
