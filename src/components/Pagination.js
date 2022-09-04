import React from "react";

export default function Pagination(props) {
    const nPages = props.nPages;
    const currentPage = props.currentPage;
    const setCurrentPage = props.setCurrentPage;
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    const nextPage = () => {
        if (currentPage !== nPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const prevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <nav>
            <ul className="pagination justify-content-end">
                <li className="page-item">
                    <button className="page-link" onClick={prevPage}>
                        <i class="bi bi-caret-left-fill"></i>
                    </button>
                </li>
                {pageNumbers.map(pgNumber => {
                    return (
                        <li key={pgNumber} className={`page-item ${currentPage == pgNumber ? 'active' : ''}`}>
                            <button onClick={() => setCurrentPage(pgNumber)} className="page-link">
                                {pgNumber}
                            </button>
                        </li>
                    )
                })}
                <li className="page-item">
                    <button className="page-link" onClick={nextPage}>
                        <i class="bi bi-caret-right-fill"></i>
                    </button>
                </li>
            </ul>
        </nav>
    )

}