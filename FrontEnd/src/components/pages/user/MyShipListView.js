import React from 'react';
import Button from '@mui/material/Button';

function MyShipListView(props) {
    const {shipData} = props;

    function popupWindow(url, windowName, win, w, h) {
        const y = win.top.outerHeight / 2 + win.top.screenY - ( h / 2);
        const x = win.top.outerWidth / 2 + win.top.screenX - ( w / 2);
        return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
    }

    const openShipInfoHandler = e => {
        popupWindow(`/subscription/ChangeAddressAndDueDate/${shipData.id}/${shipData.postcode}/${shipData.address}/${shipData.addressDetail}/${shipData.dueDate}`, '배송정보 변경', window, 600, 500);  

    }

    const subShipStatusText = (subShipStatus) => {
        switch (subShipStatus) {
            case "1":
                return <span>상품 준비중</span>
            case "2":
                return <span>배송중</span>
            case "3":
                return <span>배송완료</span>
            case "4":
                return <span>배송취소</span>
            case "5":
                return <span>구매확정</span>
            default:
                return <span>에러</span>
        }
    }

    return (
        <tr>
            <td className="product-orderId">{shipData.id}</td>
            <td className="product-name">
                <span>{shipData.pkgId}</span>
            </td>
            <td className="product-price-cart">
                <span className="amount">{`${shipData.address} ${shipData.addressDetail}`}</span>
            </td>
            <td className="product-quantity">
                <span className="amount">{shipData.type === '1' ? "새벽배송" : "일반배송"}</span>
            </td>
            <td className="product-quantity">
                <span className="amount">{subShipStatusText(shipData.status)}</span>
            </td>
            <td className="product-subtotal"><span>{(shipData.dueDate).split('T')[0]}</span></td>
            <td className="product-status">
                <Button 
                    sx={{width:"12rem", height:"3rem", mb:"1rem"}}
                    variant="outlined"
                    size="large"
                >
                    리뷰 작성
                </Button>
                {/* <Button 
                    sx={{width:"12rem", height:"3rem", mb:"1rem"}}
                    variant="contained"
                    size="large"
                >
                    구독패키지 변경
                </Button> */}
                <Button 
                    sx={{width:"12rem", height:"3rem"}}
                    variant="outlined"
                    size="large"
                    onClick={openShipInfoHandler}
                >
                    배송정보 변경
                </Button>
            </td>        
        </tr>
    );
}

export default MyShipListView;