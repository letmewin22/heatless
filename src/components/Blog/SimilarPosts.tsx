import * as React from 'react'
import { IProps } from '../../types/types'
import { formatDate } from '../../utils/formatDate'
import { keysGenerator } from '../../utils/keysGenerator'

import { PostItem, TPostItem } from './PostItem'

interface IContent {
  title: string
  post_link_text: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: any[]
}

export const SimilarPosts: React.FC<IProps<IContent>> = ({ blok }) => {
  const items: TPostItem[] = blok.post.map(post => {
    const categorySlug = post.content?.category?.slug
    if (!categorySlug) {
      return null
    }
    const pageSlug = post.slug.replace(/\/$/gm, '')
    let date: string | Date | number = Date.parse(post.created_at)
    date = formatDate(new Date(new Date(1632763352231)))

    return {
      link: {
        to: { url: `/blog/${categorySlug}/${pageSlug}` },
        text: blok.post_link_text,
      },
      image: post.content?.image,
      title: post.content?.title,
      text: post.content?.description,
      rubric: post.content?.category.content.value,
      rubric_link: `/blog/${categorySlug}`,
      date,
      categorySlug,
    }
  })

  if (!items.filter(el => el !== null).length) {
    return (
      <div className="container similar-not-found">
        <p>Preview for similar posts is not available</p>
      </div>
    )
  }

  const newItems = items.map(item => (
    <PostItem
      key={keysGenerator(8)}
      image={item.image}
      date={item.date}
      rubric={item.rubric}
      rubric_link={item.rubric_link}
      title={item.title}
      text={item.text}
      link={item.link}
      idx={keysGenerator(8)}
    />
  ))

  return (
    <div className="section post-items">
      <div className="container post-items__container">
        <h2 className="h2 similar__h2">{blok.title}</h2>
        <ul className="post-items__items">{newItems}</ul>
      </div>
    </div>
  )
}
