import * as React from 'react'

export interface IUl {
  children: React.ReactNode
}

export const BlogUl: React.FC<IUl> = ({ children }) => {
  return <ul className="post-block__ul">{children}</ul>
}
