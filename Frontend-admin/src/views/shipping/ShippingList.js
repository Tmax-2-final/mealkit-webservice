import React, { useEffect, useState } from 'react';
import {CTableDataCell, CTableHeaderCell, CTableRow, CFormCheck } from '@coreui/react';

function ShippingList(props) {
    const {shipData, checkedItemHandler, isAllChecked} = props;

    const [bChecked, setChecked] = useState(false);

    const checkHandler = ({ target }) => {
        setChecked(!bChecked);
        checkedItemHandler(shipData, target.checked);
    };

    const getShipTypeText = (type) => {
        switch (type) {
            case '1':
                return "새벽배송"
            case '2':
                return "일반배송"
            default:
                break;
        }
    }

    

    const allCheckHandler = () => setChecked(isAllChecked);

    useEffect(() => {
        //alert(isAllChecked);
        allCheckHandler();
    }, [isAllChecked])

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

    return (
        <CTableRow>
            <CTableHeaderCell scope="row">
                <CFormCheck inline id="inlineCheckbox1" value={shipData.id} label=" " onChange={(e) => checkHandler(e)} checked={bChecked}/>
            </CTableHeaderCell>
            <CTableHeaderCell>{shipData.id}</CTableHeaderCell>
            <CTableDataCell>{shipData.userId}</CTableDataCell>
            <CTableDataCell>{shipData.pkgName}</CTableDataCell>
            <CTableDataCell>{shipData.address + " " + shipData.addressDetail}</CTableDataCell>
            <CTableDataCell>{getShipTypeText(shipData.type)}</CTableDataCell>
            <CTableDataCell>{getShipStatusText(shipData.status)}</CTableDataCell>
            {/* <CTableDataCell>{shipData.startDate === null ? "-" : new Date(Date.parse(shipData.startDate)).toLocaleString()}</CTableDataCell> */}
            <CTableDataCell>{shipData.dueDate}</CTableDataCell>
        </CTableRow>
    );
}

export default ShippingList;