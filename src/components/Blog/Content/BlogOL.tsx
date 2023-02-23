import * as React from 'react'

export interface IOl {
  children: React.ReactNode
}

export const BlogOl: React.FC<IOl> = ({ children }) => {
  return <ol className="post-block__ol">{children}</ol>
}
