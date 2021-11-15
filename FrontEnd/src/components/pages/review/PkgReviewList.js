import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LayoutOne from "../user/LayoutOne";
import ReviewTable from './ReviewTable';
import axios from "axios";
import Pagination from "../../elements/ui/Pagination";


export default function PkgReviewList({ packageData, setReviewCnt }) {

    const [reviewDatas, setReviewDatas] = useState([]);

    // 페이징
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(0);
    const [loading, setLoading] = useState(true);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        getPkgReviews(pageNumber);
    }

    let token = localStorage.getItem('token');
    let pkgId = localStorage.getItem('pkgId');


    const getPkgReviews = (page) => {
        // axios.get(`/review-service/reviews/page/pkg/${packageData.patalogId}`, {
        axios.get(`/review-service/reviews/page/pkg/53`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page: page
            }
        })
            .then(res => {

                console.log(res.data.content);
                console.log('=======================');

                setReviewDatas(res.data.content);
                setTotalPosts(res.data.totalElements);
                setPostsPerPage(res.data.size);
                setLoading(false);
                setReviewCnt(res.data.totalElements)
            });
         
    }
    
    useEffect((e) => {
        getPkgReviews(1)
    }, []);

    return (
        <Fragment>
                <div className="login-register-area pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            {/* <div className="col-lg-7 col-md-12 ml-auto mr-auto"> */}
                            <div className="login-register-wrapper">
                                <div className="container" defaultActiveKey="login">
                                    <div>


                                        <ReviewTable
                                            reviewDatas={reviewDatas}
                                            setReviewDatas={setReviewDatas}

                                        />

                                    </div>
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                </div>
                <div className="row">
                    {
                        loading === false ?
                            <Pagination postsPerPage={postsPerPage} totalPosts={totalPosts} currentPage={currentPage}
                                paginate={paginate} />
                            :
                            ""
                    }

                </div>
                </div>
        </Fragment>
    );
};
