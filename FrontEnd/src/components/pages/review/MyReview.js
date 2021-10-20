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

    // useEffect(() => {

    //     let userId = localStorage.getItem('userid');
    //     let token = localStorage.getItem('token');

    //     if(!userId || userId === 'undefined') {
    //         window.location.href="/login";
    //     }
    //     if(!token || token === 'undefined') {
    //         window.location.href="/login";
    //     }

    //     axios.get(`/user-service/users/${userId}`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //         .then(response => {
    //             console.log(response);
    //             setData(response.data);
    //         })
    // }, []);

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
                                <table className="usertable">

                                    <thead>
                                        <tr>
                                            <th><strong>작성 가능한 후기  (0)</strong></th>
                                            <th><strong> 내가 작성한 후기 (0)</strong> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>

                                </table>
                                <br /><br /><br />
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