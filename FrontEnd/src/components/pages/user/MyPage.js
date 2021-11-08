import React, { Fragment, useEffect, useState } from 'react';
import Bread from '../../elements/ui/Bread';
import Title from '../../elements/ui/Title';
import SubTitle from '../../elements/ui/SubTitle';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import SideBar from '../../elements/ui/Sidebar';
import axios from 'axios';



function MyPage(props) {

    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');

    const headers = {
        Authorization: `Bearer ${token}`
    }


    const [data, setData] = useState([]);
    const [userDatas, setUserDatas] = useState([]);

    useEffect(() => {

        let userId = localStorage.getItem('userid');
        let token = localStorage.getItem('token');

        if (!userId || userId === 'undefined') {
            window.location.href = "/login";
        }
        if (!token || token === 'undefined') {
            window.location.href = "/login";
        }

        axios.get(`/user-service/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response);
                setData(response.data);
                console.log(response.data);
            })
    }, []);

    const subCancelHandler = (e) => {
        if(!userId){
            alert("로그인 후 진행해주세요.");
            props.history.push({
                pathname: '/login',
                state: {
                }
            })
        }
        else {
            props.history.push({
                pathname: '/subscription/cancel',
                state: {
                }
            })
        }
    }

    const subChangeHandler = () => {
        if(!userId){
            alert("로그인 후 진행해주세요.");
            props.history.push({
                pathname: '/login',
                state: {
                }
            })
        }
        else {
            props.history.push({
                pathname: '/subscription/editgrade',
                state: {
                }
            })
        }
    }

    return (
        <Fragment>

            <Header />
            <Bread
                productId={`test`}
                productName={`마이페이지`}
                productUrl={`test3`}
            />
            <section id="mypage">

                <div className="row">
                    <div className="col-2 offset-1">

                        <SideBar />

                    </div>
                    <div className="col-8 offset-1">
                        <Title title="회원 정보 조회" />
                        
                        <br /><br />

                        {/* <SubTitle title="회원 정보" /> */}
                        <div className="col-8 ">
                            <div className="login-register-wrapper">
                                <div className="container" defaultActiveKey="login">
                                    <ul variant="pills" className="login-register-tab-list">

                                        
                                    </ul>
                                    <div className="content">

                                        <div className="pane" eventKey="register">
                                            <div className="login-form-container">
                                                <div className="login-register-form">
                                                    <div class="pro-details-meta">

                                                        <span>아이디 :</span>
                                                        <ul>
                                                            <li>{data.userId}</li>
                                                            <br /><br />
                                                        </ul>
                                                    </div>
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
                                                    </div>
                                                    <div class="pro-details-meta">
                                                        <span>성별 :</span>
                                                        <ul>
                                                            <li>{data.gender}</li>
                                                            <br /><br />

                                                        </ul>
                                                    </div>
                                                    <div class="pro-details-meta">
                                                        <span>생년월일 :</span>
                                                        <ul>
                                                            <li>{data.email}</li>
                                                            <br /><br />

                                                        </ul>
                                                    </div>
                                                    <div className="text-right">
                                                        <button className="btn btn-outline-primary btn-sm" type="submit" onClick={subChangeHandler} >
                                                            <span>구독변경</span>
                                                        </button>
                                                        <button className="btn btn-outline-primary btn-sm ml-10" type="submit" onClick={subCancelHandler}>
                                                            <span>구독취소</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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

export default MyPage;