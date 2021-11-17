import React from "react";
    const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
        const pageNumber = [];

        const pageCnt = Math.ceil(totalPosts / postsPerPage);

        if(isFinite(pageCnt) || isNaN(pageCnt)){
            //Math.ceil : 올림 처리
            for (let i = 1; i <= pageCnt; i++) {
                pageNumber.push(i);
            }
        }

        return (
            <div className="pagination text-center mt-30">
                <ul className="pagination mb-0 mt-0"> 
                {pageNumber.map((pageNum) => (
                    <li
                        key={pageNum}
                        className={`pagination ${currentPage === pageNum ? "active" : ""}`}
                        onClick={() => paginate(pageNum)}
                    >
                        <button className="page-link">{pageNum}</button>
                    </li>
                ))}
                </ul>
            </div>
        );
    };

export default Pagination;