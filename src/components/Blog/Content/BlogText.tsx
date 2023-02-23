import * as React from 'react'

export interface IText {
  children: React.ReactNode
}

export const BlogText: React.FC<IText> = ({ children }) => {
  return <p className="post-block__text">{children}</p>
}
