import React, { Fragment, useEffect, useState } from 'react';
import Bread from '../../elements/ui/Bread';
import Title from '../../elements/ui/Title';
import SubTitle from '../../elements/ui/SubTitle';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import SideBar from '../../elements/ui/Sidebar';
import axios from 'axios';

function MyReview(props) {

    const [data, setData] = useState([]);

 

    return (
        <Fragment>

            <Header />
            <Bread
                productId={`test`}
                productName={`주문서`}
                productUrl={`test3`}
            />
            <section id="mypage">
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <SideBar />
                        </div>
                        <div className="col-9">

                            <div className="table-content table-responsive cart-table-content">
                   
                            </div>
                        </div>
                    </div>
                </div>
                <br /><br /><br />
            </section>
            {/*<ProductBottom/>*/}
            <Footer />
        </Fragment >
    );
}

export default MyReview;