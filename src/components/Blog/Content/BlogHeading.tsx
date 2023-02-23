import * as React from 'react'
import { keysGenerator } from '../../../utils/keysGenerator'

export type TLevel = 1 | 2 | 3 | 4 | 5 | 6

export type THeading = {
  children: React.ReactNode
  level: TLevel
}

type TTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export const Heading: React.FC<THeading> = ({ children, level }) => {
  const Tag: TTag = `h${level}` ?? 'h2'
  return (
    <Tag id={'_' + keysGenerator(8)} className={`${Tag} post-block__h`}>
      {children}
    </Tag>
  )
}
