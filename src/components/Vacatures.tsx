import { graphql, Link, useStaticQuery } from 'gatsby'
import * as React from 'react'
import { IProps } from '../types/types'
import { keysGenerator } from '../utils/keysGenerator'
import useStoryblok from '../utils/storyblok'

interface ITableItem {
  link: {
    url: string
  }
  title: string
  sphere: string
  location: string
}

interface IContent {
  heading: string
  text: string
  items: ITableItem[]
}

export const Vacatures: React.FC<IProps<IContent>> = ({ blok }) => {
  const th = [
    blok['table_first_heading'],
    blok['table_second_heading'],
    blok['table_third_heading'],
  ]

  const data = useStaticQuery(graphql`
    {
      stories: allStoryblokEntry(
        filter: { field_component: { eq: "vacature" } }
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

  const items: ITableItem[] = entries.map(entry => {
    const story = useStoryblok(entry.node)

    return {
      link: { url: '/' + entry.node.full_slug.replace(/\/$/gm, '') + '/' },
      title: story.content?.title,
      sphere: story.content?.sphere,
      image: story.content?.image,
      location: story.content?.location,
    }
  })

  return (
    <section className="section vacatures">
      <div className="container vacatures__container">
        <div className="vacatures__content">
          <h2 className="h2 vacatures__h2">{blok.heading}</h2>
          <p className="vacatures__text">{blok.text}</p>
        </div>
        <div className="vacatures__table">
          <div className="vacatures__tr">
            {th.map(el => (
              <div key={keysGenerator(8)} className="vacatures__th">
                {el}
              </div>
            ))}
          </div>
          <div className="vacatures__t-items">
            {items.map(item => (
              <Link
                key={keysGenerator(8)}
                to={item.link.url}
                className="vacatures__tr vacatures__ti vacatures-ti"
              >
                <div className="vacatures-ti__block vacatures-ti__block--1">
                  {item.title}
                </div>
                <div className="vacatures-ti__block vacatures-ti__block--2">
                  {item.sphere}
                </div>
                <div className="vacatures-ti__block vacatures-ti__block--3">
                  {item.location}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
