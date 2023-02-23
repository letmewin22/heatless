import { Link } from 'gatsby'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { TLocation } from '../types/types'
import { keysGenerator } from '../utils/keysGenerator'

export interface IBreadcrumb {
  name: string
  link: string
}

interface IProps {
  className?: string
  items?: IBreadcrumb[]
  location?: TLocation
}

export const Breadcrumbs: React.FC<IProps> = ({
  className,
  items,
  location,
}) => {
  const classNames = ['breadcrumbs']
  className && classNames.push(className)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: location.origin + item.link,
    })),
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <ul className={classNames.join(' ')}>
        {items.map((item, i) => (
          <li key={keysGenerator(8)} className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={item.link}>
              {item.name}
            </Link>
            {i !== items.length - 1 && (
              <span className="breadcrumbs__divider">&nbsp; &gt; &nbsp;</span>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
