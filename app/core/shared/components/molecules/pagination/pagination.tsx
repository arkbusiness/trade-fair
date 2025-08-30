'use client';

import { ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import ReactPaginate from 'react-paginate';
import { Button } from '../../atoms';
import './pagination.css';

interface PaginationProps {
  page: number;
  pageCount: number;
  handlePageClick(value: { selected: number }): void;
}

export const Pagination = ({
  handlePageClick,
  pageCount,
  page = 1
}: PaginationProps) => {
  return (
    <div className="px-0">
      <ReactPaginate
        breakLabel="..."
        previousLabel={
          <Button variant="outline" className="h-8 w-8 p-0 flex">
            <ChevronsLeftIcon />
            <span className="sr-only">Prev</span>
          </Button>
        }
        nextLabel={
          <Button variant="outline" className="h-8 w-8 p-0 flex">
            <span className="sr-only">Next</span>
            <ChevronsRightIcon />
          </Button>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        forcePage={page - 1}
        pageCount={pageCount} // Math.ceil(total / limit)
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item page-prev"
        previousLinkClassName="page-link"
        nextClassName="page-item page-next"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        renderOnZeroPageCount={() => null}
      />
    </div>
  );
};
