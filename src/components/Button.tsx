import * as React from 'react'
import { navigate } from 'gatsby'

export interface IButton {
  text: string
  color?: string
  type?: 'button' | 'submit' | 'reset'
  isIcon?: boolean
  icon?: string
  className?: string
  onClick?: () => void
  href?: string
  children?: React.ReactNode
}

type TProps = IButton

export const Button: React.FC<TProps> = props => {
  const colorClass = props.color ? `btn--${props.color}` : 'btn--primary'
  const classes = ['btn', props.className, colorClass]

  const clickHandler = () => {
    if (props.href) {
      navigate(props.href)
      return
    }
    props.onClick && props.onClick()
  }

  const icon = props.icon

  return (
    <button
      type={props.type}
      onClick={clickHandler}
      className={classes.join(' ')}
    >
      <span className="btn__text">{props.text}</span>
      {props.children && props.children}
      {icon && (
        <img
          width="31"
          height="31"
          src={icon}
          alt="button icon"
          className="btn__icon"
        />
      )}
    </button>
  )
}
