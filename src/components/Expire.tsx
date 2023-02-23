import * as React from 'react'

interface IProps {
  delay: number
  children: React.ReactNode
}
let _timer
export const Expire: React.FC<IProps> = ({ delay, children }) => {
  const [isVisible, setIsVivisble] = React.useState(true)

  const setTimer = () => {
    _timer != null ? clearTimeout(_timer) : null

    _timer = setTimeout(function () {
      setIsVivisble(false)
      _timer = null
    }, delay)
  }

  React.useEffect(() => {
    setTimer()
    return () => {
      clearTimeout(_timer)
    }
  }, [])

  return <>{isVisible === true && children}</>
}
