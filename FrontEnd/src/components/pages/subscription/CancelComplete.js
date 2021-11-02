import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Bread from '../../elements/ui/Bread';
import SubTitle from '../../elements/ui/SubTitle';
import Title from '../../elements/ui/Title';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';

function CancelComplete(props) {
    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');
    
    return (
        <Fragment>
            <Header/>
            <Bread
                productId = ""
                productName = "정기구독 취소완료"
                productUrl = ""
            />
            <section id="subscription">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div>
                                <div class="grand-totall">
                                    <h3 className="text-center"><strong>{userId}</strong> 회원님의 </h3>
                                    <h3 className="text-center">밀키트 정기구독 취소가 완료되었습니다.</h3>
                                    <h3 className="text-center">지금까지 밀키트 정기구독 서비스를 이용해주셔서 감사합니다.</h3>
                                    <hr></hr>
                                    <Link to="/">홈으로 이동</Link>
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

export default CancelComplete;