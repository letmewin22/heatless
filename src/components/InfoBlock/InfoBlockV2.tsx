import * as React from 'react'
import { TImage, TLink } from '../../types/types'
import { OptimizedFluidImage } from '../OptimizedImage'
import { StoryLink } from '../StoryLink'

interface IContent {
  heading: string
  text: string
  image: TImage
  icon?: TImage
  link: TLink
  reverse?: boolean
}

interface IProps {
  blok: IContent
}

export const InfoBlockV2: React.FC<IProps> = ({ blok }) => {
  const containerClasses = ['container', 'info-block-2__container']

  blok.reverse && containerClasses.push('info-block-2__container--reverse')

  return (
    <section className="section info-block-1 info-block-2">
      <div className={containerClasses.join(' ')}>
        <div className="info-block-2__content">
          {blok.icon && (
            <div className="info-block__icon">
              <img src={blok.icon.filename} alt="" />
            </div>
          )}
          <h2 className="h2 info-block-2__h2">{blok.heading}</h2>
          <p className="info-block-2__text">{blok.text}</p>
          {blok.link[0] && (
            <StoryLink link={blok.link[0]} classes="info-block-2__link">
              {blok.link[0].text}
            </StoryLink>
          )}
        </div>
        <div className="info-block-2__img-wrapper">
          <OptimizedFluidImage
            image={blok.image.filename}
            className={'info-block-2__img'}
          />
        </div>
      </div>
    </section>
  )
}
