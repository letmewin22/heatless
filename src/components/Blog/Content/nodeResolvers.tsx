import * as React from 'react'
import {
  NODE_HEADING,
  NODE_PARAGRAPH,
  NODE_OL,
  NODE_UL,
  NODE_LI,
} from 'storyblok-rich-text-react-renderer'
import { Heading, TLevel } from './BlogHeading'
import { BlogLi } from './BlogLi'
import { BlogOl } from './BlogOL'
import { BlogText } from './BlogText'
import { BlogUl } from './BlogUl'

export const nodeResolvers = {
  [NODE_HEADING]: function NODE_HEADING(
    children: React.ReactNode,
    { level }: { level: TLevel }
  ): React.ReactNode {
    return <Heading level={level}>{children}</Heading>
  },
  [NODE_PARAGRAPH]: function NODE_PARAGRAPH(
    children: React.ReactNode
  ): React.ReactNode {
    return <BlogText>{children}</BlogText>
  },
  [NODE_OL]: function NODE_OL(children: React.ReactNode): React.ReactNode {
    return <BlogOl>{children}</BlogOl>
  },

  [NODE_UL]: function NODE_UL(children: React.ReactNode): React.ReactNode {
    return <BlogUl>{children}</BlogUl>
  },
  [NODE_LI]: function NODE_LI(children: React.ReactNode): React.ReactNode {
    return <BlogLi>{children}</BlogLi>
  },
}
