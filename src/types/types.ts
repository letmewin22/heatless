export type TImage = {
  filename: string
}

export type TLinkTo = {
  url?: string
  cached_url?: string
}

export type TLink = {
  to: TLinkTo
  text?: string
}

export type TLocation = {
  pathname: string
  href: string
  origin: string
}

export interface IProps<C> {
  blok: C
  location?: TLocation
}
