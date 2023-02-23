import * as React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'

interface IProps {
  children: React.ReactNode
}

export const OnScrollAnimation: React.FC<IProps> = ({ children }) => {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== undefined) {
      setIsMobile(window.innerWidth > 960)
    }
  }, [])

  const OnScollJSX = children => (
    <ScrollAnimation
      animateIn="fadeIn"
      animateOnce={true}
      scrollableParentSelector={null}
    >
      {children}
    </ScrollAnimation>
  )

  return <>{isMobile ? OnScollJSX(children) : children}</>
}
