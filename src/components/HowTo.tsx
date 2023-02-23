import * as React from 'react'
import { Helmet } from 'react-helmet'
import { IProps, TImage } from '../types/types'
import { keysGenerator } from '../utils/keysGenerator'
import { setSchemaOptionalFields } from '../utils/setSchemaOptionalFields'
import { OptimizedFluidImageWithWrapper } from './OptimizedImage'

interface IItems {
  title: string
  text: string
  image: TImage
  url?: string
}

interface IContent {
  items: IItems[]
  description: string
  heading: string
  totalTime?: string
  tool?: string
  supply?: string
}

interface IStep {
  '@type': string
  image: {
    '@type': string
    url: string
  }
  url?: string
}

interface IHowTo {
  '@context': string
  '@type': string
  name: string
  description: string
  step: IStep[]
  totalTime?: string
  tool?: string
  supply?: string
}

export const HowTo: React.FC<IProps<IContent>> = ({ blok }) => {
  const schema: IHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: blok.heading || 'JSON Schema name',
    description: blok.description || 'JSON Schema description',
    totalTime: 'PT2M',
    step: blok.items.map(item => ({
      '@type': 'HowToStep',
      image: {
        '@type': 'ImageObject',
        url: item.image.filename,
      },
      name: item.title,
      text: item.text,
    })),
  }

  const schemaOptional = {
    tool: blok.tool,
    supply: blok.supply,
  }

  setSchemaOptionalFields(schema, schemaOptional)

  blok.items.length &&
    blok.items.forEach((item, i) => {
      setSchemaOptionalFields(schema.step[i], { url: item.url })
    })

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <div className="how-to">
        <div className="container how-to__container">
          <ul className="how-to__els">
            {blok.items.map((item, idx) => (
              <li key={keysGenerator(8)} className="how-to__el how-to-el">
                <div className="how-to-el__left">
                  <div data-n={idx + 1} className="how-to-el__h">
                    {item.title}
                  </div>
                  <p className="how-to-el__text">{item.text}</p>
                </div>
                <div className="how-to__img-wrapper">
                  <OptimizedFluidImageWithWrapper
                    image={item.image.filename}
                    wrapperClass="how-to__img"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
