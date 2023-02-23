/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { IProps, TImage } from '../../types/types'
import { getLink } from '../../utils/getLink'
import { Button } from '../Button'

interface IContent {
  title: string
  text: string
  first_button: any[]
  second_button: any[]
  icon?: TImage
}

export const CTAV2: React.FC<IProps<IContent>> = ({ blok }) => {
  return (
    <div className="cta-2">
      <div className="container cta-2__container">
        <div className="cta-2__card cta-2-card">
          <div className="h3 cta-2-card__h">{blok.title}</div>
          <p className="cta-2-card__text">{blok.text}</p>
          <div className="cta-2-card__btns">
            <Button
              text={blok.first_button[0].text}
              icon={blok.first_button[0]?.icon?.filename}
              href={getLink(blok.first_button[0].link)}
              className="cta-2-card__btn cta-2-card__btn--faded"
            />
            <Button
              text={blok.second_button[0].text}
              icon={blok.second_button[0]?.icon?.filename}
              href={getLink(blok.second_button[0].link)}
              className="cta-2-card__btn"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
