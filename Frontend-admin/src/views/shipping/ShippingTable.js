import React from 'react';

const ShippingTable = () => {
    return (
        <div className="cart-main-area pt-20 pb-30">
            <div className="container">
                {/* <h3 className="cart-page-title">회원 목록</h3> */}
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="table-content table-responsive cart-table-content">
                            <table className="usertable">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>받으실 분</th>
                                        <th>연락처</th>
                                        <th>주소</th>
                                        <th>상세 주소</th>
                                        <th>배송 유형</th>
                                        <th>수정</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        // userDatas.map(item => (
                                        //     <UserListView
                                        //         key={item.userid}
                                        //         data={item}
                                        //         setUserDatas={setUserDatas}
                                        //     />
                                        // ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="cart-shiping-update-wrapper">
                        </div>
                    </div>
                </div> */}

                {/* <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="grand-totall">
                            <div className="title-wrap">
                        
                            </div>
                            <a href="/checkout">수정하기</a>
                        </div>
                    </div>
                </div> */}
                <br />
                <br />
                <br />
                <br />


            </div>
        </div>
    );
}

export default ShippingTable