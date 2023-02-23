import * as React from 'react'
import { Pill } from '../Pill'
import { AppLink } from '../AppLink'
import { TImage, TLink, TLocation } from '../../types/types'
import { Link } from 'gatsby'
import { OptimizedFluidImageWithWrapper } from '../OptimizedImage'

interface IProps {
  tag?: keyof JSX.IntrinsicElements
  className?: string
  image: TImage
  rubric: string
  rubric_link: string
  date: string
  title: string
  text: string
  link: TLink
  idx?: number | string
  categorySlug?: string
  location?: TLocation
}

export type TPostItem = IProps

export const PostItem: React.FC<IProps> = props => {
  const Tag = props.tag ?? 'li'
  const classes = ['post-item', props.className].filter(cl => cl !== '')

  return (
    <Tag className={classes.join(' ')}>
      <div className="post-item__img-wrapper">
        <Link to={props.link.to.url} aria-label="post image">
          <OptimizedFluidImageWithWrapper
            image={props.image.filename}
            wrapperClass="post-item__img"
          />
        </Link>
      </div>
      <div className="post-item__container">
        <div className="post-item__ui">
          <Pill
            text={props.rubric}
            tag={'Link'}
            link={props.rubric_link}
            className="post-item__pill"
          />
          <div className="post-item__date">{props.date}</div>
        </div>
        <div className="post-item__content">
          <h3 className="h3 post-item__h">
            <span>
              <Link to={props.link.to.url}>{props.title}</Link>
            </span>
          </h3>
          <p className="post-item__text">{props.text}</p>
          <AppLink to={props.link.to.url} classes="post-item__link">
            {props.link.text}
          </AppLink>
        </div>
      </div>
    </Tag>
  )
}
