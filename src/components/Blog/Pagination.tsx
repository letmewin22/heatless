import * as React from 'react'
import ReactPaginate from 'react-paginate'
import { Arrow } from '../icons/Arrow'

interface IProps {
  pageCount: number
  handler: ({}) => void
}

export const Pagination: React.FC<IProps> = ({ pageCount, handler }) => {
  return (
    <ReactPaginate
      previousLabel={<Arrow />}
      nextLabel={<Arrow />}
      breakLabel={'...'}
      breakClassName={'pagination__item break-me'}
      pageClassName={'pagination__item'}
      previousClassName={'pagination__item pagination__prev'}
      nextClassName={'pagination__item pagination__next'}
      pageCount={pageCount}
      marginPagesDisplayed={0}
      pageRangeDisplayed={2}
      onPageChange={handler}
      containerClassName={'pagination'}
      activeClassName={'active'}
    />
  )
}
