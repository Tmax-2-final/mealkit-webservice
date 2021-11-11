import React, { Fragment, useEffect, useState } from 'react';
import Bread from '../../elements/ui/Bread';
import Title from '../../elements/ui/Title';
import SubTitle from '../../elements/ui/SubTitle';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import SideBar from '../../elements/ui/Sidebar';
import axios from 'axios';
import { Link } from "react-router-dom";



function MyPage(props) {

    


    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const [data, setData] = useState([]);
    const [userDatas, setUserDatas] = useState([]);

    const deleteHandler = (e) => {
        e.preventDefault();

        if (window.confirm("정말 탈퇴하시겠습니까?")) {
            const userId = localStorage.getItem('userid');
            const token = localStorage.getItem('token');

            axios.delete(`/user-service/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response);
                        alert('정상적으로 탈퇴되었습니다. 이용해주셔서 감사합니다.');
                        localStorage.removeItem('userId');
                        localStorage.removeItem('token');
                        localStorage.removeItem('role');
                        window.location.href = "/";
                    }
                    else {
                        console.log(response);
                        alert('탈퇴 실패');
                    }
                })
                .catch((err) => {
                    console.log(err)
                    alert('탈퇴 실패')
                })

        }
    }

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

                        <br /><br />
                        
                        <div className="user-detail-title" style={{ paddingBottom: "15px" }}>
                            <h4><span style={{ color: "darkgreen" }}>{data.name}</span>님의 회원 정보 입니다.</h4>
                            <p style={{ paddingTop: "20px", color: "grey" }}>
                        
                            </p>
                        </div>
                        
                        <div className="col-lg-9 col-md-9 mb-5">
                            <div className="card">
                                <div className="card-header" style={{ backgroundColor: "white" }}>
                                    <div className="row">
                                        <div className="col-9">
                                            <h5 className="card-title mt-2">고객 상세정보</h5>
                                        </div>
                                        <div className="col-3">
                                            <button type="button" className="btn btn-outline-primary btn-sm mr-3"><Link to= '/mypage/myInfoEdit'>수정</Link></button>
                                            <button type="button" className="btn btn-outline-primary btn-sm" onClick={deleteHandler}>탈퇴</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="user-detail ml-3">
                                        <div className="row">
                                            <div className="col-4" >
                                                <p>이름</p>
                                                <p>아이디</p>
                                                <p>이메일</p>
                                                <p>생년월일</p>
                                                <p>성별</p>
                                                <p>가입일</p>
                                            </div>
                                            <div className="col-4">
                                                <p style={{ color: "grey" }}>{data.name}</p>
                                                <p style={{ color: "grey" }}>{data.userId}</p>
                                                <p style={{ color: "grey" }}>{data.email}</p>
                                                <p style={{ color: "grey" }}>{new Date(Date.parse(data.birth)).toLocaleString().split("오")[0]}</p>
                                                <p style={{ color: "grey" }}>{data.gender === 1 ? "남성" : "여성"}</p>
                                                <p style={{ color: "grey" }}>{new Date(Date.parse(data.createdAt)).toLocaleString().split("오")[0]}</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9 mb-5">
                            <div className="card">
                                <div className="card-header" style={{ backgroundColor: "white" }}>
                                <div className="row">
                                    <div className="col-7">
                                        <h5 className="card-title mt-2">구독 내역</h5>
                                    </div>
                                    <div className="col-5 text-right">
                                        <button className="btn btn-outline-primary btn-sm mr-3" onClick={subChangeHandler} ><span>구독변경</span></button>
                                        <button className="btn btn-outline-primary btn-sm" onClick={subCancelHandler}><span>구독취소</span></button>
                                    </div>
                                </div>
                                </div>
                                <div className="card-body">
                                    <div className="user-detail ml-3">
                                        <div className="row">
                                            <div className="col-4" >
                                                <p>구독가입 여부</p>
                                                <p>현재 구독등급</p>
                                                <p>예정 구독등급</p>
                                                <p>구독 금액</p>
                                            </div>
                                            <div className="col-4">
                                                <p style={{ color: "grey" }}>Y</p>
                                                <p style={{ color: "grey" }}>스탠다드</p>
                                                <p style={{ color: "grey" }}>스탠다드</p>
                                                <p style={{ color: "grey" }}>84,000 원</p>
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