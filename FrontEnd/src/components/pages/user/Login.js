import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import LayoutOne from "./LayoutOne";
import Bread from "../../elements/ui/Bread";
import axios from 'axios';
import { useHistory } from "react-router";
import { KAKAO_AUTH_URL } from "../../oauth/KakaoOAuth";


export default function Login(props) {

    const history = useHistory();

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const userIdHandler = (e) => {
        e.preventDefault();
        setUserId(e.target.value);
    };

    const passwordHandler = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if(userId === "") {
            alert("아이디를 입력해 주세요")
            return;
        }
        if(password === "") {
            alert("비밀번호를 입력해 주세요")
            return;
        }

        let body = {
            userId: userId,
            password: password
        };

        let response =
            axios.post("/user-service/login", body)
                .then((res) => {
                    console.log(res)
                    if (res.status === 200) {

                        const { accessToken } = res.headers.token;
                        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                        
                        window.localStorage.setItem('token', res.headers.token)
                        window.localStorage.setItem('userid', res.headers.userid)
                        window.localStorage.setItem('role', res.headers.role)
                        window.location.href = "/";
                    }
                    else {
                        alert("아이디 혹은 비밀번호가 틀렸습니다");
                    }
                })
                .catch(err => {
                    alert("아이디 혹은 비밀번호가 틀렸습니다");
                })

    };

    const kakaoLoginHandler = () => {
        window.location.href = KAKAO_AUTH_URL;
    }

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
                                                <Link eventKey="login">
                                                    <h4>로그인</h4>
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="content">
                                            <div className="pane" eventKey="login">
                                                <div className="login-form-container">
                                                    <div className="login-register-form">
                                                        <form onSubmit={submitHandler}>
                                                            <input
                                                                name="userId"
                                                                placeholder="아이디를 입력하세요"
                                                                type="text"
                                                                value={userId}
                                                                onChange={userIdHandler}

                                                            />
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                placeholder="비밀번호를 입력하세요"
                                                                value={password}
                                                                onChange={passwordHandler}
                                                            />
                                                            
                                                            <div className="button-box" style={{marginBottom:"20px"}}>
                                                                <div className="login-toggle-btn">
                                                                    <Link to={process.env.PUBLIC_URL + "/find/pw"}>
                                                                        비밀번호 찾기
                                                                    </Link>
                                                                </div>
                                                                <div className="login-toggle-btn">
                                                                    <Link to={process.env.PUBLIC_URL + "/register"} >
                                                                        회원가입
                                                                    </Link>
                                                                </div>
                                                                <button type="submit">
                                                                    <span>로그인</span>
                                                                </button>
                                                            </div>
                                                            <div className="oAuth-login-box">
                                                                <Link className="kakaoLogins" onClick={kakaoLoginHandler}>
                                                                    <img alt="" width="150px" src="/assets/img/oauth/kakao_login.png"></img>
                                                                </Link>
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
