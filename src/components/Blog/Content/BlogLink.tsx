import { Link } from 'gatsby'
import * as React from 'react'

export interface IBlogLink {
  linktype: string
  href: string
  target: string
  children: React.ReactNode
}

export const BlogLink: React.FC<IBlogLink> = ({
  linktype,
  href,
  children,
  target,
}) => {
  if (linktype === 'email') {
    return (
      <a href={`mailto:${href}`} className="blog-link">
        {children}
      </a>
    )
  }
  if (href.match(/^(https?:)?\/\//)) {
    return (
      <a href={href} className="blog-link" target={target}>
        {children}
      </a>
    )
  }
  return (
    <Link className="blog-link" to={href}>
      {children}
    </Link>
  )
}
