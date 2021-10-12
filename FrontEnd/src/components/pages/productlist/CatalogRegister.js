import CatalogRegForm from "./CatalogRegForm";
import Title from "../../elements/ui/Title";
import React, { Fragment, useState } from "react";
import SubTitle from "../../elements/ui/SubTitle";
import {Link} from "react-router-dom";
import { useHistory } from "react-router";
import axios from 'axios';

export default function CatalogRegister() {

    // const [name, setName] = useState("");
    // const [stock, setStock] = useState("");
    // const [price, setPrice] = useState("");
    // const [img, setImg] = useState("");
    //
    //
    // const nameHandler = (e) => {
    //     e.preventDefault();
    //     setName(e.target.value);
    // } 
    //
    // const stockHandler = (e) => {
    //     e.preventDefault();
    //     setStock(e.target.value);
    // }
    //
    // const priceHandler = (e) => {
    //     e.preventDefault();
    //     setPrice(e.target.value);
    // }
    //
    // const submitHandler = (e) => {
    //     e.preventDefault();
    //
    //
    //     let response =
    //         axios.post("/catalog-service/catalogs", body)
    //             .then((res) => {
    //                 console.log(res)
    //                 if(res.status == 201) {
    //                     alert("상품 등록이 완료 되었습니다.")
    //                     window.location.href = "/catalogs"
    //                 }
    //                 else {
    //                     alert("다시 입력해주세요.")
    //                 }
    //             })
    //             .catch(err => {
    //                 alert("다시 입력해주세요.");
    //             })
    // }

    return(

        <div className="myaccount-area pb-80 pt-100">
            <div className="container">
                <div className="row">
                    <div className="ml-auto mr-auto col-lg-9">
                        <div className="myaccount-wrapper">
                            <div className="accordion" id="accordionPanelsStayOpenExample">
                                <div className="accordion-item single-my-account mb-20 card">
                                    <div className="panel-heading card-header" id="panelsStayOpen-headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                            <h3 className="panel-title"><span>1 .</span> 상품 기본 정보 </h3>
                                        </button>
                                    </div>
                                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                        <CatalogRegForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}