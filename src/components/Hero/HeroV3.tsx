import * as React from 'react'
import { TLocation } from '../../types/types'
import { Breadcrumbs, IBreadcrumb } from '../Breadcrumbs'
import { OptimizedFluidImage } from '../OptimizedImage'
import { Pill } from '../Pill'

interface IContent {
  tag: string
  withBreadcrumbs?: boolean
  breadcrumbs?: IBreadcrumb[]
  heading: string
  text: string
  image: string
  location?: TLocation
}

export const HeroV3: React.FC<IContent> = props => {
  return (
    <section className="section hero-2">
      <div className="container hero-2__container">
        {props.withBreadcrumbs && (
          <Breadcrumbs
            className="hero-2__breadcrumbs"
            items={props.breadcrumbs}
            location={props.location}
          />
        )}
        <Pill text={props.tag} className="hero-2__tag" />
        <h1 className="h1 hero-2__h">{props.heading}</h1>
        <p className="hero-2__text">{props.text}</p>
        <div className="hero-2__image">
          <OptimizedFluidImage image={props.image} width={1176} />
        </div>
      </div>
    </section>
  )
}
