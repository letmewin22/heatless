import * as React from 'react'
import { OptimizedFluidImage } from '../OptimizedImage'
import { StoryLink } from '../StoryLink'

type TLink = {
  to: {
    url: string
  }
  text: string
}

interface IContent {
  heading: string
  text: string
  links: TLink[]
  image: string
}

interface IProps {
  blok: IContent
}

export const HeroV1: React.FC<IProps> = ({ blok }) => {
  return (
    <section className="section hero-1">
      <div className="container grid hero-1__container">
        <div className="hero-1__left">
          <h1 className="h1 hero-1__h">{blok.heading}</h1>
          <p className="hero-1__desc">{blok.text}</p>
          <ul className="hero-1__links">
            {blok.links.map(el => (
              <li key={el.text} className="hero-1__li">
                <StoryLink link={el}>{el.text}</StoryLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="hero-1__right">
          <div className="hero-1__right-img">
            <OptimizedFluidImage image={blok.image} />
          </div>
        </div>
      </div>
    </section>
  )
}
