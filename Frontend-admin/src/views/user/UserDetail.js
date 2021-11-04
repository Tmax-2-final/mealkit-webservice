import React, { Fragment, lazy, useEffect, useState } from 'react'
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
const UserDetailTable = lazy(() => import('./UserDetailTable.js'))

const UserDetail = (props) => {

    const [userDetailInfo, setUserDetailInfo] = useState([]);

    useEffect(() => {

        if (props.location.state) {
            console.log(props.location.state)
            setUserDetailInfo(props.location.state);
        }

        const token = localStorage.getItem('token')



    }, [])

    return (
        // <UserDetailTable />
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="user-detail-title" style={{ paddingBottom: "15px" }}>
                        <h2>{userDetailInfo.name}님</h2>
                        <p style={{ paddingTop: "20px", color: "grey" }}>
                            가입일: <span style={{color: "black"}}>{new Date(Date.parse(userDetailInfo.createdAt)).toLocaleString().split("오")[0]}</span>
                        </p>
                    </div>
                </div>
                <div className="user-detail-body">
                    <div className="row">
                        <div className="col-lg-9 col-md-9 mb-5">
                            <div className="card">
                                <div className="card-header" style={{backgroundColor: "white"}}>
                                    <div className="row">
                                        <div className="col-10">
                                            <h5 className="card-title mt-2">고객 상세정보</h5>
                                        </div>
                                        <div className="col-2">
                                            <button type="button" className="btn btn-outline-primary btn-sm mr-3">수정</button>
                                            <button type="button" className="btn btn-outline-primary btn-sm">삭제</button>
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
                                                <p style={{ color: "grey" }}>{userDetailInfo.name}</p>
                                                <p style={{ color: "grey" }}>{userDetailInfo.userId}</p>
                                                <p style={{ color: "grey" }}>{userDetailInfo.email}</p>
                                                <p style={{ color: "grey" }}>{userDetailInfo.birth}</p>
                                                <p style={{ color: "grey" }}>{userDetailInfo.gender}</p>
                                                <p style={{ color: "grey" }}>{new Date(Date.parse(userDetailInfo.createdAt)).toLocaleString().split("오")[0]}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9 mb-5">
                            <div className="card">
                                <div className="card-header" style={{ backgroundColor: "white" }}>
                                    <h5 className="card-title mt-2">구독 내역</h5>
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
                        <div className="col-lg-9 col-md-9 mb-5">
                            <div className="card">
                                <div className="card-header" style={{ backgroundColor: "white" }}>
                                    <h5 className="card-title mt-2">주문 현황</h5>
                                </div>
                                <div className="card-body">
                                    <CTable style={{marginTop:"-21px"}}>
                                        <CTableHead>
                                            <CTableRow>
                                                <CTableHeaderCell scope="col">주문번호</CTableHeaderCell>
                                                <CTableHeaderCell scope="col">상품명</CTableHeaderCell>
                                                <CTableHeaderCell scope="col">구독등급</CTableHeaderCell>
                                                <CTableHeaderCell scope="col">상태</CTableHeaderCell>
                                                <CTableHeaderCell scope="col">주문일</CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>
                                            <CTableRow>
                                                <CTableHeaderCell scope="row">#15034</CTableHeaderCell>
                                                <CTableDataCell>파스타</CTableDataCell>
                                                <CTableDataCell>스탠다드</CTableDataCell>
                                                <CTableDataCell>배송 준비중</CTableDataCell>
                                                <CTableDataCell>{new Date(Date.parse(userDetailInfo.createdAt)).toLocaleString().split("오")[0]}</CTableDataCell>
                                            </CTableRow>
                                        </CTableBody>
                                    </CTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default UserDetail
