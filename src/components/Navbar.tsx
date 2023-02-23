import * as React from 'react'
import { Button } from './Button'
import { graphql, useStaticQuery, Link } from 'gatsby'
import useStoryblok from '../utils/storyblok'
import { keysGenerator } from '../utils/keysGenerator'
import { getLink } from '../utils/getLink'
import { TLocation } from '../types/types'

interface IProps {
  location: TLocation
}

export const Navbar: React.FC<IProps> = () => {
  const data = useStaticQuery(graphql`
    query NavbarQuery {
      storyblokEntry(full_slug: { eq: "global/navbar" }) {
        content
      }
    }
  `)

  const story = data.storyblokEntry
  const { content } = useStoryblok(story)

  const navbarItems = content.Navigation_Links.map(item => ({
    text: item.text,
    to:
      '/' +
      (item.to['cached_url'] !== 'home'
        ? item.to['cached_url'].replace(/\/$/gm, '') + '/'
        : ''),
    badge: item.badge ? item.badge : null,
  }))

  const navbarSocial = content['Social'][0].link.map(item => ({
    link: item.link.url,
    label: item.label,
    icon: item.icon.filename,
  }))

  const [isOpen, setIsOpen] = React.useState(false)

  const burgerHandler = () => {
    setIsOpen(prev => {
      !prev
        ? document.body.classList.add('e-fixed')
        : document.body.classList.remove('e-fixed')
      !prev
        ? document.documentElement.classList.add('e-fixed')
        : document.documentElement.classList.remove('e-fixed')
      return !prev
    })
  }

  return (
    <>
      <div className={isOpen ? 'navbar navbar--open' : 'navbar'}>
        <div className="navbar__container">
          <Link to="/" className="navbar__logo">
            <img
              width="136"
              height="35"
              src={content.Logo.filename}
              alt="logo"
              className="navbar__logo-img"
            />
          </Link>
          <div className="navbar__right only-desktop">
            <nav className="navbar__nav navbar-nav">
              <ul className="navbar-nav__items">
                {navbarItems.map(item => (
                  <li
                    key={keysGenerator(8)}
                    className={`${
                      item.badge
                        ? 'navbar-nav__item navbar-nav__item--badge'
                        : 'navbar-nav__item'
                    }`}
                  >
                    <Link
                      to={item.to}
                      activeClassName="navbar-nav__link--active"
                      className="navbar-nav__link"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Button
              text={content.Button[0].text}
              isIcon={true}
              icon={content.Button[0].icon.filename}
              href={getLink(content.Button[0].link)}
            />
            <ul className="navbar__social navbar-social">
              {navbarSocial.map(el => (
                <li key={keysGenerator(8)} className="navbar-social__item">
                  <a
                    href={el.link}
                    aria-label={el.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={el.icon} width="17" height="17" alt={el.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={burgerHandler}
            aria-label="Menu button"
            className={
              isOpen
                ? 'navbar__burger burger burger--opened'
                : 'navbar__burger burger'
            }
          >
            <span className="burger__line"></span>
            <span className="burger__line"></span>
            <span className="burger__line"></span>
          </button>
        </div>
      </div>
      <div className={isOpen ? 'mobile-nav mobile-nav--opened' : 'mobile-nav'}>
        <div className="navbar__right">
          <nav className="navbar__nav navbar-nav">
            <ul className="navbar-nav__items">
              {navbarItems.map(item => (
                <li
                  key={keysGenerator(8)}
                  className={`${
                    item.badge
                      ? 'navbar-nav__item navbar-nav__item--badge'
                      : 'navbar-nav__item'
                  }`}
                  onClick={burgerHandler}
                >
                  <Link
                    to={item.to}
                    activeClassName="navbar-nav__link--active"
                    className="navbar-nav__link"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Button
            text={content.Button[0].text}
            isIcon={true}
            icon={content.Button[0].icon.filename}
            href={getLink(content.Button[0].link)}
          />
          <ul className="navbar__social navbar-social">
            {navbarSocial.map(el => (
              <li key={keysGenerator(8)} className="navbar-social__item">
                <a
                  href={el.link}
                  aria-label={el.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={el.icon} width="17" height="17" alt={el.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
