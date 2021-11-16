import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React from 'react';

export default function UserTable({ alertDatas, setAlertDatas, loading }) {

    const alertTypeText = (type) => {
        switch (type) {
            case 202:
                return '구독결제';
            case 203:
                return '구독확정';
            case 204:
                return '구독변경';
            case 205:
                return '구독취소';
            case 301:
                return '배송시작';
            case 302:
                return '배송취소';
            default:
                return '#';
        }
    }

    return (
        <div className="cart-main-area pt-20 pb-2">
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
                                                            <CTableDataCell>{alertTypeText(item.type)}</CTableDataCell>
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
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}