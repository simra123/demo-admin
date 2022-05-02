import React from 'react'
import {
    Pagination,
    PaginationItem,
    PaginationLink,
} from 'reactstrap';

// custom pagination
const PaginationSmall = ({ dataPerPage, Paginate, totalPages, currentPage }) => {
    const pageNumber = []
    /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
    for (let i = 1; i <= Math.ceil(totalPages / dataPerPage); i++) {
        pageNumber.push(i)
    }
    return (
        <Pagination
            size="sm"
            aria-label="Page navigation example"
            listClassName="justify-content-center mt-2"
        >
            <PaginationItem>
                <PaginationLink className="prev" href="#">
                    <i className="simple-icon-arrow-left" />
                </PaginationLink>
            </PaginationItem>
            { pageNumber.length ? pageNumber.map((number) => {
                return (
                    <PaginationItem key={ number } onClick={ () => Paginate(number) } className={ currentPage === number ? "active" : "" } >
                        <PaginationLink href='#' >{ number }</PaginationLink>
                    </PaginationItem>

                )
            }) : null }
            <PaginationItem>
                <PaginationLink className="next" href="#">
                    <i className="simple-icon-arrow-right" />
                </PaginationLink>
            </PaginationItem>

        </Pagination>
    )
}
export default PaginationSmall