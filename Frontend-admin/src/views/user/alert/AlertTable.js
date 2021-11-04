import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React from 'react';
import { CPagination, CPaginationItem } from '@coreui/react';
import { useHistory } from 'react-router';

export default function UserTable({ alertDatas, setAlertDatas, loading }) {

    return (
        <div className="cart-main-area pt-20 pb-30">
            <div className="container">
                {/* <h3 className="cart-page-title">회원 목록</h3> */}
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="table-content">
                            <div className="card" style={{ paddingBottom: "20px" }}>
                                <CTable hover>
                                    <CTableHead>
                                        <CTableRow>
                                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">아이디</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">타입</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">이메일</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">제목</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">발송시간</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {
                                            loading === false ?
                                                (
                                                    alertDatas.map((item) => (
                                                        <CTableRow key={item.id}>
                                                            <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                                                            <CTableDataCell>{item.userId}</CTableDataCell>
                                                            <CTableDataCell>{item.type}</CTableDataCell>
                                                            <CTableDataCell>{item.email}</CTableDataCell>
                                                            <CTableDataCell>{item.title}</CTableDataCell>
                                                            <CTableDataCell>{new Date(Date.parse(item.createdAt)).toLocaleString()}</CTableDataCell>
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