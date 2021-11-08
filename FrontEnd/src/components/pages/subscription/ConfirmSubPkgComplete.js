import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Bread from '../../elements/ui/Bread';
import SubTitle from '../../elements/ui/SubTitle';
import Title from '../../elements/ui/Title';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';

function ConfirmSubPkgComplete(props) {
    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');
    
    return (
        <Fragment>
            <Header/>
            <Bread
                productId = ""
                productName = "구독패키지 확정 및 배송 시작"
                productUrl = ""
            />
            <section id="subscription">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div>
                                <div class="grand-totall">
                                    <h3 className="text-center"><strong>{userId}</strong> 회원님의 </h3>
                                    <h3 className="text-center">구독패키지 확정 및 배송이 시작되었습니다.</h3>
                                    <h3 className="text-center">구독배송 관리 페이지에서 구독배송 정보를 변경할 수 있습니다.</h3>
                                    <hr></hr>
                                    <Link to="/">홈으로 이동</Link>
                                    <br/>
                                    <Link to="/mypage/myship">구독배송 관리로 이동</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
}

export default ConfirmSubPkgComplete;