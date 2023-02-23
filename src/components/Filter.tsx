import * as React from 'react'
import { Link } from 'gatsby'
import { keysGenerator } from '../utils/keysGenerator'

interface IItem {
  name: string
  link: string
  isActive: boolean
}

interface IProps {
  items: IItem[]
}

export const Filter: React.FC<IProps> = ({ items }) => {
  return (
    <nav className="filter">
      <div className="container">
        <ul className="filter__items">
          {items.map(el => {
            const filterItemClasses = ['filter__item', 'filter-item']
            el.isActive && filterItemClasses.push('active')
            return (
              <li
                key={keysGenerator(8)}
                className={filterItemClasses.join(' ')}
              >
                <Link to={el.link}>{el.name}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
