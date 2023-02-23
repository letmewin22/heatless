import * as React from 'react'

interface IContent {
  heading: string
  text: string
}

interface IProps {
  blok: IContent
}

export const InfoBlockV1: React.FC<IProps> = ({ blok }) => {
  return (
    <section className="section info-block-1">
      <div className="container info-block-1__container">
        <div className="info-block-1__content">
          <h2 className="h2 info-block-1__h2">{blok.heading}</h2>
          <p className="info-block-1__text">{blok.text}</p>
        </div>
      </div>
    </section>
  )
}
