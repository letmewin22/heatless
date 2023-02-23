import * as React from 'react'

export interface ILi {
  children: React.ReactNode
}

export const BlogLi: React.FC<ILi> = ({ children }) => {
  return <li className="post-block__li">{children}</li>
}
