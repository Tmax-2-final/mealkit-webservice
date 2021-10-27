import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import LayoutOne from "../../pages/user/LayoutOne";
import Bread from "../../elements/ui/Bread";


export default function ReviewList(props) {


    // constructor(props) {
    //     super(props)
    //     // # 1. 
    //     this.state = {
    //         boards: []
    //     }

    // }

    // componentDidMount() {
    //     BoardService.getBoards().then((res) => {
    //         this.setState({ boards: res.data });
    //     });
    // }

    return (
        <Fragment>

            <LayoutOne headerTop="visible">
                <Bread productName="My Account" />
                <div className="login-register-area pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-md-12 ml-auto mr-auto">
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
                                            
                                            <div className="row">
                                                <table className="table table-striped table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>글 번호</th>
                                                            <th>제목 </th>
                                                            <th>상품명</th>
                                                            <th>작성자 </th>
                                                            <th>작성일 </th>
                                                            <th>평점</th>
                                                            
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            // this.state.boards.map(
                                                            //     board =>
                                                            //         <tr key={review.no}>
                                                            //             <td> {review.no} </td>
                                                            //             <td> {review.title} </td>
                                                            //             <td> {review.product_id} </td>
                                                            //             <td> {review.user_id} </td>
                                                            //             <td> {review.createdTime} </td>
                                                            //             <td> {review.rating} </td>
                                                            
                                                            //         </tr>
                                                            // )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};
