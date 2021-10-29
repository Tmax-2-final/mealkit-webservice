import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LayoutOne from "../user/LayoutOne";
import Bread from "../../elements/ui/Bread";
import ReviewTable from './ReviewTable';
import axios from "axios";


export default function PkgReviewList(props) {

    const [reviewDatas, setReviewDatas] = useState([]);

    let token = localStorage.getItem('token');
    let pkgId = localStorage.getItem('pkgId');

    useEffect(() => {
        axios.get(`/review-service/reviews/pkg/${pkgId}`, {
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

            <LayoutOne headerTop="visible">
                <Bread productName="My Account" />
                <div className="login-register-area pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            {/* <div className="col-lg-7 col-md-12 ml-auto mr-auto"> */}
                            <div className="login-register-wrapper">
                                <div className="container" defaultActiveKey="login">
                                    <ul variant="pills" className="login-register-tab-list">

                                        <li>
                                            <Link eventKey="register">
                                                <h4>리뷰 목록</h4>
                                            </Link>
                                        </li>
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
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};
