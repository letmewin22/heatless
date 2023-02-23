import * as React from 'react'
import PageTransition from 'gatsby-plugin-page-transitions'

import Layout from '../components/Layout'
import useStoryblok from '../utils/storyblok'
import { HeroV3 } from '../components/Hero/HeroV3'
import TemplateDynamicComponent from '../components/dynamicComponents/TemplateDynamicComponent'
import { capitalizeFirstLetter } from '../utils/capFirstLetter'
import { keysGenerator } from '../utils/keysGenerator'
import { graphql, useStaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'
import Seo from '../components/Seo'
import { OnScrollAnimation } from '../components/OnScrollAnimation'
import { setSchemaOptionalFields } from '../utils/setSchemaOptionalFields'

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const Vacature: React.FC<IProps> = ({ pageContext, location }) => {
  let story = pageContext.story
  story = useStoryblok(story, location)

  const loc = story.content.location ? `${story.content.location} | ` : ''

  const components = story.content.body.map(blok => {
    return (
      <OnScrollAnimation key={blok._uid}>
        <TemplateDynamicComponent blok={blok} location={location} />
      </OnScrollAnimation>
    )
  })

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
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: story.content.title,
    description: `<p>${story.content.title} | ${story.content.sphere} | ${story.content.location} | ${story.content.employment_type}</p>`,
    identifier: {
      '@type': 'PropertyValue',
      name: orgContent.content.name,
      value: keysGenerator(8),
    },
    datePosted: story.published_at || story.created_at,
    hiringOrganization: {
      '@type': 'Organization',
      name: orgContent.content.name,
      sameAs: location.origin,
      logo: orgContent.content.logo.filename,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: orgContent.content?.street_address,
        addressLocality: orgContent.content?.address_locality,
        addressRegion: orgContent.content?.address_region,
        postalCode: orgContent.content?.postal_code,
        addressCountry: orgContent.content?.address_country,
      },
    },
  }

  const baseSalary = {
    '@type': 'MonetaryAmount',
    currency:
      story.content?.baseSalary && story.content?.baseSalary[0]?.currency,
    value: {
      '@type': 'QuantitativeValue',
      value:
        story.content?.baseSalary &&
        Number(story.content?.baseSalary[0]?.value),
      unitText:
        story.content?.baseSalary && story.content?.baseSalary[0]?.unitText,
    },
  }

  const schemaOptional = {
    validThrough: story.content.validThrough,
    employmentType: story.content.employmentType,
    baseSalary: story.content?.baseSalary ? baseSalary : undefined,
  }

  setSchemaOptionalFields(schema, schemaOptional)

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <Layout location={location}>
        <Seo
          title={story.content.metadata && story.content.metadata[0]?.title}
          description={
            story.content.metadata && story.content.metadata[0]?.description
          }
        />
        <PageTransition>
          <>
            <HeroV3
              heading={story.content.title}
              image={story.content.image.filename}
              tag={capitalizeFirstLetter(story.content.tag_name)}
              text={`${loc}${story.content.employment_type}`}
            />
            {components}
          </>
        </PageTransition>
      </Layout>
    </>
  )
}

export default Vacature
