import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LayoutOne from "../user/LayoutOne";
import Bread from "../../elements/ui/Bread";
import ReviewTable from './ReviewTable';
import axios from "axios";
import Header from "../../layout/Header";
import Sidebar from '../../elements/ui/Sidebar';
import Footer from "../../layout/Footer";
import Pagination from "../../elements/ui/Pagination";

export default function UserReviewList(props) {

    const [reviewDatas, setReviewDatas] = useState([]);

    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userid');

    // 페이징
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [postsPerPage, setPostsPerPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [orderType, setOrderType] = useState(1);

    const firstPage = 1;

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        getReviewOrderType(orderType, pageNumber);
    }

    const getReviewOrderType = (orderType, page) => {
        axios.get(`/review-service/reviews/${userId}/${orderType}?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {

                console.log(res.data.content);
                console.log('=======================');

                setReviewDatas(res.data.content);
                setTotalPosts(res.data.totalElements);
                setPostsPerPage(res.data.size);
                setLoading(false);

            })
    }

    useEffect((e) => {
        getReviewOrderType(orderType, firstPage)  
    }, []);

    const orderTypeHandler = (orderType, e) => {
        e.preventDefault();
        console.log(orderType);
        setLoading(true);

        getReviewOrderType(orderType, firstPage)
        setOrderType(orderType);
    }

    return (
        <Fragment>

            <Header />
            <Bread
                productId={`test`}
                productName={`작성한 후기 조회`}
                productUrl={`test3`}
            />
            <section id="mypage">
                
                    <div className="row">
                        <div className="col-2 offset-1">
                            <Sidebar />
                        </div>
                    <div className={`col-8 ml-40`}>
                        <div className="row">
                            
                                <div className="login-register-wrapper">
                                    <div className="container" defaultActiveKey="login">
                                    <ul style={{ listStyle: "none", textAlign: "right", marginTop: "10px", marginBottom: "-30px" }}>
                                        <li style={{ display: "inline", marginRight: "20px", fontSize: "15px" }}> <Link onClick={(e) => orderTypeHandler(1, e)}>패키지</Link></li>
                                        <li style={{ display: "inline", marginRight: "20px", fontSize: "15px" }}> | </li>
                                        <li style={{ display: "inline", marginRight: "60px", fontSize: "15px" }}> <Link onClick={(e) => orderTypeHandler(2, e)}>상품</Link></li>
                                    </ul>
                                    
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
                    
                </div>
                   
                
                <br /><br /><br />
            </section>
            {/*<ProductBottom/>*/}
            <Footer />
        </Fragment >
    );
};
