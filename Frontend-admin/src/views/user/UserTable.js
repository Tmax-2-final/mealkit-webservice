
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React from 'react';
import { CPagination, CPaginationItem } from '@coreui/react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function UserTable({ userDatas, setUserDatas, loading}){

    const history = useHistory();

    const userDetailHandler = (params, e) => {
        e.preventDefault();
        console.log(params.name);

        let birth = '';
        if(!params.birth || params.birth === "") {
            birth = '비공개'
        }else {
            birth = new Date(Date.parse(params.birth)).toLocaleString().split("오")[0]
        }
        let gender = '';
        if(!params.gender || params.gender === 0) {
            gender = '비공개'
        }else {
            if(params.gender === 1) {
                gender = '남성';
            }else{
                gender = '여성';
            }
        }
        let oauth = '';
        if(!params.oauth || params.oauth === "") {
            oauth = '자체 회원'
        } else {
            oauth = '카카오'
        }

        history.push({
            pathname: '/users/detail',
            state: {
                name: params.name,
                userId: params.userId,
                email: params.email,
                birth: birth,
                gender: gender,
                createdAt: params.createdAt,
                oauth: oauth,
            }
        })
    }

    const deleteHandler = (userId, e) => {
        e.preventDefault();
        console.log(userId);
        if (window.confirm('정말 삭제하시겠습니까?')) {
            alert(`${userId} 고객님을 삭제합니다.`)

            const token = localStorage.getItem('token')

            const result = axios.delete(`/user-service/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
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

    return (
        <div className="cart-main-area pt-20 pb-2">
            <div className="container">
                {/* <h3 className="cart-page-title">회원 목록</h3> */}
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="table-content">
                            <div className="card" style={{paddingBottom:"20px"}}>
                                <CTable hover>
                                    <CTableHead>
                                        <CTableRow>
                                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">이름</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">아이디</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">이메일</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">구독여부</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">가입일</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">탈퇴</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {
                                            loading === false ?
                                            (
                                            userDatas.map((item, index) => (
                                                <CTableRow key={index}>
                                                    {/* <input type="checkbox" style={{ width: '20px', height: '20px' }} /> */}
                                                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                                                    <CTableDataCell onClick={(e) => userDetailHandler(item, e)}>{item.name}</CTableDataCell>
                                                    <CTableDataCell onClick={(e) => userDetailHandler(item, e)}>{item.userId}</CTableDataCell>
                                                    <CTableDataCell onClick={(e) => userDetailHandler(item, e)}>{item.email}</CTableDataCell>
                                                    <CTableDataCell>
                                                    {
                                                        item.subscribeYn === 0 ?
                                                        <p>N</p>
                                                        :
                                                        <p>Y</p>
                                                    }
                                                    </CTableDataCell>
                                                    <CTableDataCell>{new Date(Date.parse(item.createdAt)).toLocaleString().split("오")[0]}</CTableDataCell>
                                                    <CTableDataCell><Link to='#' onClick={(e) => deleteHandler(item.userId, e)}><i className="far fa-trash-alt"></i></Link></CTableDataCell>
                                                </CTableRow>
                                            ))
                                            )
                                            :
                                            null
                                        }

                                    </CTableBody>
                                </CTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}