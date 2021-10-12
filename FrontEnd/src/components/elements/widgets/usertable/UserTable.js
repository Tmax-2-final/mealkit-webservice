import React, { useEffect, useState } from 'react';
import CartListView from '../../ui/CartListView';
import axios from "axios";
import { Link } from 'react-router-dom';
import UserListView from '../../ui/UserListView';

export default function UserTable({ userDatas, setUserDatas }) {


    // // const [totalPrice, setTotalPrice] = useState(0);
    // let userId = localStorage.getItem('userid');

    return (
        <div className="cart-main-area pt-20 pb-30">
            <div className="container">
                <h3 className="cart-page-title">회원 목록</h3>
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="table-content table-responsive cart-table-content">
                            <table className="usertable">
                                <thead>
                                    <tr>
                                        <th>사용자 이메일</th>
                                        <th>사용자명</th>
                                        <th>생성 날짜</th>
                                        <th>수정 날짜</th>
                                        <th>삭제</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userDatas.map(item => (
                                            <UserListView
                                                key={item.userid}
                                                data={item}
                                                setUserDatas={setUserDatas}
                                            />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="cart-shiping-update-wrapper">
                        </div>
                    </div>
                </div> */}

                {/* <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="grand-totall">
                            <div className="title-wrap">
                        
                            </div>
                            <a href="/checkout">수정하기</a>
                        </div>
                    </div>
                </div> */}

            </div>
        </div>
    );
}