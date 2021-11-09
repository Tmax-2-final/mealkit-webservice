import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CFormCheck, CButton } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import ShippingList from './ShippingList';
import axios from 'axios';
export default function ShippingTable({ subscriptionDatas, setSubscriptionDatas, loading, status, typeHandler }) {

    // 체크박스 상태 관리
    const [checkedItems, setCheckedItems] = useState(new Set());
    
    // 체크박스 전체선택 상태 관리
    const [isAllChecked, setIsAllChecked] = useState(false);

    // 체크박스 선택 이벤트 핸들러
    const checkedItemHandler = (id, isChecked) => {
        if (isChecked) {
            checkedItems.add(id);
            setCheckedItems(checkedItems);
        } else if (!isChecked && checkedItems.has(id)) {
            checkedItems.delete(id);
            setCheckedItems(checkedItems);
        }

        console.log("=== 체크박스 관리 ===");
        console.log(checkedItems);
        console.log("====================");
    };

    // 체크박스 전체 선택 이벤트 핸들러
    const allCheckedHandler = (isChecked) => {
        if (isChecked) {
            setCheckedItems(new Set(subscriptionDatas.map(({ id }) => id)));
            setIsAllChecked(true);
        } else {
            checkedItems.clear();
            setCheckedItems(setCheckedItems);
            setIsAllChecked(false);
        }
    };

    const updateStatus = () => {
        if(checkedItems.size === 0){
            alert("선택한 배송이 없습니다.");
            return;
        }

        const apiName = "배송 상태 변경"

        if (window.confirm(`선택한 배송 전체를 ${updateButtonText(status)} 하시겠습니까?`)) {

            // json 오브젝트 생성
            var body = new Object();
            
            // 체크된 id 값을 넣을 jsonArray
            var jsonArray = new Array();
    
            checkedItems.forEach(function (value) {
                jsonArray.push(value);
            });
    
            // 다음 상태 처리
            let updateStatus = "";

            switch (status) {
                // 상품준비중(1) => 배송중(3)
                case '1':
                    updateStatus = '3';
                    break;
                // 배송중(3) => 배송완료(5)
                case '3':
                    updateStatus = '5';
                    break;
                default:
                    return;
            } 
    
            body.ids = jsonArray;
            body.status = updateStatus;

            const headers = {
                'content-type': 'application/x-www-form-urlencoded'
            }

            console.log(`====== ${apiName} API BODY ======`);
            console.log(body);
            console.log("==================================");

            axios.put(`/subscription-service/ships`,body,{
                //headers : headers,
            })
            .then(res => {
                if(res.status === 200){
                    console.log(`====== ${apiName} API DATA ======`);
                    console.log(res.data); 
                    console.log("==================================");

                    alert(`${updateButtonText(status)} 완료`);

                    typeHandler(status, 1, null);
                }
            })
            .catch(err => {
                console.log(err);
                alert(`${apiName} 에러 발생, 관리자에게 문의바랍니다.`);
            })
        }
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

    const updateButtonText = (status) => {
        switch (status) {
            case '1':
                return "배송 시작"
            case '3':
                return "배송완료 처리"
            default:
                break;
        }
    } 

    return (
        <div className="cart-main-area pt-20 pb-2">
            <div className="container">
                {/* <h3 className="cart-page-title">회원 목록</h3> */}
                <div className="row">
                    <div className="col-12 col-lg-4 mb-20">
                        {/* 상품준비중, 발송완료, 배송중 클릭시에만 버튼 Show */}
                        {status === '1' || status === '3' ? (<CButton color="primary" onClick={updateStatus}>{updateButtonText(status)}</CButton>) : "" }
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="table-content">
                            <div className="card" style={{ paddingBottom: "20px" }}>
                                <CTable hover>
                                    <CTableHead>
                                        <CTableRow>
                                            <CTableHeaderCell scope="col">
                                                <CFormCheck inline id="inlineCheckbox1" value="option1" label=" " checked={isAllChecked} onChange={(e) => allCheckedHandler(!isAllChecked)}/>
                                            </CTableHeaderCell>                                            
                                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">아이디</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">패키지명</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">배송지</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">배송구분</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">배송상태</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">배송시작시간</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">배송예정일</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {
                                            loading === false ?
                                                (
                                                    subscriptionDatas.map((item) => (
                                                        <ShippingList
                                                            key={item.id}
                                                            shipData={item}
                                                            checkedItemHandler={checkedItemHandler}
                                                            isAllChecked = {isAllChecked}
                                                        />
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