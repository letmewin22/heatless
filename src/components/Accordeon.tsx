import * as React from 'react'
import AccordeonHandler from '../utils/AccordeonHandler'
import { keysGenerator } from '../utils/keysGenerator'
import { AccordeonArrow } from './icons/AccordeonArrow'

export interface IAccordeonItem {
  title: string
  text: string
}

interface IProps {
  items: IAccordeonItem[]
}

const AccordeonItem: React.FC<IAccordeonItem> = item => (
  <div className="accordeon__item">
    <div className="accordeon__top">
      <h3 className="h3 accordeon__h">{item.title}</h3>
      <div className="accordeon__arrow">
        <AccordeonArrow />
      </div>
    </div>
    <div className="accordeon__text">{item.text}</div>
  </div>
)

export const Accordeon: React.FC<IProps> = ({ items }) => {
  React.useEffect(() => {
    let accordeon: typeof AccordeonHandler.prototype
    setTimeout(() => {
      accordeon = new AccordeonHandler('.accordeon__item', '.accordeon__text')
    }, 1000)
    return () => {
      setTimeout(() => {
        accordeon?.destroy()
      }, 1001)
    }
  }, [])

  return (
    <div className="accordeon">
      <div className="accordeon__items">
        {items.map(item => (
          <AccordeonItem
            key={keysGenerator(8)}
            title={item.title}
            text={item.text}
          />
        ))}
      </div>
    </div>
  )
}
