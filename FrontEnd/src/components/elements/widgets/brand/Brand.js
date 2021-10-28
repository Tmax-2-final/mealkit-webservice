import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

export default function Brand(){
  
    const [ newBrand, setNewBrand ] = useState([]);


    const brandList = newBrand.map(item => (
        <div key={item.id} className="col-12 col-md-6">
            <div className="row">
                <div className="col-12 col-sm-4 brandImg"><i className={item.img}></i></div>
                <div className="col-12 col-sm-8">
                    <p className="brandTitle">{item.name}</p>
                    <p className="brandTxt">{item.content}</p>
                </div>
            </div>
        </div>
    )).slice(0,4)

    return(
        <section id="brand">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5" style={{ padding:"20px", backgroundColor: "WhiteSmoke"}}>
                        <div className="row">
                            <div className="col-12 col-sm-4 brandImg">
                                <i className="fas fa-map"></i>
                            </div>
                            <div className="col-12 col-sm-8">
                                <p className="brandTitle">우리집도 새벽 배송이 되나요?</p>
                                <p className="brandTxt">배송이 가능한지 알려드려요.</p>
                                <br/>
                                <span className="brandTxt"><Link to=""><i className="fas fa-map-marker-alt"></i> 배송지 검색</Link></span>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-2">
                    </div>

                    <div className="col-12 col-md-5" style={{ padding: "20px", backgroundColor: "WhiteSmoke" }}>
                        <div className="row">
                            <div className="col-12 col-sm-4 brandImg">
                                <i className="fas fa-truck"></i>
                            </div>
                            <div className="col-12 col-sm-8">
                                <p className="brandTitle">00월 00일(-)에 받을 수 있어요</p>
                                <p className="brandTxt">오전7시까지 주문하시면 다음날 배송됩니다.</p>
                                <br />
                                <span className="brandTxt"><i className="far fa-clock"></i> <b>00:00:00 </b></span> 남은시간
                            </div>
                        </div>
                    </div>
                </div> 
            </div> 
        </section> 
    );
}