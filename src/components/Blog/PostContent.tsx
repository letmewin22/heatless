import * as React from 'react'
import { render } from 'storyblok-rich-text-react-renderer'
import { IProps } from '../../types/types'
import { markResolvers } from './Content/markResolvers'
import { nodeResolvers } from './Content/nodeResolvers'

type TItem = {
  type: string
  attrs?: {
    level: number
  }
  content: []
}

interface IContent {
  text: {
    content: TItem[]
  }
}

export const PostContent: React.FC<IProps<IContent>> = ({ blok }) => {
  const jsx = render(blok.text, {
    markResolvers,
    nodeResolvers,
  })
  return (
    <div className="section post">
      <div className="container post__container">
        <div className="post-block">{jsx.map(item => item)}</div>
      </div>
    </div>
  )
}
