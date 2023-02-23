import * as React from 'react'
import { IProps } from '../types/types'
import { keysGenerator } from '../utils/keysGenerator'
import { OptimizedFluidImageWithWrapper } from './OptimizedImage'

interface IContent {
  image_1: {
    filename: string
  }
  image_2: {
    filename: string
  }
  image_3: {
    filename: string
  }
  image_4: {
    filename: string
  }
}

export const Imagery: React.FC<IProps<IContent>> = ({ blok }) => {
  const items = [
    blok.image_1.filename,
    blok.image_2.filename,
    blok.image_3.filename,
    blok.image_4.filename,
  ]
  return (
    <div className="imagery">
      <div className="container imagery__container">
        <ul className="imagery__items">
          {items.map(item => (
            <li key={keysGenerator(8)} className="imagery__item imagery-item">
              <div className="imagery-item__img-wrapper">
                <OptimizedFluidImageWithWrapper
                  image={item}
                  wrapperClass="imagery-item__img"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
