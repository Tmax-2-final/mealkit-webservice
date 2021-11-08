import React, { Fragment, useEffect, useState } from 'react';
import Bread from '../../elements/ui/Bread';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import SideBar from '../../elements/ui/Sidebar';
import axios from 'axios';
import MyShipListView from './MyShipListView';
import MySubPkgDetailView from './MySubPkgDetailView';

function MySubPkgDetail(props) {
    const {pkgId, shipStatus} = props.location.state;
    const [patalogData, setPatalogData] = useState([]);

    useEffect(() => {
        let userId = localStorage.getItem('userid');
        let token = localStorage.getItem('token');

        if (!userId || userId === 'undefined') {
            window.location.href = "/login";
        }
        if (!token || token === 'undefined') {
            window.location.href = "/login";
        }

        const apiName = "구독패키지 조회";

        axios.get(`/catalog-service/patalogs/${pkgId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(`=== ${apiName} DATA ===`);
                console.log(res.data);
                console.log('=======================');

                setPatalogData(res.data);
            })
            .catch(error => {
                alert(`${apiName}에 실패했습니다. 관리자에게 문의바랍니다. \r\n(${error})`);
                console.log(error.response);
            })
    }, []);

    return (
        <Fragment>
            <Header />
            <Bread
                productName={`구독패키지 상세조회`}
            />
            <section id="mypage">
                    <div className="row">
                    <div className="col-2 offset-1">
                        <SideBar />
                    </div>
                        <div className="col-8 ml-40">
                            <span style={{fontSize:"30px"}}><strong>구독패키지 상세조회</strong></span>
                            <br /><br /><br />
                            {
                                patalogData.pkgMgt && patalogData.pkgMgt.map((item, index) => (
                                    <MySubPkgDetailView
                                        key={item.pkgMgtId}
                                        catalogData={item.catalogEntity}
                                        shipStatus={shipStatus}
                                    />
                                ))
                            }
                        </div>
                    </div>
            </section>
            <Footer />
            
        </Fragment>
    );              
}

export default MySubPkgDetail;