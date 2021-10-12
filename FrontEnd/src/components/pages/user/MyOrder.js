import React, { Fragment, useEffect, useState } from 'react';
import Bread from '../../elements/ui/Bread';
import Title from '../../elements/ui/Title';
import SubTitle from '../../elements/ui/SubTitle';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import SideBar from '../../elements/ui/Sidebar';
import axios from 'axios';
import MyOrderListView from './MyOrderListView';

function MyOrder(props) {

    const [orderDatas, setOrderDatas] = useState([]);

    // 주문 조회 호출
    useEffect(() => {

        let userId = localStorage.getItem('userid');
        let token = localStorage.getItem('token');

        if (!userId || userId === 'undefined') {
            window.location.href = "/login";
        }
        if (!token || token === 'undefined') {
            window.location.href = "/login";
        }

        axios.get(`/order-service/${userId}/orders`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(data => {
                console.log(data.data);
                // console.log(data.data[0].ordersMgt);
                setOrderDatas(data.data);
            })
    }, []);

    const orderStatus = (data) => {
        console.log(data);
        if (data === "1") {
            return <span>결제 완료</span>
        }
        else if (data === "2") {
            return <span>배송 준비중</span>
        }
        else if (data === "3") {
            return <span>배송 중</span>
        }
        else if (data === "4") {
            return <span>배송 완료</span>
        }
        else if (data === "5") {
            return <span>주문 취소</span>
        }
        else {
            return <span>에러</span>
        }
    }


    return (
        <Fragment>
            <Header />
            <Bread
                productId={`test`}
                productName={`주문서`}
                productUrl={`test3`}
            />
            <section id="mypage">

                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <SideBar />
                        </div>
                        <div className="col-9">
                            <Title title="My Account" />
                            <SubTitle title="주문 정보" />
                            <hr></hr>
                            <div className="table-content table-responsive cart-table-content">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>주문번호</th>
                                            <th>상품명</th>
                                            <th>단가</th>
                                            <th>수량</th>
                                            <th>총 가격</th>
                                            <th>주문 상태</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orderDatas.map((item, index) => (
                                                console.log(item),

                                                item.ordersMgt.map((items) => (
                                                    console.log(items),
                                                    <tr>
                                                        <td className="product-orderId">{items.orderId}</td>
                                                        <td className="product-name">
                                                            <span>{items.name}</span>
                                                        </td>
                                                        <td className="product-price-cart">
                                                            <span className="amount">{items.unitPrice} 원</span>
                                                        </td>
                                                        <td className="product-quantity">
                                                            <span className="amount">{items.qty}</span>
                                                        </td>
                                                        <td className="product-subtotal"><span>{(items.unitPrice * items.qty)}</span>원</td>
                                                        <td className="product-status">
                                                        {
                                                            orderStatus(item.status)
                                                        }
                                                        </td>
                                                        
                                                    </tr>
                                                ))
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <br /><br />

                        </div>
                    </div>
                </div>
            </section>
            {/*<ProductBottom/>*/}
            <Footer />
        </Fragment>
    );
}

export default MyOrder;