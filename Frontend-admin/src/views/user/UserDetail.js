import React, { Fragment, lazy, useEffect, useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router';

const UserDetail = (props) => {

    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false); // 수정을 위한 모달 창

    const [userDetailInfo, setUserDetailInfo] = useState([]);

    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('');


    const history = useHistory();

    useEffect(() => {

        const token = localStorage.getItem('token')

        if (props.location.state) {
            console.log(props.location.state)
            setUserDetailInfo(props.location.state);

            setName(props.location.state.name)
            setUserId(props.location.state.userId)
            setEmail(props.location.state.email)

        }



    }, [])

    const nameChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }
    const userIdChange = (e) => {
        e.preventDefault();
        setUserId(e.target.value);
    }
    const emailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const goBackHandler = (e) => {
        e.preventDefault();
        props.history.goBack();
    }

    const deleteHandler = (e) => {
        if(window.confirm('정말 삭제하시겠습니까?')) {
            alert(`${userDetailInfo.name} 고객님을 삭제합니다.`)

            const token = localStorage.getItem('token')

            const result = axios.delete(`/user-service/users/${userDetailInfo.userId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log(res);
                if(res.status === 200) {
                    alert('고객님을 정상적으로 삭제했습니다.')
                    history.push({
                        pathname: '/users/list'
                    })
                }
                else {
                    alert('오류 발생')
                }
            })
            .catch((err) => {
                console.log(err)
                alert('오류 발생')
            })
        }
        
    }

    const onModalOpen = (e) => {
        e.preventDefault(e);
        setVisible(true);
    }

    const modifyHandler = (e) => {
        e.preventDefault(e)
        
        const token = localStorage.getItem('token')

        let body = {
            userId: userId,
            name: name,
            email: email,
        }

        const result = axios.put(`/user-service/users/${userId}`,body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res)
            if(res.status === 200){
                alert('고객 정보를 수정했습니다.')
                setVisible(false)
                history.push({
                    pathname: '/users/list'
                })
            }else {
                alert('오류 발생')
            }
        })
        .catch((err) => {
            console.log(err)
            alert('오류 발생')
        })
    }

    return (
        <Fragment>
            <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>고객 정보 수정</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div className="col-xs-3">
                        <label>아이디</label>
                        <input
                            className="form-control"
                            name="userId"
                            type="text"
                            size="30"
                            value={userId}
                            readOnly
                        />
                        <label>이름</label>
                        <input
                            className="form-control"
                            name="name"
                            type="text"
                            value={name}
                            onChange={nameChange}
                        />
                        <label>이메일</label>
                        <input
                            className="form-control"
                            name="email"
                            type="text"
                            size="30"
                            value={email}
                            onChange={emailChange}
                        />
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        닫기
                    </CButton>
                    <CButton color="primary" onClick={(e) => modifyHandler(e)}>변경하기</CButton>
                </CModalFooter>
            </CModal>
            <div className="container">
                <div className="row">
                    <div className="goback col-lg-8">
                        <Link onClick={goBackHandler}><i className="fas fa-backspace fa-2x"></i></Link>
                    </div>
                    <div className="goback col-lg-2">
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={deleteHandler}>삭제</button>
                    </div>
                </div>
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
                                            {
                                                userDetailInfo.oauth === '자체 회원' ?
                                                    (
                                                        <button type="button"
                                                            style={{ float: "right" }}
                                                            className="btn btn-outline-primary btn-sm"
                                                            onClick={onModalOpen}
                                                        >수정</button>
                                                    )
                                                    :
                                                    null
                                            }
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
                                                <p>가입경로</p>
                                            </div>
                                            <div className="col-4">
                                                <p style={{ color: "grey" }}>{userDetailInfo.name}</p>
                                                <p style={{ color: "grey" }}>{userDetailInfo.userId}</p>
                                                <p style={{ color: "grey" }}>{userDetailInfo.email}</p>
                                                <p style={{ color: "grey" }}>{userDetailInfo.birth}</p>
                                                <p style={{ color: "grey" }}>{userDetailInfo.gender}</p>
                                                <p style={{ color: "grey" }}>{new Date(Date.parse(userDetailInfo.createdAt)).toLocaleString().split("오")[0]}</p>
                                                <p style={{ color: "grey" }}>{userDetailInfo.oauth}</p>
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
                                    <h5 className="card-title mt-2">구독 현황</h5>
                                </div>
                                <div className="card-body">
                                    <CTable style={{marginTop:"-21px"}}>
                                        <CTableHead>
                                            <CTableRow>
                                                <CTableHeaderCell scope="col">구독번호</CTableHeaderCell>
                                                <CTableHeaderCell scope="col">패키지번호(명)</CTableHeaderCell>
                                                <CTableHeaderCell scope="col">배송상태</CTableHeaderCell>
                                                <CTableHeaderCell scope="col">결제일</CTableHeaderCell>
                                                <CTableHeaderCell scope="col">배송예정일</CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>
                                            <CTableRow>
                                                <CTableHeaderCell scope="row">#15034</CTableHeaderCell>
                                                <CTableDataCell>101(UserPkg)</CTableDataCell>
                                                <CTableDataCell>배송 준비중</CTableDataCell>
                                                <CTableDataCell>{new Date(Date.parse(userDetailInfo.createdAt)).toLocaleString().split("오")[0]}</CTableDataCell>
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
