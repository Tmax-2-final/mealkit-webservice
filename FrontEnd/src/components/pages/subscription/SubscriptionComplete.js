import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Bread from '../../elements/ui/Bread';
import SubTitle from '../../elements/ui/SubTitle';
import Title from '../../elements/ui/Title';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';

function SubscriptionComplete(props) {
    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');
    
    return (
        <Fragment>
            <Header/>
            <Bread
                productId = ""
                productName = "정기구독 등록완료"
                productUrl = ""
            />
            <section id="subscription">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div>
                                <div class="grand-totall">
                                    <h3 className="text-center"><strong>{userId}</strong> 회원님의 </h3>
                                    <h3 className="text-center">밀키트 정기구독이 완료되었습니다.</h3>
                                    <h3 className="text-center">정기구독 패키지를 확정해야 배송이 시작됩니다.</h3>
                                    <hr></hr>
                                    <Link to="/">홈으로 이동</Link>
                                    <br/>
                                    <Link to="/packagelist">정기구독 패키지 보러 가기</Link>
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

export default SubscriptionComplete;