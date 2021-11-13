import React, { Fragment, useEffect, useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router';
import { ClipLoader } from "react-spinners";
import { CPagination, CPaginationItem } from '@coreui/react';

const UserDetail = (props) => {

    const [loading, setLoading] = useState(true);
    const [shipLoading, setShipLoading] = useState(true);
    const [visible, setVisible] = useState(false); // 수정을 위한 모달 창

    const [userDetailInfo, setUserDetailInfo] = useState([]);

    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('');

    const [userSubInfo, setUserSubInfo] = useState([]); // 구독 가입 여부 객체
    const [userIsSub, setUserIsSub] = useState('N'); // 구독 가입 존재 여부
    const [userShipInfo, setUserShipInfo] = useState([]); // 구독 배송 현황 객체
    const [userIsShip, setUserIsShip] = useState('N'); // 구독 배송 존재 여부
    
    const [totalPages, setTotalPages] = useState(0);
    const [currentPages, setCurrentPages] = useState(1);

    // 한 페이지에 보여 row 수 설정
    const [pageSize, setPageSize] = useState(8);

    const history = useHistory();

    useEffect(() => {

        const token = localStorage.getItem('token')
        const headers = {
            Authorization: `Bearer ${token}`
        }

        if (props.location.state) {
            console.log(props.location.state)
            setUserDetailInfo(props.location.state);

            setName(props.location.state.name)
            setUserId(props.location.state.userId)
            setEmail(props.location.state.email)
        } else {
            history.push({
                pathname: '/users/list'
            })
            return;
        }

        // 구독 내역 불러오기
        let result1 = axios.get(`/subscription-service/subscription/${props.location.state.userId}`, { headers: headers })
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    setUserSubInfo(res.data)
                    if(res.data.status === "1" || res.data.status === "2"){
                        console.log('구독 내역이 존재합니다.')
                        setUserIsSub('Y')
                    }
                }
            })

        let result2 = axios.get(`/subscription-service/ships/${props.location.state.userId}`, { 
            headers: headers,
            params: {
                size : pageSize
            } 
        })
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    setUserShipInfo(res.data.content)
                    if(res.data.content.length !== 0) {
                        console.log('구독 배송 내역이 존재합니다.')
                        setUserIsShip('Y')
                        setTotalPages(res.data.totalPages);
                        setCurrentPages(res.data.number + 1);
                        setShipLoading(false);
                    }
                }
            })

        setLoading(false)
    }, [])

    // 3자리마다 ,(콤마) 붙이기 (8000000 => 8,000,000)
    function numberToCommasNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

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

    const getShipStatusText = (shipStatus) => {
        switch (shipStatus) {
            case "1":
                return "상품 준비중"
            case "2":
                return "발송완료"
            case "3":
                return "배송중"
            case "4":
                return "배송취소"
            case "5":
                return "배송완료"
            default:
                return "에러"
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

    const rendering = () => {
        const result = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPages) {
            result.push(
                <CPaginationItem
                active
                onClick={(e) => { pageHandler(i, e) }}
                >{i}</CPaginationItem>
            )
            }
            else {
            result.push(
                <CPaginationItem
                onClick={(e) => { pageHandler(i, e) }}
                >{i}</CPaginationItem>
            )
            }

        }
        return result;
    }

    const pageHandler = (pageNum, e) => {
        e.preventDefault();
        console.log(pageNum)
        setShipLoading(true);
        setCurrentPages(pageNum)
        let token = localStorage.getItem('token')

        // axios.get(`/subscription-service/ships/${props.location.state.userId}`, { headers: headers })
        // .then((res) => {
        //     console.log(res.data);
        //     if (res.status === 200) {
        //         setUserShipInfo(res.data.content)
        //         if(res.data.content.length !== 0) {
        //             console.log('구독 배송 내역이 존재합니다.')
        //             setUserIsShip('Y')
        //         }
        //     }
        // })

        const reuslt = axios.get(`/subscription-service/ships/${props.location.state.userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            page: pageNum,
            size: pageSize,
        }
        })
        .then((res) => {
        console.log(res.data)
        if(res.status === 200) {
            setUserShipInfo(res.data.content);
            setTotalPages(res.data.totalPages);
            setCurrentPages(res.data.number + 1);
            setShipLoading(false);
        }
        })
        .catch((err) => {
        console.log(err)
        })
    }

    return (
        <Fragment>
            {
                loading ?
                    (
                        <div className="kako-login-loading-box" style={{ textAlign: "center", paddingTop: "250px" }} >
                            <ClipLoader
                                color="gray"
                                loading={loading}
                                size="50px" />
                        </div >
                    )
                    :
                    (
                        <div>
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
                                            가입일: <span style={{ color: "black" }}>{new Date(Date.parse(userDetailInfo.createdAt)).toLocaleString().split("오")[0]}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="user-detail-body">
                                    <div className="row">
                                        <div className="col-lg-9 col-md-9 mb-5">
                                            <div className="card">
                                                <div className="card-header" style={{ backgroundColor: "white" }}>
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
                                                                <p>현재 구독가입 여부</p>
                                                                <p>현재 구독 등급</p>
                                                                <p>예정 구독 등급</p>
                                                                <p>현재 구독 금액</p>
                                                            </div>
                                                            <div className="col-4">
                                                                {
                                                                    userIsSub === 'N' ?
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
                                                                                        <p style={{ color: "grey" }}>Y</p>
                                                                                        :
                                                                                        <p style={{ color: "grey" }}>N</p>
                                                                                }
                                                                                <p style={{ color: "grey" }}>{userSubInfo.subscriptionGradeDto.name}</p>
                                                                                <p style={{ color: "grey" }}>{getSubscribeStatusText(userSubInfo.changeSubGradeId)}</p>
                                                                                <p style={{ color: "grey" }}>{numberToCommasNumber(userSubInfo.subscriptionGradeDto.monthlyFee)} 원</p>
                                                                            </div>
                                                                        )
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-9 col-md-9 mb-5">
                                            <div className="card">
                                                <div className="card-header" style={{ backgroundColor: "white" }}>
                                                    <h5 className="card-title mt-2">구독 배송 현황</h5>
                                                </div>
                                                <div className="card-body">
                                                    {
                                                        shipLoading ? (
                                                            <div className="kako-login-loading-box" style={{ textAlign: "center", paddingTop: "250px", paddingBottom: "250px" }}>
                                                                <ClipLoader
                                                                color="gray"
                                                                loading={shipLoading}
                                                                size="50px" />
                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            <>
                                                            <CTable style={{ marginTop: "-21px"}}>
                                                            <CTableHead>
                                                                <CTableRow>
                                                                    <CTableHeaderCell scope="col">주문번호</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">패키지명</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">배송상태</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">결제일</CTableHeaderCell>
                                                                    <CTableHeaderCell scope="col">배송예정일</CTableHeaderCell>
                                                                </CTableRow>
                                                            </CTableHead>
                                                            <CTableBody className="text-center">
                                                                {
                                                                    userIsShip === 'N' ?
                                                                        (
                                                                            null
                                                                        )
                                                                        :
                                                                        (
                                                                        userShipInfo.map((item, index) => (
                                                                            <CTableRow key={index}>
                                                                                <CTableHeaderCell scope="row">#{item.id}</CTableHeaderCell>
                                                                                <CTableDataCell>{item.pkgId}({item.pkgName})</CTableDataCell>
                                                                                <CTableDataCell>{getShipStatusText(item.status)}</CTableDataCell>
                                                                                <CTableDataCell>{new Date(Date.parse(userDetailInfo.createdAt)).toLocaleString().split("오")[0]}</CTableDataCell>
                                                                                <CTableDataCell>{new Date(Date.parse(item.dueDate)).toLocaleString().split("오")[0]}</CTableDataCell>
                                                                            </CTableRow>
                                                                            ))
                                                                        )
                                                                }
                                                            </CTableBody>
                                                            </CTable>
                                                            <CPagination className="pb-40" aria-label="Page navigation example">
                                                                {rendering()}
                                                            </CPagination>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </Fragment>
    );
}

export default UserDetail
