import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import { IProps } from '../types/types'
import { getUnicArayOfObjects } from '../utils/getUnicArayOfObjects'
import useStoryblok from '../utils/storyblok'
import { Filter } from './Filter'
import { IPhotoItem, PhotoItems } from './PhotoItems'

interface IContent {
  Tag_for_all_cases: string
}

export const CaseItems: React.FC<IProps<IContent>> = ({ blok, location }) => {
  const data = useStaticQuery(graphql`
    {
      stories: allStoryblokEntry(
        filter: { field_component: { eq: "case_page" } }
        sort: { fields: created_at, order: DESC }
      ) {
        edges {
          node {
            id
            name
            slug
            field_component
            full_slug
            content
          }
        }
      }
    }
  `)
  const entries = data.stories.edges

  const currentPath = location.pathname
    .match(/\/([a-z0-9_-]*[\/]?)$/g)[0]
    .replace('/', '')
    .replace('/', '')

  let cats = entries.map(cat => {
    const story = useStoryblok(cat.node)
    const slug = story.content.category.slug
    return {
      name: story.content.category.content.value,
      link: '/cases/' + slug + '/',
      isActive: slug === currentPath,
    }
  })

  cats = getUnicArayOfObjects(cats, 'name')

  const allItemsCat = {
    name: blok.Tag_for_all_cases,
    link: '/cases/',
    isActive: currentPath === 'cases',
  }

  cats = [allItemsCat, ...cats]

  const items: IPhotoItem[] = entries.map(entry => {
    const story = useStoryblok(entry.node)

    const categorySlug = story.content.category.slug
    const pageSlug = entry.node.slug.replace(/\/$/gm, '')

    return {
      link: { url: `/cases/${categorySlug}/${pageSlug}/` },
      image: story.content?.image,
      title: story.content?.title,
      description: story.content?.description,
      categorySlug,
    }
  })

  let filteredItems

  if (currentPath !== 'cases') {
    filteredItems = items.filter(item => item.categorySlug === currentPath)
  } else {
    filteredItems = items
  }

  return (
    <section className="section ei">
      <div className="ei__items ci-items">
        <Filter items={cats} />
        <PhotoItems items={filteredItems} />
      </div>
    </section>
  )
}
