import * as React from 'react'
import PageTransition from 'gatsby-plugin-page-transitions'

import Layout from '../components/Layout'
import TemplateDynamicComponent from '../components/dynamicComponents/TemplateDynamicComponent'
import useStoryblok from '../utils/storyblok'
import { Helmet } from 'react-helmet'
import Seo from '../components/Seo'
import { OnScrollAnimation } from '../components/OnScrollAnimation'

const NEEDED_TAG = 'service'

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const Page: React.FC<IProps> = ({ pageContext, location }) => {
  let story = pageContext.story
  story = useStoryblok(story, location)

  const components = story.content.body.map(blok => {
    return (
      <OnScrollAnimation key={blok._uid}>
        <TemplateDynamicComponent blok={blok} location={location} />
      </OnScrollAnimation>
    )
  })

  let schema

  if (story.tag_list.includes(NEEDED_TAG)) {
    const firstBlok = story.content.body.find(el => el.heading)
    const reviewBlok = story.content.body.find(
      el => el.component === 'Quote V1' || el.component === 'Quote V2'
    )

    schema = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: firstBlok.heading,
      review: {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
        },
        author: {
          '@type': 'Person',
          name: reviewBlok.name,
        },
      },
    }
  }

  return (
    <>
      {story.tag_list.includes(NEEDED_TAG) && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
      )}
      <Layout location={location}>
        <Seo
          title={story.content.metadata && story.content.metadata[0]?.title}
          description={
            story.content.metadata && story.content.metadata[0]?.description
          }
        />
        <PageTransition>{components}</PageTransition>
      </Layout>
    </>
  )
}

export default Page
