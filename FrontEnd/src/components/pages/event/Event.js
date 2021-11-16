import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from '../../elements/ui/Bread';

import { Fragment } from 'react';

export default function Event() {

    return(
        <Fragment>
            <Header />
            <Bread productName="Event" />
            <div className="event-main-area pt-90 pb-100">
                <div className="container">
                    <div className="event-page-title">
                        <h3>이벤트</h3>
                    </div>
                    <div className="event-tab-menu">
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button style={{fontWeight: "bold", color:"black"}} className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">진행 중인 이벤트</button>
                                <button style={{ fontWeight: "bold", color: "black" }} className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">종료된 이벤트</button>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <dic className="container">
                                    <div className="row ml-3">
                                        
                                        <div className="event-img-box pt-3 pb-3">
                                            <img src="/assets/img/banner/banner27.jpg" width="800px" height="250px" />
                                        </div>
                                        <div className="event-img-box pb-3">
                                            <img src="/assets/img/banner/banner27.jpg" width="800px" height="250px" />
                                        </div>
                                        <div className="event-img-box pb-3">
                                            <img src="/assets/img/banner/banner27.jpg" width="800px" height="250px" />
                                        </div>
                                    </div>
                                </dic>
                                
                            </div>
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <dic className="container">
                                    <div className="row ml-3">
                                        
                                        <div className="event-img-box pb-3">
                                            <img src="/assets/img/banner/banner27.jpg" width="800px" height="250px" />
                                        </div>
                                        
                                    </div>
                                </dic>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}