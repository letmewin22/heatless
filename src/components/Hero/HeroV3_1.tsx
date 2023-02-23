import * as React from 'react'
import { HeroV3 } from './HeroV3'
import { Breadcrumbs } from '../Breadcrumbs'

interface IProps {
  tag: string
  heading: string
  text: string
  image: React.ReactNode
}

export const HeroV3_1: React.FC<IProps> = props => {
  return (
    <HeroV3 {...props}>
      <Breadcrumbs className="hero-2__breadcrumbs" />
    </HeroV3>
  )
}
