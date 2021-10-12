import React from "react";
    const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
        console.log(postsPerPage);
        console.log(totalPosts)
        const pageNumber = [];

        //Math.ceil : 올림 처리
        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
            console.log(totalPosts/postsPerPage);
            pageNumber.push(i);
        }
        console.log(pageNumber);

        return (
            <div className="pagination text-center mt-30">
                <ul className="pagination mb-0 mt-0"> 
                {pageNumber.map((pageNum) => (
                    <li
                        key={pageNum}
                        className="pagination"
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