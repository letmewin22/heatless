import * as React from 'react'
import { MARK_LINK } from 'storyblok-rich-text-react-renderer'
import { BlogLink, IBlogLink } from './BlogLink'

export const markResolvers = {
  [MARK_LINK]: function MARK_LINK(
    children: React.ReactNode,
    props: IBlogLink
  ): React.ReactNode {
    return <BlogLink {...props}>{children}</BlogLink>
  },
}
