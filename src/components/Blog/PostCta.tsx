import * as React from 'react'
import { Button, IButton } from '../Button'

interface IProps {
  title: string
  button: IButton
}

export const PostCta: React.FC<IProps> = props => {
  return (
    <div className="post-cta__card post-cta">
      <div className="post-cta__content">
        <div className="h3 post-cta__h">{props.title}</div>
        <Button
          {...props.button}
          className="post-cta__btn"
          color="secondary"
          isIcon={true}
        />
      </div>
    </div>
  )
}
