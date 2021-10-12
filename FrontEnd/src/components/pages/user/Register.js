import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import LayoutOne from "./LayoutOne";
import Bread from "../../elements/ui/Bread";
import axios from "axios";


export default function Register(props) {

        const [email, setEamil] = useState("");
        const [pwd, setPwd] = useState("");
        const [name, setName] = useState("");

        const emailHandler = (e) => {
            e.preventDefault();
            setEamil(e.target.value);
        };

        const pwdHandler = (e) => {
            e.preventDefault();
            setPwd(e.target.value);
        };

        const nameHandler = (e) => {
            e.preventDefault();
            setName(e.target.value);
        };

        const submitHandler = (e) => {
            e.preventDefault();

            // 회원가입 유효성 검사
            if (email === "") {
                alert("이메일을 입력해주세요")
                return;
            }
            if (pwd === "") {
                alert("비밀번호를 입력해주세요")
                return;
            }
            if (pwd.length < 8) {
                alert("비밀번호는 문자, 숫자, 특수문자를 포함해 최소 8글자 이상이어야 합니다.");
                return;
            }
            if (name === "") {
                alert("이름을 입력해주세요")
                return;
            }
            // 이메일 중복 검사 확인하기


            console.log(email);
            // console.log(pwd);
            console.log(name);


            let body = {
                email: email,
                pwd: pwd,
                name: name
            };

            let response =
                axios.post("/user-service/users", body)
                    .then((res) => {
                        console.log(res)
                        if (res.status === 201) {
                            alert("회원가입이 완료되었습니다.")
                            window.location.href = "/login";
                            
                        }
                        else {
                            alert("다시 입력해주세요.");
                        }
                    })
                    .catch(err => {
                        alert("다시 입력해주세요.");
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
                                                <Link eventKey="register">
                                                    <h4>Register</h4>
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="content">

                                            <div className="pane" eventKey="register">
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
                                                                name="pwd"
                                                                placeholder="password"
                                                                value={pwd}
                                                                onChange={pwdHandler}

                                                            />
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                placeholder="Username"
                                                                value={name}
                                                                onChange={nameHandler}
                                                            />
                                                            <div className="button-box">
                                                                <button type="submit">
                                                                    <span>Register</span>
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
