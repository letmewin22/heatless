import * as React from 'react'
import { Accordeon, IAccordeonItem } from './Accordeon'
import { IProps } from '../types/types'
import { Helmet } from 'react-helmet'

interface IContent {
  title: string
  description: string
  faq: IAccordeonItem[]
}

export const FAQ: React.FC<IProps<IContent>> = ({ blok }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      blok.faq.map(item => ({
        '@type': 'Question',
        name: item.title,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.text,
        },
      })),
    ],
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <section className="section faq">
        <div className="container faq__container">
          <h2 className="h2 faq__h2">{blok.title}</h2>
          <div className="faq__desc">{blok.description}</div>
          <div className="faq__accordeon">
            <Accordeon items={blok.faq} />
          </div>
        </div>
      </section>
    </>
  )
}
