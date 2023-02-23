import * as React from 'react'
import { IProps, TImage } from '../../types/types'
import { getLink } from '../../utils/getLink'
import { Button, IButton } from '../Button'
import { OptimizedFluidImageWithWrapper } from '../OptimizedImage'

interface IContent {
  title: string
  image: TImage
  button: IButton
  align: 'left' | 'right'
}

export const CTAV1: React.FC<IProps<IContent>> = ({ blok }) => {
  return (
    <div className={`cta-1 cta-1--${blok.align}`}>
      <div className="cta-1__img-wrapper">
        <OptimizedFluidImageWithWrapper
          image={blok.image.filename}
          className="cta-1__img"
        />
      </div>

      <div className="container cta-1__card cta-1-card">
        <div className="cta-1-card__content">
          <div className="h2 cta-1-card__h">{blok.title}</div>
          <Button
            className="cta-1-card__btn"
            color="secondary"
            isIcon={true}
            icon={blok.button[0].icon.filename}
            href={getLink(blok.button[0].link)}
            text={blok.button[0].text}
          ></Button>
        </div>
      </div>
    </div>
  )
}
