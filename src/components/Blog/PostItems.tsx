import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import { IProps, TImage } from '../../types/types'
import { getUnicArayOfObjects } from '../../utils/getUnicArayOfObjects'
import { keysGenerator } from '../../utils/keysGenerator'
import { resetScroll } from '../../utils/resetScroll'
import useStoryblok from '../../utils/storyblok'
import { Filter } from '../Filter'
import { Pagination } from './Pagination'
import { PostCta } from './PostCta'
import { PostItem, TPostItem } from './PostItem'

interface IButton {
  icon: TImage
  text: string
  link: {
    url: string
    cached_url: string
  }
}

interface IContent {
  tag_for_all_posts: string
  post_link_text: string
  ad_block_title: string
  ad_block_button: IButton[]
}

export const PostItems: React.FC<IProps<IContent>> = ({ blok, location }) => {
  const data = useStaticQuery(graphql`
    {
      stories: allStoryblokEntry(
        filter: { field_component: { eq: "post_page" } }
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
            created_at(formatString: "DD MMM YYYY")
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
      link: '/blog/' + slug + '/',
      isActive: slug === currentPath,
    }
  })

  cats = getUnicArayOfObjects(cats, 'name')

  const allItemsCat = {
    name: blok.tag_for_all_posts,
    link: '/blog/',
    isActive: currentPath === 'blog',
  }

  cats = [allItemsCat, ...cats]

  const items: TPostItem[] = entries.map(entry => {
    const story = useStoryblok(entry.node)

    const categorySlug = story.content.category.slug
    const pageSlug = entry.node.slug.replace(/\/$/gm, '')

    return {
      link: {
        to: { url: `/blog/${categorySlug}/${pageSlug}/` },
        text: blok.post_link_text,
      },
      image: story.content?.image,
      title: story.content?.title,
      text: story.content?.description,
      rubric: story.content?.category.content.value,
      rubric_link: `/blog/${categorySlug}`,
      date: story.created_at,
      categorySlug,
    }
  })

  let filteredItems

  if (currentPath !== 'blog') {
    filteredItems = items.filter(item => item.categorySlug === currentPath)
  } else {
    filteredItems = items
  }

  const ctaRepeatRate = 8

  const CTA = (key: string) => (
    <PostCta
      key={key}
      title={blok.ad_block_title}
      button={{
        text: blok.ad_block_button[0].text,
        icon: blok.ad_block_button[0].icon.filename,
        href:
          blok.ad_block_button[0].link.url ||
          blok.ad_block_button[0].link.cached_url,
      }}
    />
  )

  const newItems = filteredItems.map(item => (
    <PostItem
      key={keysGenerator(8)}
      image={item.image}
      date={item.date}
      rubric={item.rubric}
      rubric_link={item.rubric_link}
      title={item.title}
      text={item.text}
      link={item.link}
      location={location}
      idx={keysGenerator(8)}
    />
  ))

  for (
    let index = ctaRepeatRate;
    index < newItems.length + 1;
    index += ctaRepeatRate + 1
  ) {
    newItems.splice(index, 0, CTA(keysGenerator(8)))
  }

  const [pageNumber, setPageNumber] = React.useState(0)

  const itemsPerPage = 12
  const pagesVisited = pageNumber * itemsPerPage

  const displayItems = newItems.slice(pagesVisited, pagesVisited + itemsPerPage)

  const pageCount = Math.ceil(newItems.length / itemsPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected)
    resetScroll()
  }

  return (
    <div className="section post-items">
      <div className="container post-items__container">
        <Filter items={cats} />
        <ul className="post-items__items">{displayItems}</ul>
        <Pagination pageCount={pageCount} handler={changePage} />
      </div>
    </div>
  )
}
