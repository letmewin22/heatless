import * as React from 'react'
import { IProps, TImage, TLink } from '../../types/types'
import { keysGenerator } from '../../utils/keysGenerator'
import { AppLink } from '../AppLink'

interface ISecondBlockText {
  text: string
}

interface IContent {
  title: string
  text: string
  link: TLink
  card_icon: TImage
  card_title: string
  card_first_blok_title: string
  card_first_blok_text: string
  card_second_blok_title: string
  card_second_blok_text: ISecondBlockText[]
}

export const InfoBlockV4: React.FC<IProps<IContent>> = ({ blok }) => {
  return (
    <section className="section info-block-1 info-block-4">
      <div className="container info-block-4__container">
        <div className="info-block-4__details details-4">
          <div className="details-4__icon">
            <img src={blok.card_icon.filename} alt="" />
          </div>
          <h3 className="h3 details-4__h">{blok.card_title}</h3>
          <div className="details-4__block details-4-block">
            <h4 className="details-4-block__h">{blok.card_first_blok_title}</h4>
            <p className="details-4-block__text">{blok.card_first_blok_text}</p>
          </div>
          <div className="details-4__block details-4-block">
            <h4 className="details-4-block__h">
              {blok.card_second_blok_title}
            </h4>
            {blok.card_second_blok_text.map(el => (
              <p key={keysGenerator(8)} className="details-4-block__text">
                {el.text}
              </p>
            ))}
          </div>
        </div>
        <div className="info-block-4__content">
          <h2 className="h2 info-block-3__h2">{blok.title}</h2>
          <p className="s-text info-block-3__text">{blok.text}</p>
          {blok.link[0] && (
            <AppLink
              classes="info-block-3__link"
              to={
                '/' +
                (blok.link[0].to['cached_url'] !== 'home'
                  ? blok.link[0].to['cached_url']
                  : '')
              }
            >
              {blok.link[0].text}
            </AppLink>
          )}
        </div>
      </div>
    </section>
  )
}
