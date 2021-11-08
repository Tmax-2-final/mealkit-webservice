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


export default function UserReviewList(props) {

    const [reviewDatas, setReviewDatas] = useState([]);

    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userid');

    useEffect(() => {
        axios.get(`/review-service/reviews/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(data => {
                console.log(data);
                setReviewDatas(data.data);
            });
    }, []);
   
    return (
        <Fragment>

            <Header />
            <Bread
                productId={`test`}
                productName={`주문서`}
                productUrl={`test3`}
            />
            <section id="mypage">
                
                    <div className="row">
                        <div className="col-2 offset-1">
                            <Sidebar />
                        </div>
                        <div className="col-8 offset-1">
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
                    </div>
                
                <br /><br /><br />
            </section>
            {/*<ProductBottom/>*/}
            <Footer />
        </Fragment >
    );
};
