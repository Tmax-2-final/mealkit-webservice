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

    const [data, setData] = useState([]);
    const [userSubInfo, setUserSubInfo] = useState([]);

    useEffect(() => {

        let userId = localStorage.getItem('userid');
        let token = localStorage.getItem('token');

        const headers = {
            Authorization: `Bearer ${token}`
        }

        if (!userId || userId === 'undefined') {
            window.location.href = "/login";
        }
        if (!token || token === 'undefined') {
            window.location.href = "/login";
        }

        axios.get(`/user-service/users/${userId}`, { headers: headers })
            .then((res) => {
                if(res.status === 200){
                    console.log(res.data);
                    setData(res.data);
                    if(res.data.subscribeYn === 1) {
                        
                    }
                }
            })
        axios.get(`/subscription-service/subscription/${userId}`, { headers: headers })
        .then((subResult) => {
            if (subResult.status === 200) {
                console.log(subResult.data)
                setUserSubInfo(subResult.data)
            }
        })
        
    }, []);

    // 3자리마다 ,(콤마) 붙이기 (8000000 => 8,000,000)
    function numberToCommasNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getUserBirthText = (birth) => {
        if(!birth || birth === "") {
            return "비공개"
        }
        else {
            return new Date(Date.parse(birth)).toLocaleString().split("오")[0]
        }
    }

    const getUserGenderText = (gender) => {
        switch(gender) {
            case 0:
                return "비공개";
            case 1:
                return "남성";
            case 2:
                return "여성";
            default:
                return "비공개";
        }
    }

    const getSubscribeStatusText = (subscribeGrade) => {
        switch (subscribeGrade) {
            case 1:
                return "베이직"
            case 2:
                return "스탠다드"
            case 3:
                return "프리미엄"
            default:
                return "-"
        }
    }

    const deleteHandler = (e) => {
        e.preventDefault();

        if (window.confirm("정말 탈퇴하시겠습니까?")) {
            const userId = localStorage.getItem('userid');
            const token = localStorage.getItem('token');

            const headers = {
                Authorization: `Bearer ${token}`
            }

            axios.delete(`/user-service/users/${userId}`, { headers: headers })
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

    const subCancelHandler = (e) => {
        {
            props.history.push({
                pathname: '/subscription/cancel',
                state: {
                }
            })
        }
    }

    const subChangeHandler = (type, e) => {
        if(type === 1) {
            props.history.push({
                pathname: '/subscription/introduce',
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
                    <div className="col-8 offset-1"> <br/><br/>
                        <div className="user-detail-title" style={{ paddingBottom: "15px" }}>
                            <h4><span style={{ color: "darkgreen" }}>{data.name}</span>님의 회원 정보 입니다.</h4>
                            <p style={{ paddingTop: "10px", color: "black" }}>
                                가입일: <span style={{ color: "grey" }}>{new Date(Date.parse(data.createdAt)).toLocaleString().split("오")[0]}</span>
                            </p>
                        </div>
                        
                        <div className="col-lg-9 col-md-9 mb-5">
                            <div className="card">
                                <div className="card-header" style={{ backgroundColor: "white" }}>
                                    <div className="row">
                                        <div className="col-8 col-lg-8 col-sm-8">
                                            <h5 className="card-title mt-2">고객 상세정보</h5>
                                        </div>
                                        <div className="col-2 col-lg-2 col-sm-2">
                                            <button type="button" className="btn btn-outline-primary btn-sm mr-2" onClick={deleteHandler}>탈퇴</button>
                                        </div>
                                        {
                                            data.oauth === "kakao" ?
                                                null
                                                :
                                                <div className="col-2 col-lg-2 col-sm-2">
                                                    <button type="button" className="btn btn-outline-dark btn-sm"><Link to='/mypage/myInfoEdit'>수정</Link></button>
                                                </div>
                                        }
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
                                                <p>가입경로</p>
                                            </div>
                                            <div className="col-4">
                                                <p style={{ color: "grey" }}>{data.name}</p>
                                                <p style={{ color: "grey" }}>{data.userId}</p>
                                                <p style={{ color: "grey" }}>{data.email}</p>
                                                <p style={{ color: "grey" }}>{getUserBirthText(data.birth)}</p>
                                                <p style={{ color: "grey" }}>{getUserGenderText(data.gender)}</p>
                                                <p style={{ color: "grey" }}>{new Date(Date.parse(data.createdAt)).toLocaleString().split("오")[0]}</p>
                                                <p style={{ color: "grey" }}>{!data.oauth ? "자체 회원" : data.oauth}</p>
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
                                            {
                                                data.subscribeYn === 0 ?
                                                    (
                                                        <button className="btn btn-outline-primary btn-sm mr-2" onClick={(e) => subChangeHandler(1, e)} ><span>구독신청</span></button>

                                                    )
                                                    :
                                                    (
                                                        <div>
                                                        <button className="btn btn-outline-primary btn-sm mr-2" onClick={(e) => subChangeHandler(2, e)} ><span>구독변경</span></button>
                                                        <button className="btn btn-outline-primary btn-sm" onClick={subCancelHandler}><span>구독취소</span></button>
                                                        </div>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="user-detail ml-3">
                                        <div className="row">
                                            <div className="col-4" >
                                                <p>현재 구독가입 여부</p>
                                                <p>현재 구독 등급</p>
                                                <p>예정 구독 등급</p>
                                                <p>현재 구독 금액</p>
                                            </div>
                                            <div className="col-4">
                                                {
                                                    data.subscribeYn === 0 ?
                                                        (
                                                            <div>
                                                                <p style={{ color: "grey" }}>N</p>
                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            <div>
                                                                {
                                                                    userSubInfo.status === "1" || userSubInfo.status === "2" ?
                                                                        <>
                                                                            <p style={{ color: "grey" }}>Y</p>
                                                                            <p style={{ color: "grey" }}>{userSubInfo.subscriptionGradeDto.name}</p>
                                                                            <p style={{ color: "grey" }}>{getSubscribeStatusText(userSubInfo.changeSubGradeId)}</p>
                                                                            <p style={{ color: "grey" }}>{numberToCommasNumber(userSubInfo.subscriptionGradeDto.monthlyFee)} 원</p>
                                                                        </>
                                                                        :
                                                                        <p style={{ color: "grey" }}>N</p>
                                                                }
                                                            </div>
                                                        )
                                                }
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