import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Bread from '../../elements/ui/Bread';
import SubTitle from '../../elements/ui/SubTitle';
import Title from '../../elements/ui/Title';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';

function UpdateComplete(props) {
    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');
    
    return (
        <Fragment>
            <Header/>
            <Bread
                productId = ""
                productName = "정기구독 변경완료"
                productUrl = ""
            />
            <section id="subscription">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div>
                                <div class="grand-totall">
                                    <h3 className="text-center"><strong>{userId}</strong> 회원님의 </h3>
                                    <h3 className="text-center">밀키트 정기구독 변경이 완료되었습니다.</h3>
                                    <h3 className="text-center">다음 결제 이후부터 변경된 구독등급으로 적용됩니다.</h3>
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

export default UpdateComplete;