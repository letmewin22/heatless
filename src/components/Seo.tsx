import * as React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

type TMeta = [
  {
    name: 'description'
    content: string
  },
  {
    property: 'og:title'
    content: string
  },
  {
    property: 'og:description'
    content: string
  },
  {
    property: 'og:type'
    content: string
  },
  {
    name: 'twitter:card'
    content: string
  },
  {
    name: 'twitter:creator'
    content: string
  },
  {
    name: 'twitter:title'
    content: string
  },
  {
    name: 'twitter:description'
    content: string
  }
]

interface IProps {
  description?: string
  lang?: string
  meta?: TMeta | []
  title?: string
}

const Seo: React.FC<IProps> = ({ description, lang, meta = [], title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={title || defaultTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        ...meta,
      ]}
    />
  )
}

export default Seo
