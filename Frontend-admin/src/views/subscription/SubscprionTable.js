import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React from 'react';

export default function SubscprionTable({ subscriptionDatas, setSubscriptionDatas, loading, codeType }) {

    const getStatusText = (status) => {
        switch (status) {
            case '1':
                return "구독중 (패키지확정 전)"
            case '2':
                return "구독중 (패키지확정 완료)"
            case '3':
                return "구독취소"
            default:
                break;
        }
    }

    // 3자리마다 ,(콤마) 붙이기 (8000000 => 8,000,000)
    function numberToCommasNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
                                            <CTableHeaderCell scope="col">구독상태</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">구독등급</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">금액</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">시작일</CTableHeaderCell>
                                            {
                                                codeType !== '3' ?
                                                <>
                                                <CTableHeaderCell scope="col">최근결제일</CTableHeaderCell>
                                                <CTableHeaderCell scope="col">다음결제일</CTableHeaderCell>
                                                </>
                                                :
                                                <>
                                                <CTableHeaderCell scope="col">구독종료일</CTableHeaderCell>
                                                <CTableHeaderCell scope="col">구독취소사유</CTableHeaderCell>
                                                </>
                                            }   
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {
                                            loading === false ?
                                                (
                                                    subscriptionDatas.map((item) => (
                                                        <CTableRow key={item.id}>
                                                            <CTableHeaderCell scope="row">{item.subId}</CTableHeaderCell>
                                                            <CTableDataCell>{item.userId}</CTableDataCell>
                                                            <CTableDataCell>{getStatusText(item.status)}</CTableDataCell>
                                                            <CTableDataCell>{item.subscriptionGradeDto.name}</CTableDataCell>
                                                            <CTableDataCell>{numberToCommasNumber(item.subscriptionGradeDto.monthlyFee)}</CTableDataCell>
                                                            <CTableDataCell>{item.startDate.split('T')[0]}</CTableDataCell>
                                                            {
                                                                codeType !== '3' ?
                                                                <>
                                                                <CTableDataCell>{item.lastPaymentDate.split('T')[0]}</CTableDataCell>
                                                                <CTableDataCell>{item.nextPaymentDate.split('T')[0]}</CTableDataCell>
                                                                </>
                                                                :
                                                                <>
                                                                <CTableDataCell>{item.endDate.split('T')[0]}</CTableDataCell>
                                                                <CTableDataCell>{item.cancelContent}</CTableDataCell>
                                                                </>
                                                            }

                                                            
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