import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { TImage } from '../../types/types'
import useStoryblok from '../../utils/storyblok'
import { QuoteIcon } from '../icons/QuoteIcon'
import { OptimizedFluidImage } from '../OptimizedImage'
import { Rating } from '../Rating'

interface IContent {
  avatar: TImage
  text: string
  name: string
  occupation: string
  rating?: number | string
}

interface IProps {
  blok: IContent
}

export const QuoteV1: React.FC<IProps> = ({ blok }) => {
  const orgData = useStaticQuery(graphql`
    {
      stories: allStoryblokEntry(
        filter: { field_component: { eq: "Organization" } }
      ) {
        edges {
          node {
            id
            full_slug
            slug
            name
            content
          }
        }
      }
    }
  `)
  const org = orgData.stories.edges[0]
  const orgContent = useStoryblok(org.node)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Organization',
      image: orgContent.content.logo.filename,
      name: orgContent.content.name,
    },
    author: {
      '@type': 'Person',
      name: blok.name,
    },
    name: blok.text,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
    },
  }

  if (blok.rating) {
    schema.reviewRating = {
      '@type': 'Rating',
      ratingValue: blok.rating.toString(),
    }
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <div className="qoute-1">
        <div className="container qoute-1__container">
          <div className="qoute-1__q quote-1-q">
            <div className="quote-1-q__img-wrapper">
              <OptimizedFluidImage
                image={blok.avatar.filename}
                width={200}
                className="quote-1-q__img"
                alt={blok.name}
              />
              <div className="quote-1-q__icon">
                <QuoteIcon />
              </div>
            </div>
            <div className="quote-1-q__right">
              <p className="quote-1-q__text">{blok.text}</p>
              <div className="quote-1-q__details">
                <div className="qoute-1-q__name">{blok.name}</div>
                <small className="qoute-1-q__occup">{blok.occupation}</small>
                {blok.rating && <Rating rating={Number(blok.rating)} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
