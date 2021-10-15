import React from 'react';

const UserTable = () => {    
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
                                        <th>사용자명</th>
                                        <th>이메일</th>
                                        <th>연락처</th>
                                        <th>구독 멤버십</th>
                                        <th>생성 날짜</th>
                                        <th>수정 날짜</th>
                                        <th>삭제</th>
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
                <h3><strong>테스트 고객</strong></h3>
                <br /><br/>
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="table-content table-responsive cart-table-content">
                            <table className="usertable">
                                <thead>
                                    <tr>
                                        <th><br/>고객 상세 정보<br/><br/></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>            <div className="button-box">
                                                                <div className="row justify-content-between">
                                                                    <div className="col-4">
                                                                        <button type="submit" >
                                                                            <span>edit</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div></th>
                                    </tr>
                                    <tr>
                                        <th>아이디</th>
                                        <td align='center'> hyewon </td>
                                    </tr>
                                    <tr>
                                        <th >이메일</th>
                                        <td align='center'> hyewon@test.com </td>
                                    </tr>
                                    <tr>
                                        <th>생년월일</th>
                                        <td align='center'> 94.11.23 </td>
                                    </tr>
                                    <tr>
                                        <th>연락처</th>
                                        <td align='center'> 010-0000-0000 </td>
                                    </tr>
                                    <tr>
                                        <th>주소</th>
                                        <td align='center'>경기도 성남시 분당구 황새울로258번길 29 티맥스소프트</td>
                                    </tr>
                                    <tr>
                                        <th>상세 주소</th>
                                        <td align='center'>1층 ~ 2층</td>
                                    </tr>
                                    <tr>
                                        <th>가입일</th>
                                        <td align='center'>21.10.15</td>
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
                            <br /><br /><br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserTable