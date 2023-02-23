import * as React from 'react'
import { OptimizedFluidImage } from '../OptimizedImage'
import { TImage } from '../../types/types'

interface IContent {
  heading: string
  text?: string
  icon?: TImage
  image?: TImage
}

interface IProps {
  blok: IContent
}

export const HeroV2: React.FC<IProps> = ({ blok }) => {
  return (
    <section className="section hero-2">
      <div className="container hero-2__container">
        {blok.icon.filename && (
          <div className="hero-2__icon">
            <img src={blok.icon.filename} alt="hero icon" />
          </div>
        )}
        <h1 className="h1 hero-2__h">{blok.heading}</h1>
        {blok.text && <p className="hero-2__text">{blok.text}</p>}
        {blok.image.filename && (
          <div className="hero-2__image">
            <OptimizedFluidImage image={blok.image.filename} width={600} />
          </div>
        )}
      </div>
    </section>
  )
}
