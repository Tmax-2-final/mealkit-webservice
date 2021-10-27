import React from 'react';

function WeeklyDeliveryQtyView({weeklyDeliveryQty}) {
    return (
        <>
            <td>매주 {weeklyDeliveryQty}개 상품 배송 (총 {weeklyDeliveryQty * 4}개 상품)</td>
        </>
    );
}

export default WeeklyDeliveryQtyView;