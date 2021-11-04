
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React from 'react';
import { CPagination, CPaginationItem } from '@coreui/react';
import { useHistory } from 'react-router';


export default function UserTable({ userDatas, setUserDatas, loading}){

    const history = useHistory();

    const userDetailHandler = (params, e) => {
        e.preventDefault();
        alert(params.name);
        history.push({
            pathname: '/users/detail',
            state: {
                name: params.name,
                userId: params.userId,
                email: params.email,
                birth: '1',
                gender: '1',
                createdAt: params.createdAt,
            }
        })
    }

    return (
        <div className="cart-main-area pt-20 pb-30">
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
                                                <CTableRow key={index} onClick={(e) => userDetailHandler(item, e)}>
                                                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                                    <CTableDataCell>{item.name}</CTableDataCell>
                                                    <CTableDataCell>{item.userId}</CTableDataCell>
                                                    <CTableDataCell>{item.email}</CTableDataCell>
                                                    <CTableDataCell>N</CTableDataCell>
                                                    <CTableDataCell>{new Date(Date.parse(item.createdAt)).toLocaleString().split("오")[0]}</CTableDataCell>
                                                    <CTableDataCell>12<i className="fas fa-smile"></i></CTableDataCell>
                                                </CTableRow>
                                            ))
                                            )
                                            :
                                            null
                                        }

                                    </CTableBody>
                                </CTable>
                                <CPagination aria-label="Page navigation example">
                                    <CPaginationItem aria-label="Previous" disabled>
                                        <span aria-hidden="true">&laquo;</span>
                                    </CPaginationItem>
                                    <CPaginationItem active>1</CPaginationItem>
                                    <CPaginationItem>2</CPaginationItem>
                                    <CPaginationItem>3</CPaginationItem>
                                    <CPaginationItem aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </CPaginationItem>
                                </CPagination>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}