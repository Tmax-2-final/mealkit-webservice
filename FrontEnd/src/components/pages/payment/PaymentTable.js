import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import PaymentListView from './PaymentListView';

export default function PaymentTable({orderData}) {

    return (
        <div className="cart-main-area pt-20 pb-100">
            <div className="container">
                <h3 className="cart-page-title">결제 목록</h3>
                
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="table-content table-responsive cart-table-content">
                            <table>
                                <thead>
                                    <tr>
                                        <th>주문날짜</th>
                                        <th>주문번호</th>
                                        <th>아이디</th>
                                        <th>결제금액</th>
                                        <th>주문상태</th>
                                        <th>주문취소</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderData.map(item => (
                                            <PaymentListView
                                                key={item.orderId}
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