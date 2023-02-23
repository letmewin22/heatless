import * as React from 'react'
import { IProps } from '../../types/types'
import { keysGenerator } from '../../utils/keysGenerator'
import { CheckIcon, PlusIcon } from '../icons/ListIcons'

type TBlokBody = {
  icon: 'check' | 'plus'
  text: string
}

type TBlok = {
  body: TBlokBody[]
  title?: string
}

export const ListWithIcons: React.FC<IProps<TBlok>> = ({ blok }) => {
  return (
    <div className="section post">
      <div className="container post__container">
        <div className="post-block">
          {blok.title && <h2 className="h2 post-block__h">{blok.title}</h2>}
          <ul className="post-block__ul post-block__ul--with-icons">
            {blok.body.length &&
              blok.body.map(li => (
                <li key={keysGenerator(8)} className="post-block__li">
                  <span
                    className={`post-block__li-icon post-block__li-icon--${li.icon}`}
                  >
                    {li.icon === 'check' ? <CheckIcon /> : <PlusIcon />}
                  </span>
                  {li.text}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
