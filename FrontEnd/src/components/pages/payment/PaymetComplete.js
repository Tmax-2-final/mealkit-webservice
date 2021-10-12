import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Bread from '../../elements/ui/Bread';
import SubTitle from '../../elements/ui/SubTitle';
import Title from '../../elements/ui/Title';
import Header from '../../layout/Header';

function PaymetComplete(props) {
    const name = props.location.state.name;
    
    return (
        <Fragment>
            <Header/>
            <Bread
                productId = ""
                productName = "주문완료"
                productUrl = ""
            />
            <section id="payment">
                <div className="container">
                    <div className="row">
                        <div className="col-6 offset-md-3">
                            <div>
                                <div class="grand-totall">
                                    <h2 className="text-center">{name} 님의 주문이 완료되었습니다.</h2>
                                    <hr></hr>
                                    <Link to="/">홈으로 이동</Link>
                                    <br/>
                                    <Link to="/mypage/myOrder">주문내역으로 이동</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        </Fragment>
    );
}

export default PaymetComplete;