import * as React from 'react'
import { IProps } from '../../types/types'
import { keysGenerator } from '../../utils/keysGenerator'

interface IHead {
  value: string
}

interface IBody {
  body: IHead[]
}

interface IContent {
  title: string
  table: {
    thead: IHead[]
    tbody: IBody[]
  }
}

export const Table: React.FC<IProps<IContent>> = ({ blok }) => {
  return (
    <div className="in-text-table">
      <div className="container in-text-table__container">
        <div className="h4 in-text-table__title">{blok.title}</div>
        <div className="in-text-table__table-wrapper">
          <table className="in-text-table__table">
            <thead>
              <tr>
                {blok.table.thead.map(th => (
                  <th key={keysGenerator(8)}>{th.value}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {blok.table.tbody.map(tr => (
                <tr key={keysGenerator(8)}>
                  {tr.body.map(td => (
                    <td key={keysGenerator(8)}>{td.value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
