import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import LayoutOne from "./LayoutOne";
import Bread from "../../elements/ui/Bread";
import axios from 'axios';



export default function Login(props) {
    const [email, setEamil] = useState("");
    const [password, setPassword] = useState("");

    const emailHandler = (e) => {
        e.preventDefault();
        setEamil(e.target.value);
    };

    const passwordHandler = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if(email === "") {
            alert("이메일을 입력해 주세요")
            return;
        }
        if(password === "") {
            alert("비밀번호를 입력해 주세요")
            return;
        }

        let body = {
            email: email,
            password: password
        };

        let response =
            axios.post("/user-service/login", body)
                .then((res) => {
                    console.log(res)
                    if (res.status === 200) {
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
                                                    <h4>Login</h4>
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="content">
                                            <div className="pane" eventKey="login">
                                                <div className="login-form-container">
                                                    <div className="login-register-form">
                                                        <form onSubmit={submitHandler}>
                                                            <input
                                                                name="email"
                                                                placeholder="Email"
                                                                type="email"
                                                                value={email}
                                                                onChange={emailHandler}

                                                            />
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                placeholder="Password"
                                                                value={password}
                                                                onChange={passwordHandler}
                                                            />
                                                            <div className="button-box">
                                                                <div className="login-toggle-btn">
                                                                    <Link to={process.env.PUBLIC_URL + "/find/pw"}>
                                                                        Forgot Password?
                                                                    </Link>
                                                                </div>
                                                                <div className="login-toggle-btn">
                                                                    <Link to={process.env.PUBLIC_URL + "/register"} >
                                                                        Register
                                                                    </Link>
                                                                </div>
                                                                <button type="submit">
                                                                    <span>Login</span>
                                                                </button>                                                
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
