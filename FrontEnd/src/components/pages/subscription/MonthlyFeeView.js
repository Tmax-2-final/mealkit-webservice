import React from 'react';

function MonthlyFeeView({monthlyFee}) {
    // 3자리마다 ,(콤마) 붙이기 (8000000 => 8,000,000)
    function numberToCommasNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <>
            <td>{numberToCommasNumber(monthlyFee)} 원</td>
        </>
    );
}

export default MonthlyFeeView;