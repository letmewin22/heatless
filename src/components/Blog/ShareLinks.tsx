import * as React from 'react'
import { IProps } from '../../types/types'

interface IContent {
  title?: string
}

export const ShareLinks: React.FC<IProps<IContent>> = ({ blok, location }) => {
  return (
    <div className="share-links">
      <div className="container share-links__container">
        <div className="share-links__text">{blok.title}</div>
        <ul className="share-links__links">
          <li className="share-links__link sl-link">
            <a
              aria-label="share link facebook"
              target="_blank"
              rel="noreferrer noopener"
              href={`https://www.facebook.com/sharer.php?u=${location.href}`}
            >
              <img src="/img/social/fb.svg" alt="" />
            </a>
          </li>
          <li className="share-links__link sl-link">
            <a
              aria-label="share link linkedin"
              target="_blank"
              rel="noreferrer noopener"
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${location.href}`}
            >
              <img src="/img/social/linkedin.svg" alt="" />
            </a>
          </li>
          <li className="share-links__link sl-link">
            <a
              aria-label="share link twitter"
              target="_blank"
              rel="noreferrer noopener"
              href={`https://twitter.com/intent/tweet?url=${location.href}`}
            >
              <img src="/img/social/twitter.svg" alt="" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
