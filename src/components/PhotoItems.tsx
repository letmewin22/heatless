import { Link } from 'gatsby'
import * as React from 'react'
import { TImage, TLinkTo } from '../types/types'
import { keysGenerator } from '../utils/keysGenerator'
import { Arrow } from './icons/Arrow'
import { OptimizedFluidImageWithWrapper } from './OptimizedImage'

export interface IPhotoItem {
  link?: TLinkTo
  image: TImage
  title: string
  description?: string
  categorySlug?: string
}

interface IProps {
  items: IPhotoItem[]
}

const LinkInner: React.FC<IPhotoItem> = props => (
  <>
    <div className="photo-item__img-wrapper">
      <OptimizedFluidImageWithWrapper
        image={props.image.filename}
        wrapperClass="photo-item__img"
      />
      <div className="photo-item__link-arrow">
        <Arrow />
      </div>
    </div>
    <div className="photo-item__title">{props.title}</div>
    {props.description && (
      <div className="photo-item__desc">{props.description}</div>
    )}
  </>
)

export const PhotoItems: React.FC<IProps> = props => {
  return (
    <div className="photo-items">
      <div className="container photo-items__container">
        <ul className="photo-items__ul">
          {props.items.map(el => (
            <li key={keysGenerator(8)} className="photo-items__li photo-item">
              {el.link?.url || el.link?.cached_url ? (
                <Link
                  to={
                    el.link.url ||
                    el.link['cached_url'].replace(/\/$/gm, '') + ''
                  }
                  className="photo-item__link"
                >
                  <LinkInner
                    image={el.image}
                    title={el.title}
                    description={el.description}
                  />
                </Link>
              ) : (
                <div className="photo-item__link photo-item__link--nohover">
                  <LinkInner
                    image={el.image}
                    title={el.title}
                    description={el.description}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
