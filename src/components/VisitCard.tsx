import * as React from 'react'
import { IProps, TImage } from '../types/types'
import { OptimizedFluidImage } from './OptimizedImage'

interface IContent {
  logo: TImage
  image: TImage
  heading: string
  first_contact: string
  second_contact: string
  third_contact: string
  fourth_contact: string
}

export const VisitCard: React.FC<IProps<IContent>> = ({ blok }) => {
  return (
    <div className="section visit-card">
      <div className="container visit-card__container">
        <div className="visit-card__item vc">
          <div className="vc__left">
            <div className="vc__logo">
              <img src={blok.logo.filename} alt="" />
            </div>
            <div className="h4 vc__h">{blok.heading}</div>
            <div className="vc__contacts">
              <div className="vc__contact">{blok.first_contact}</div>
              <div className="vc__contact">{blok.second_contact}</div>
              <div className="vc__contact">{blok.third_contact}</div>
              <div className="vc__contact">{blok.fourth_contact}</div>
            </div>
          </div>
          <div className="vc__right">
            <div className="vc__image">
              <OptimizedFluidImage
                image={blok.image.filename}
                width={600}
                className="vc__img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
