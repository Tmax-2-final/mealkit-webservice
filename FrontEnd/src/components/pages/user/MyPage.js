import React, { Fragment, useEffect, useState } from 'react';
import Bread from '../../elements/ui/Bread';
import Title from '../../elements/ui/Title';
import SubTitle from '../../elements/ui/SubTitle';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import SideBar from '../../elements/ui/Sidebar';
import axios from 'axios';

function MyPage(props) {

    const [data, setData] = useState([]);

    // useEffect(() => {

    //     let userId = localStorage.getItem('userid');
    //     let token = localStorage.getItem('token');

    //     if(!userId || userId === 'undefined') {
    //         window.location.href="/login";
    //     }
    //     if(!token || token === 'undefined') {
    //         window.location.href="/login";
    //     }

    //     axios.get(`/user-service/users/${userId}`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //         .then(response => {
    //             console.log(response);
    //             setData(response.data);
    //         })
    // }, []);

    return (
        <Fragment>

            <Header />
            <Bread
                productId={`test`}
                productName={``}
                productUrl={`test3`}
            />
            <section id="mypage">
                <div className="">
                    <div className="row">
                        <div className="col-2 offset-1">
         
                            <SideBar />
                            
                        </div>
                        <div className="col-8 offset-1">
                            {/* <Title title="My Account" />

                            <SubTitle title="회원 정보" />
                            <hr></hr>
                            <div className="product-details-content">
                                <div class="pro-details-meta">

                                    <span>이름 :</span>
                                    <ul>
                                        <li>{data.name}</li>
                                        <br /><br />
                                    </ul>
                                </div>
                                <div class="pro-details-meta">
                                    <span>이메일 :</span>
                                    <ul>
                                        <li>{data.email}</li>
                                        <br /><br />

                                    </ul>
                                </div> */}

                            <div className="table-content table-responsive cart-table-content" style={{ borderRadius: "30px"}}>
                                <table className="usertable">

                                    <thead>
                                        <tr>
                                            <th><br /><strong>고객 상세 정보</strong><br /><br /></th>
                                            <th></th>
                                            <th></th>


                                            <th >            <div className="button-box">
                                                <div className="row justify-content-between">
                                                    <div className="col-4">
                                                        <button className="btn btn-outline-primary btn-sm" type="submit" >
                                                            <span>edit</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div></th>
                                        </tr>
                                        <tr>
                                            <th style={{ borderBottom: "hidden" }}><br />아이디</th>
                                            <td align='left' style={{ borderBottom: "hidden" }}><br /> hyewon </td>
                                            <th style={{ borderBottom: "hidden" }}></th>
                                            <th style={{ borderBottom: "hidden" }}></th>

                                        </tr>
                                        <tr>
                                            <th style={{ borderBottom: "hidden" }}>이메일</th>
                                            <td align='left' style={{ borderBottom: "hidden" }}> hyewon@test.com </td>
                                            <th style={{ borderBottom: "hidden" }}></th>
                                            <th style={{ borderBottom: "hidden" }}></th>

                                        </tr>
                                        <tr>
                                            <th style={{ borderBottom: "hidden" }}>생년월일</th>
                                            <td align='left' style={{ borderBottom: "hidden" }}> 94.11.23 </td>
                                            <th style={{ borderBottom: "hidden" }}></th>
                                            <th style={{ borderBottom: "hidden" }}></th>

                                        </tr>
                                        <tr>
                                            <th style={{ borderBottom: "hidden" }}>연락처</th>
                                            <td align='left' style={{ borderBottom: "hidden" }}> 010-0000-0000 </td>
                                            <th style={{ borderBottom: "hidden" }}></th>
                                            <th style={{ borderBottom: "hidden" }}></th>

                                        </tr>
                                        <tr>
                                            <th style={{ borderBottom: "hidden" }}>주소</th>
                                            <td align='left' style={{ borderBottom: "hidden" }}>경기도 성남시 분당구 황새울로258번길 29 티맥스소프트</td>
                                            <th style={{ borderBottom: "hidden" }}></th>
                                            <th style={{ borderBottom: "hidden" }}></th>

                                        </tr>
                                        <tr>
                                            <th style={{ borderBottom: "hidden" }}>상세 주소</th>
                                            <td align='left' style={{ borderBottom: "hidden" }}>1층 ~ 2층</td>
                                            <th style={{ borderBottom: "hidden" }}></th>
                                            <th style={{ borderBottom: "hidden" }}></th>

                                        </tr>
                                        <tr>
                                            <th>가입일<br /><br /></th>
                                            <td align='left'>21.10.15<br /><br /></td>
                                            <th></th>
                                            <th></th>
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
                                <br /><br /><br />
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

export default MyPage;