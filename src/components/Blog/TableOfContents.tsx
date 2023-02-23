import * as React from 'react'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { keysGenerator } from '../../utils/keysGenerator'
import { IProps } from '../../types/types'

interface IContent {
  title?: string
}

interface IItem {
  text: string
  link: string
}
let timeout
export const TableOfContents: React.FC<IProps<IContent>> = ({
  blok,
  location,
}) => {
  const [items, setItems] = React.useState<IItem[]>([])

  React.useEffect(() => {
    timeout = setTimeout(() => {
      const h = Array.from(
        document.querySelectorAll('.post-block__h')
      ) as HTMLElement[]
      const itemsContent = h.map(el => ({
        text: el.innerText,
        link: el.getAttribute('id'),
      }))
      setItems(itemsContent)
    }, 1500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="toc">
      <div className="container toc__container">
        <div className="toc__card">
          <div className="toc__title">{blok.title}</div>
          <ul className="toc__items">
            {items.map(item => (
              <li key={keysGenerator(8)} className="toc__item">
                <AnchorLink to={location.pathname + '#' + item.link}>
                  {item.text}
                </AnchorLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
