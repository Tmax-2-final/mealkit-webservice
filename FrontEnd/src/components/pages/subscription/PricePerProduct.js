import React from 'react';

function PricePerProduct({monthlyFee, weeklyDeliveryQty}) {
// 3자리마다 ,(콤마) 붙이기 (8000000 => 8,000,000)
function numberToCommasNumber(number) {
    number = Math.round(number);
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

    return (
        <>
            <td>{numberToCommasNumber(monthlyFee / (weeklyDeliveryQty * 4))} 원 / 1 개</td>
        </>
    );
}

export default PricePerProduct;