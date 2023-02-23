type TLink = {
  url?: string
  cached_url?: string
}

// eslint-disable-next-line no-unused-vars
type TReturn = (link: TLink) => string

export const getLink: TReturn = (link: TLink) => {
  if (!link) {
    return ''
  }
  if (
    link.cached_url === 'home' ||
    (link.cached_url === '' && link.url === '')
  ) {
    return '/'
  }
  return link.url === '' ? '/' + link.cached_url + '/' : link.url
}
