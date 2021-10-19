
import React, { Fragment, useEffect, useState } from 'react';
import Bread from '../../elements/ui/Bread';
import Title from '../../elements/ui/Title';
import SubTitle from '../../elements/ui/SubTitle';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import SideBar from '../../elements/ui/Sidebar';
import axios from 'axios';

const ShippingTable = () => {
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
                            <div className="cart-main-area pt-20 pb-30">
                                <div className="container">
                                    {/* <h3 className="cart-page-title">회원 목록</h3> */}


                                    <div className="row">


                                        <div className="col-lg-12 col-md-12">
                                            <h4>나의 배송지</h4>
                                            <button type="button" className="btn btn-secondary btn-sm" style={{ marginLeft: "5px", float: "right" }}
                                            >배송지 추가하기</button>
                                            <div className="table-content table-responsive cart-table-content">

                                                <table className="usertable">

                                                    <thead>
                                                        <tr>
                                                            <th>받으실 분</th>
                                                            <th>연락처</th>
                                                            <th>주소</th>
                                                            <th>상세 주소</th>
                                                            <th>배송 유형</th>
                                                            <th>수정</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            // userDatas.map(item => (
                                                            //     <UserListView
                                                            //         key={item.userid}
                                                            //         data={item}
                                                            //         setUserDatas={setUserDatas}
                                                            //     />
                                                            // ))
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
                                    <br />
                                    <br />
                                    <br />
                                    <br />


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br /><br /><br />
            </section>
            {/*<ProductBottom/>*/}
            <Footer />
        </Fragment >
    );
}

export default ShippingTable