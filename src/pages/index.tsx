import * as React from 'react'
import PageTransition from 'gatsby-plugin-page-transitions'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import useStoryblok from '../utils/storyblok'
import TemplateDynamicComponent from '../components/dynamicComponents/TemplateDynamicComponent'
import Seo from '../components/Seo'
import { TLocation } from '../types/types'
import { OnScrollAnimation } from '../components/OnScrollAnimation'

interface IData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storyblokEntry: any
}

interface IProps {
  data?: IData
  location?: TLocation
}

const IndexPage: React.FC<IProps> = ({ data, location }) => {
  const story = data.storyblokEntry
  const { content } = useStoryblok(story, location)

  const components = content.body.map(blok => {
    return (
      <OnScrollAnimation key={blok._uid}>
        <TemplateDynamicComponent blok={blok} />
      </OnScrollAnimation>
    )
  })

  return (
    <Layout location={location}>
      <Seo
        title={content.metadata[0].title}
        description={content.metadata[0].description}
      />
      <PageTransition>{components}</PageTransition>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query HomeQuery {
    storyblokEntry(full_slug: { eq: "home" }) {
      content
    }
  }
`
