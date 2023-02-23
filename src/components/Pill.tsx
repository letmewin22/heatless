import { Link } from 'gatsby'
import * as React from 'react'

interface IProps {
  tag?: keyof JSX.IntrinsicElements | 'Link'
  link?: string
  className?: string
  text: string
}

export const Pill: React.FC<IProps> = ({ text, tag, className, link }) => {
  const Tag = tag ?? 'div'
  const classes = ['pill', className].filter(cl => cl !== '')

  const el =
    Tag === 'Link' ? (
      <Link to={link} className={classes.join(' ')}>
        {text}
      </Link>
    ) : (
      <Tag className={classes.join(' ')}>{text}</Tag>
    )

  return el
}
