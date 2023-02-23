import * as React from 'react'

import useStoryblok from '../utils/storyblok'
import { Footer } from './Footer'
import { useStaticQuery, graphql } from 'gatsby'

import { Navbar } from './Navbar'
import { TLocation } from '../types/types'
import { Helmet } from 'react-helmet'
import Seo from './Seo'

interface IProps {
  children?: React.ReactNode
  location?: TLocation
}

const Layout: React.FC<IProps> = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query orgLayoutQueryAndLayoutQuery {
      storyblokEntry(full_slug: { eq: "global/colors" }) {
        content
      }
      allStoryblokEntry(filter: { field_component: { eq: "Organization" } }) {
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

  const story = data.storyblokEntry
  const { content } = useStoryblok(story)

  const org = data.allStoryblokEntry.edges[0]
  const orgContent = useStoryblok(org.node)

  const schemaLogo = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: location.origin,
    logo: orgContent.content.logo.filename,
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    address: {
      '@type': 'PostalAddress',
      streetAddress: orgContent.content?.street_address,
      addressLocality: orgContent.content?.address_locality,
      addressRegion: orgContent.content?.address_region,
      postalCode: orgContent.content?.postal_code,
      addressCountry: orgContent.content?.address_country,
    },
    name: orgContent.content.name,
  }

  React.useEffect(() => {
    document.documentElement.style.cssText = `
        --bg-main: ${content.Main.color};
        --bg-card: ${content.Card.color};
        --bg-accent: ${content.Accent.color};
        --bg-pill: ${content.Pill.color};
        --bg-badge: ${content.Badge.color};

        --field-default: ${content.Default.color};
        --field-hover: ${content.Hover.color};

        --alert-success: ${content.Success.color};
        --alert-error: ${content.Error.color};

        --typ-primary: ${content.Typ_Primary.color};
        --typ-body: ${content.Typ_Body.color};
        --typ-link: ${content.Typ_Link.color};
        --typ-pill: ${content.Typ_Pill.color};
        --typ-badge: ${content.Typ_Badge.color};
        --typ-accent: ${content.Typ_Accent.color};

        --nav-active: ${content.Nav_Active.color};
        --nav-default: ${content.Nav_Default.color};

        --icons-accent: ${content.Icons_Accent.color};
        --icons-default: ${content.Icons_Default.color};

        --btn-primary: ${content.Button_Primary.color};
        --btn-faded: ${content.Button_Hover.color};
        --btn-secondary: ${content.Button_Secondary.color};
      `
  }, [])
  return (
    <>
      <Seo
        title={orgContent.content.default_title}
        description={orgContent.content.default_description}
      />
      <Helmet>
        <link rel="icon" href={orgContent.content.favicon.filename} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaLogo)}</script>
      </Helmet>
      <Navbar location={location} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
