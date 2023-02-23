/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import SbEditable from 'storyblok-react'
import { TLocation } from '../../types/types'

interface IBlok {
  blok: any
  location?: TLocation
}

interface IComponent {
  [key: string]: React.FC<IBlok>
}

interface IProps {
  blok: any
  context?: any
  Components: IComponent
  location?: TLocation
}

const DynamicComponent: React.FC<IProps> = ({ Components, blok, location }) => {
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component]
    return (
      <SbEditable content={blok}>
        <Component blok={blok} location={location} />
      </SbEditable>
    )
  }
  return (
    <p>
      The component <strong>{blok.component}</strong> has not been created yet.
    </p>
  )
}

export default DynamicComponent
