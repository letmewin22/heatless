import * as React from 'react'
import PageTransition from 'gatsby-plugin-page-transitions'
import { Helmet } from 'react-helmet'

import Layout from '../components/Layout'
import useStoryblok from '../utils/storyblok'
import { HeroV3 } from '../components/Hero/HeroV3'
import TemplateDynamicComponent from '../components/dynamicComponents/TemplateDynamicComponent'
import { IBreadcrumb } from '../components/Breadcrumbs'
import { InfoBlockV3 } from '../components/InfoBlock/InfoBlockV3'
import { graphql, useStaticQuery } from 'gatsby'
import { formatDate } from '../utils/formatDate'
import Seo from '../components/Seo'
import { OnScrollAnimation } from '../components/OnScrollAnimation'
import { getLink } from '../utils/getLink'

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const Post: React.FC<IProps> = ({ pageContext, location }) => {
  let story = pageContext.story
  story = useStoryblok(story, location)

  const author = story.content.author.content?.name
    ? `${story.content.author.content.name} | `
    : ''

  const authorData = {
    heading: story.content.author.content.name,
    text: story.content.author.content.description,
    small_text: story.content.article_by_text,
    image: story.content.author.content.avatar,
    link: [
      {
        text: story.content.author.content.email,
        to: { url: 'mailto:' + story.content.author.content.email },
      },
    ],
  }

  const components = story.content.body.map(blok => {
    if (blok.component === 'Article author block') {
      return <InfoBlockV3 key={blok._uid} blok={authorData} />
    }
    return (
      <OnScrollAnimation key={blok._uid}>
        <TemplateDynamicComponent blok={blok} location={location} />
      </OnScrollAnimation>
    )
  })

  const breadcrumbs: IBreadcrumb[] = [
    {
      name: 'Blog',
      link: '/blog/',
    },
    {
      name: story.content.category.content.value,
      link: '/blog/' + story.content.category.slug,
    },
    {
      name: story.content.title,
      link: '/' + story.full_slug,
    },
  ]

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

  const date = story.pubslished_at || story.created_at
  const formatedDate = formatDate(date, true)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: story.content.title,
    image: [story.content.image.filename],
    datePublished: date,
    author: {
      '@type': 'Person',
      name: story.content.author.content.name,
      url: null,
    },
    publisher: {
      '@type': 'Organization',
      name: orgContent.content.name,
      logo: {
        '@type': 'ImageObject',
        url: orgContent.content.logo.filename,
      },
    },
  }

  if (story.content.author.content.url) {
    schema.author.url = getLink(story.content.author.content.url)
  } else {
    delete schema.author.url
  }

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
              tag={story.content.category.content.value}
              text={`${author}${formatedDate}`}
              withBreadcrumbs={true}
              breadcrumbs={breadcrumbs}
              location={location}
            />
            <article>{components}</article>
          </>
        </PageTransition>
      </Layout>
    </>
  )
}

export default Post
