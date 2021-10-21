import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import LayoutOne from "./LayoutOne";
import Bread from "../../elements/ui/Bread";
import axios from "axios";



export default function Preference(props) {



    return (
        <Fragment>
            <LayoutOne headerTop="visible">
                <Bread productName="My Account" />
                <div className="login-register-area pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                                <div className="login-register-wrapper">
                                    <div className="container" defaultActiveKey="login">
                                        <ul variant="pills" className="login-register-tab-list">

                                            <li>
                                                <Link eventKey="register">
                                                    <h4>My Preference</h4>
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="content">
                                            <div className="pane" eventKey="register">
                                                <div className="login-form-container">
                                                    <div className="login-register-form">
                                                        <form>
                                                            <h4><strong>고객님의 맛 취향을 선택해 주세요.</strong></h4>
                                                            <h5>고객님의 취향에 맞는 메뉴를 추천드리기 위한 용도로 사용됩니다.</h5><br /><br />

                                                            <div>
                                                                <strong>1. 연령대를 골라주세요</strong><br /><br />
                                                                <select>
                                                                    <option value="age">10대</option>
                                                                    <option value="age">20대</option>
                                                                    <option value="age">30대</option>
                                                                    <option value="age">40대</option>
                                                                    <option value="age">50대</option>
                                                                    <option value="age">60대 이상</option>
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <br /><br /><strong>2. 성별을 골라주세요</strong><br /><br />
                                                                <input type="radio" name="teamname" value="Unlike" style={{ width: "15px", height: "15px", margin: "8px" }} /> 여성
                                                                <input type="radio" name="teamname" value="little" style={{ width: "15px", height: "15px", margin: "8px" }} /> 남성
                    
                                                            </div>
                                                            <br /><br />
                                                            <div>
                                                                <strong>3. 좋아하는 테마를 두가지 골라주세요. </strong><br /><br />
                                                                <input type="checkbox" name="teamname" value="Unlike" style={{ margin: "8px" }} /> 한식
                                                                <input type="checkbox" name="teamname" value="little" style={{ margin: "8px" }} /> 양식
                                                                <input type="checkbox" name="teamname" value="medium" style={{ margin: "8px" }} /> 중식
                                                                <input type="checkbox" name="teamname" value="like" style={{ margin: "8px" }} /> 일식
                                                                <input type="checkbox" name="teamname" value="like" style={{ margin: "8px" }} /> 동남아 음식
                                                            </div>
                                                            <br /><br />
                                                            <div>
                                                                <strong>4. 좋아하는 맛을 골라주세요. (중복 가능)</strong><br /><br />
                                                                <input type="checkbox" name="teamname" value="Unlike" style={{ margin: "8px" }} /> 짠 맛
                                                                <input type="checkbox" name="teamname" value="little" style={{ margin: "8px" }} /> 매운 맛
                                                                <input type="checkbox" name="teamname" value="medium" style={{ margin: "8px" }} /> 느끼한 맛
                                                                <input type="checkbox" name="teamname" value="like" style={{ margin: "8px" }} /> 새콤한 맛ㅊ
                                                            </div>
                                                     
                                                            <div>
                                                                <br /><br /><strong>5. 원하는 요리의 소요 시간은? </strong><br /><br />
                                                                <input type="radio" name="teamname" value="Unlike" style={{ width: "15px", height: "15px", margin: "8px" }} /> 10분 이내
                                                                <input type="radio" name="teamname" value="Cake" style={{ width: "15px", height: "15px", margin: "8px" }} /> 10 ~ 20분
                                                                <input type="radio" name="teamname" value="Macaron" style={{ width: "15px", height: "15px", margin: "8px" }} /> 20분 이상
                                                            </div>
                                                            <br /><br />
                                                            <br />
                                                            <div className="button-box">
                                                                <div class="row justify-content-between">
                                                                    <div class="col-4">
                                                                        <button type="submit" >
                                                                            <span>Submit</span>
                                                                        </button>
                                                                    </div>

                                                                    <div class="col-4">
                                                                        <button type="submit" >
                                                                            <span>Skip</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};
