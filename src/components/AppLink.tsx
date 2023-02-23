import { Link } from 'gatsby'
import * as React from 'react'
import { Arrow } from './icons/Arrow'

interface IProps {
  to: string
  classes?: string
  children?: React.ReactNode
  newtab?: boolean
}

export interface ILink {
  to: string
  newtab?: boolean
  text?: string
}

const LinkInner: React.FC = props => (
  <>
    <span className="link__wrapper">
      <span className="link__children">{props.children}</span>
    </span>
    <span className="link__arrow">
      <Arrow />
    </span>
  </>
)

export const AppLink: React.FC<IProps> = ({
  to,
  classes,
  children,
  newtab,
}) => {
  const linkClasses = ['link']
  classes && linkClasses.push(classes)
  {
    return newtab ? (
      <a
        className={linkClasses.join(' ')}
        href={to}
        target="_blank"
        rel="noreferrer noopener"
      >
        <LinkInner>{children}</LinkInner>
      </a>
    ) : (
      <Link className={linkClasses.join(' ')} to={to}>
        <LinkInner>{children}</LinkInner>
      </Link>
    )
  }
}
