import * as React from 'react'
import Img from 'gatsby-image'
import {
  getFluidGatsbyImage,
  getFixedGatsbyImage,
} from 'gatsby-storyblok-image'

interface IProps {
  image: string
  width?: number
  className?: string
  alt?: string
  wrapperClass?: string
}

const fluidImage = (image, maxWidth) => {
  const fluidProps = maxWidth
    ? getFluidGatsbyImage(image, { maxWidth })
    : getFluidGatsbyImage(image)
  return fluidProps
}
const fixedImage = (image, width) => {
  const fixedProps = width
    ? getFixedGatsbyImage(image, { width })
    : getFixedGatsbyImage(image)
  return fixedProps
}

export const OptimizedFluidImage: React.FC<IProps> = props => {
  const { image, width } = props
  const fluidProps = fluidImage(image, width)
  return <Img fluid={fluidProps} className={props.className} alt={props.alt} />
}

export const OptimizedFluidImageWithWrapper: React.FC<IProps> = props => {
  return (
    <>
      <div className={`e-img-container ${props.wrapperClass}`}>
        <div className="e-img">
          <OptimizedFluidImage {...props} />
        </div>
      </div>
    </>
  )
}

export const OptimizedFixedImage: React.FC<IProps> = props => {
  const { image, width } = props

  const fixedProps = fixedImage(image, width)
  return <Img fixed={fixedProps} className={props.className} alt={props.alt} />
}
