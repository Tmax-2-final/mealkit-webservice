import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import LayoutOne from "./LayoutOne";
import Bread from "../../elements/ui/Bread";
import axios from 'axios';



export default function FindPw(props) {
    const [email, setEamil] = useState("");
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");

    const emailHandler = (e) => {
        e.preventDefault();
        setEamil(e.target.value);
    };

    const nameHandler = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const userIdHandler = (e) => {
        e.preventDefault();
        setUserId(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (userId === "") {
            alert("아이디를 입력해주세요.")
            return;
        }
        if(name === "") {
            alert("이름을 입력해주세요.");
            return ;
        }
        if(email === "") {
            alert("이메일을 입력해주세요.");
            return ;
        }

        let body = {
            userId: userId,
            email: email,
            name: name
        };

        let response =
            axios.put("/user-service/find/pw", body)
                .then((res) => {
                    console.log(res)
                    if (res.status === 200) {
                        alert("비밀번호가 변경되었습니다. 임시 비밀번호는 "+res.data.password + "입니다.")
                        window.location.href = "/login";
                    }
                    else {
                        alert("없는 회원이거나 아이디, 이름 매칭이 틀렸습니다");
                    }
                })
                .catch(err => {
                    alert("없는 회원이거나 아이디, 이름 매칭이 틀렸습니다");
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
                                                    <h4>비밀번호 찾기</h4>
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="content">
                                            <div className="pane" eventKey="login">
                                                <div className="login-form-container">
                                                    <div className="login-form-title" style={{ textAlign: "center"}}>
                                                        <span style={{ color: "grey", }}>회원가입 시 작성한 정보를 입력해주세요.</span>
                                                    </div>
                                                    <div className="login-register-form">
                                                        <form onSubmit={submitHandler}>
                                                            <label>아이디</label>
                                                            <input
                                                                type="text"
                                                                name="userId"
                                                                placeholder="아이디를 입력해주세요"
                                                                value={userId}
                                                                onChange={userIdHandler}
                                                            />
                                                            <label>이름</label>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                placeholder="이름을 입력해주세요"
                                                                value={name}
                                                                onChange={nameHandler}
                                                            />
                                                            <label>이메일</label>
                                                            <input
                                                                name="email"
                                                                placeholder="이메일을 입력해주세요"
                                                                type="email"
                                                                value={email}
                                                                onChange={emailHandler}

                                                            />
                                                            
                                                            <div className="button-box" >
                                                                <button type="submit" style={{ borderRadius: "30px", float: "right"}}>
                                                                    <span>임시 비밀번호 발급</span>
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
