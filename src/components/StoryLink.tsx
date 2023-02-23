import * as React from 'react'
import { TLink } from '../types/types'
import { getLink } from '../utils/getLink'
import { AppLink } from './AppLink'

interface IProps {
  link: TLink
  classes?: string
  children?: React.ReactNode
}

export const StoryLink: React.FC<IProps> = ({ link, classes, children }) => {
  const to = getLink(link.to)

  const newtab = Boolean(link.to.url !== '')
  return (
    <>
      <AppLink classes={classes} to={to} newtab={newtab}>
        {children}
      </AppLink>
    </>
  )
}
