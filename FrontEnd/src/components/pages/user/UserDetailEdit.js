import React, { Fragment, useEffect, useState } from 'react';
import Bread from '../../elements/ui/Bread';
import Title from '../../elements/ui/Title';
import SubTitle from '../../elements/ui/SubTitle';
import { Link } from "react-router-dom";
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import SideBar from '../../elements/ui/Sidebar';
import axios from 'axios';

export default function UserDetailEdit() {

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState(0);
    const [birth, setBirth] = useState("");


    useEffect(() => {

        let userId = localStorage.getItem('userid');
        let token = localStorage.getItem('token');

        if (!userId || userId === 'undefined') {
            window.location.href = "/login";
        }
        if (!token || token === 'undefined') {
            window.location.href = "/login";
        }

        axios.get(`/user-service/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response);
                setEmail(response.data.email);
                setName(response.data.name);
                setGender(response.data.gender);
                setBirth(response.data.birth);
            })
    }, []);


    const emailHandler = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const pwdHandler = (e) => {
        e.preventDefault();
        setPwd(e.target.value);
    };

    const nameHandler = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const genderHandler = (e) => {
        e.preventDefault();
        setGender(e.target.value);
    };

    const birthHandler = (e) => {
        e.preventDefault();
        setBirth(e.target.value);
    }
    const submitHandler = (e) => {
        e.preventDefault();


        if (name === "") {
            alert("이름을 입력해주세요.");
            return;
        }
        if (pwd === "") {
            alert("비밀번호를 입력해주세요");
            return;
        }
        if (pwd.length < 8) {
            alert("비밀번호는 문자, 숫자, 특수문자를 포함해 최소 8글자 이상이어야 합니다.");
            return;
        }

        console.log(email);
        console.log(pwd);
        console.log(name);

        let userId = localStorage.getItem('userid');
        let token = localStorage.getItem('token');
        let role = localStorage.getItem('role');

        let body = {
            email: email,
            pwd: pwd,
            name: name,
            gender: gender,
            birth: birth,
            role: role
        };

        console.log(body);

        let response =
            axios.put(`/user-service/users/${userId}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
                .then((res) => {
                    console.log(res)
                    if (res.status === 200) {
                        alert("회원정보 수정이 완료되었습니다. 다시 로그인 해주세요.")
                        localStorage.removeItem('userid');
                        localStorage.removeItem('token');
                        localStorage.removeItem('role');
                        window.location.href = "/login";

                    }
                    else {
                        alert("다시 입력해주세요.");
                    }
                })
                .catch(err => {
                    alert("다시 다시 입력해주세요.");
                })

    };
    return (
        <Fragment>

            <Header />
            <Bread
                productId={`test`}
                productName={`마이페이지`}
                productUrl={`test3`}
            />
            <section id="mypage">

                <div className="row">
                    <div className="col-2 offset-1">

                        <SideBar />

                    </div>

                    <div className="col-6 offset-1">
         
                        <div className="login-register-wrapper">
                            <div className="container" defaultActiveKey="login">
                                <ul variant="pills" className="login-register-tab-list">

                                    <li>
                                        <Link eventKey="register">
                                            <h4>회원 정보 수정</h4>
                                        </Link>
                                    </li>
                                </ul>
                                <div className="content">

                                    <div className="pane" eventKey="register">
                                        <div className="login-form-container">
                                            <div className="login-register-form">
                                                <form onSubmit={submitHandler}>
                                                    
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
                                                        placeholder="Email"
                                                        type="email"
                                                        value={email}
                                                        onChange={emailHandler}
                                                        readOnly
                                                    />

                                                    <label>성별</label>
                                                    <select style={{ marginBottom: "20px", border: "1px solid LightGray" }}
                                                        name="gender"
                                                        type="radio"
                                                        value={gender}
                                                        onChange={genderHandler}
                                                    >
                                                        <option value="0">선택안함</option>
                                                        <option value="1">남자</option>
                                                        <option value="2">여자</option>
                                                    </select>
                                                    <br /><br />

                                                    <label>생년월일</label>
                                                    <input
                                                        name="birth"
                                                        placeholder="YYYYMMDD (예: 19991010)"
                                                        type="date"
                                                        value={birth}
                                                        onChange={birthHandler}
                                                    />

                                                    <label>비밀번호 </label>
                                                    <input
                                                        type="password"
                                                        name="pwd"
                                                        placeholder="비밀번호를 입력해주세요"
                                                        value={pwd}
                                                        onChange={pwdHandler}
                                                    />

                                                    <div className="button-box" style={{ float: "right" }}>
                                                        <button type="submit">
                                                            <span>수정하기</span>
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
                <br /><br /><br />
            </section>
            {/*<ProductBottom/>*/}
            <Footer />
        </Fragment >
    );
}