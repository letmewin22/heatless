import * as React from 'react'
import PageTransition from 'gatsby-plugin-page-transitions'

import Layout from '../components/Layout'
import useStoryblok from '../utils/storyblok'
import { HeroV3 } from '../components/Hero/HeroV3'
import TemplateDynamicComponent from '../components/dynamicComponents/TemplateDynamicComponent'
import Seo from '../components/Seo'
import { OnScrollAnimation } from '../components/OnScrollAnimation'

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const Case: React.FC<IProps> = ({ pageContext, location }) => {
  let story = pageContext.story
  story = useStoryblok(story, location)

  const components = story.content.body.map(blok => {
    return (
      <OnScrollAnimation key={blok._uid}>
        <TemplateDynamicComponent location={location} blok={blok} />
      </OnScrollAnimation>
    )
  })

  return (
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
            tag={story?.content?.category?.content?.value}
            text={story.content.description}
          />
          {components}
        </>
      </PageTransition>
    </Layout>
  )
}

export default Case
