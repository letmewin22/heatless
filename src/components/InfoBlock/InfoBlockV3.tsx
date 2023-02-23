import * as React from 'react'
import { IProps, TImage, TLink } from '../../types/types'
import { OptimizedFluidImage } from '../OptimizedImage'
import { StoryLink } from '../StoryLink'

interface IContent {
  heading: string
  text: string
  small_text?: string
  bold_text?: string
  image: TImage
  link?: TLink[]
}

export const InfoBlockV3: React.FC<IProps<IContent>> = ({ blok }) => {
  const containerClasses = ['container', 'info-block-3__container']

  return (
    <section className="section info-block-1 info-block-3">
      <div className={containerClasses.join(' ')}>
        <div className="info-block-3__img-wrapper">
          <div className="info-block-3__img">
            <OptimizedFluidImage image={blok.image.filename} width={600} />
          </div>
        </div>
        <div className="info-block-3__content">
          {blok['small_text'] && (
            <div className="info-block__small">{blok['small_text']}</div>
          )}
          {blok['bold_text'] && (
            <div className="info-block__bold">{blok['bold_text']}</div>
          )}
          <h2 className="h2 info-block-3__h2">{blok.heading}</h2>
          <p className="s-text info-block-3__text">{blok.text}</p>
          {blok.link[0] && (
            <StoryLink classes="info-block-3__link" link={blok.link[0]}>
              {blok.link[0].text}
            </StoryLink>
          )}
        </div>
      </div>
    </section>
  )
}
