import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import ReviewListView from './ReviewListView';

export default function ReviewTable({ reviewDatas, setReviewDatas }) {



    return (
        <div className="cart-main-area pt-12 pb-12">
            <div className="container">
                
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="table-content table-responsive cart-table-content" style={{ whiteSpace: "pre-wrap" }}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>이미지 </th>
                                        <th>제목 </th>
                                        <th>상품명</th>
                                        <th>내용</th>
                                        <th>평점</th>
                                        {/* <th>작성자 </th> */}
                                        
                                        {/* <th>삭제 </th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reviewDatas.map(item => (
                                            <ReviewListView
                                                key={item.reviewId}
                                                data={item}
                                            />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}