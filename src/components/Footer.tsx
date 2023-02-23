import { graphql, Link, useStaticQuery } from 'gatsby'
import * as React from 'react'
import { keysGenerator } from '../utils/keysGenerator'
import useStoryblok from '../utils/storyblok'

export const Footer: React.FC = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      storyblokEntry(full_slug: { eq: "global/footer" }) {
        content
      }
    }
  `)

  const story = data.storyblokEntry
  const { content } = useStoryblok(story)

  const footerItems = content['Navigation_Links'].map(item => ({
    text: item.text,
    to:
      '/' +
      (item.to['cached_url'] !== 'home'
        ? item.to['cached_url'].replace(/\/$/gm, '') + '/'
        : ''),
  }))

  const footerSocial = content['Social'][0].link.map(item => ({
    link: item.link.url,
    label: item.label,
    icon: item.icon.filename,
  }))

  return (
    <footer className="footer">
      <div className="container footer__container">
        <nav className="footer__nav footer-nav">
          <ul className="footer-nav__items">
            {footerItems.map(el => (
              <li key={keysGenerator(8)} className="footer-nav__item">
                <Link
                  to={el.to}
                  className="footer-nav__link"
                  activeClassName="footer-nav__link--active"
                >
                  {el.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="footer__social footer-social">
          {footerSocial.map(el => (
            <li key={keysGenerator(8)} className="footer-social__item">
              <a
                href={el.link}
                aria-label={el.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img width="17" height="17" src={el.icon} alt={el.label} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
