import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { IProps } from '../../types/types'
import useStoryblok from '../../utils/storyblok'

interface IContent {
  name: string
  text: string
}

export const QuoteV2: React.FC<IProps<IContent>> = ({ blok }) => {
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

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <div className="quote-2">
        <div className="container quote-2__container">
          <div className="quote-2__q quote-2-q">
            <div className="quote-2-q__text">{blok.text}</div>
            <div className="quote-2-q__name">– {blok.name}</div>
          </div>
        </div>
      </div>
    </>
  )
}
