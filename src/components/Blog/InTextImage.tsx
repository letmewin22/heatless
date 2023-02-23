import * as React from 'react'
import { IProps, TImage } from '../../types/types'
import { OptimizedFluidImageWithWrapper } from '../OptimizedImage'

interface IContent {
  image: TImage
  type?: 'default' | 'full'
}

export const InTextImage: React.FC<IProps<IContent>> = ({ blok }) => {
  return (
    <div className="in-text-image">
      <div className="container in-text-image__container">
        <div
          className={`in-text-image__wrapper in-text-image__wrapper--${blok.type}`}
        >
          <OptimizedFluidImageWithWrapper
            image={blok.image.filename}
            wrapperClass={`in-text-image__img in-text-image__img--${blok.type}`}
          />
        </div>
      </div>
    </div>
  )
}
