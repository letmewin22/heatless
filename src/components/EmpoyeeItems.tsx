import * as React from 'react'
import { IProps } from '../types/types'
import { IPhotoItem, PhotoItems } from './PhotoItems'

interface IContent {
  title: string
  items: IPhotoItem[]
}

export const EmpoyeeItems: React.FC<IProps<IContent>> = ({ blok }) => {
  return (
    <section className="section ei">
      <div className="container ei__container">
        <h2 className="h2 ei__h2">{blok.title}</h2>
      </div>
      <div className="ei__items">
        <PhotoItems items={blok.items} />
      </div>
    </section>
  )
}
