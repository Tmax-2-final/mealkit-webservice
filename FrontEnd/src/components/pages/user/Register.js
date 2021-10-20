import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import LayoutOne from "./LayoutOne";
import Bread from "../../elements/ui/Bread";
import axios from "axios";


export default function Register(props) {

        const [id, setId] = useState("");
        const [valiId, setValiId] = useState(0); // 0:중복검사 미진행 1:중복 아이디 존재 2:사용 가능한 아이디
        const [email, setEmail] = useState("");
        const [vailEmail, setValiEmail] = useState(0); // 0:이메일인증 미진행  1:인증코드 발송  2:본인인증 완료
        const [pwd, setPwd] = useState("");
        const [name, setName] = useState("");
        const [code, setCode] = useState("");
        const [gender, setGender] = useState(0); // 0:선택 안함     1: 남자     2: 여자
        const [birth, setBirth] = useState("");
        const [agree, setAgree] = useState(false);

        const idHandler = (e) => {
            e.preventDefault();
            setId(e.target.value);
        }

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

        const codeHandler = (e) => {
            e.preventDefault();
            setCode(e.target.value);
        }

        const genderHandler = (e) => {
            e.preventDefault();
            setGender(e.target.value);
        }

        const birthHandler = (e) => {
            e.preventDefault();
            setBirth(e.target.value);
        }

        const agreeHandler = ({target}) => {
            console.log(target.checked)
            setAgree(!agree);
            
        }

        // 아이디 중복 검사
        const idCheckHandler = (e) => {
            e.preventDefault();
            console.log(id);
            // 아이디 유효성 검사
            if(id === "" || !id || id.length < 6) {
                alert("6자 이상의 영문 혹은 영문과 숫자를 조합한 아이디를 입력해주세요.")
                return;
            }
            // 통과 시 아이디 중복 검사
            // 로직 작성
            let response = 
                axios.get("/user-service/users/id/" + id)
                    .then((res) => {
                        console.log(res)
                        if(res.status === 200) {
                            if(res.data.result === 2) {
                                alert("사용 가능한 아이디입니다.")
                                setValiId(2);
                            }
                            else {
                                alert("이미 사용중인 아이디입니다. 다른 아이디를 사용해주세요.")
                                setValiId(1);
                            }
                        }
                        else {
                            alert("서버 오류")
                        }
                    })
                    .catch((err) => {
                        alert("서버 오류")
                    })
            // 백도어 코드
            // // 만약에 같은 아이디가 있을 때
            // if(id === "backdoor"){
            //     setValiId(1);
            // }
            // // 같은 아이디가 없을 떄
            // else {
            //     setValiId(2);
            // }
        }

        // 본인 확인용 이메일 인증코드 발송
        const emailCheckHandler = (e) => {
            e.preventDefault();
            console.log(email);
            // 이메일 유효성 검사
            if(!email || email === "" || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
                alert("올바르지 않은 이메일입니다.");
                return ;
            }
            // 유효성 검사 통과
            // 로직 작성
            let response = 
                axios.get("/alert-service/users/email?email=" + email)
                    .then((res) => {
                        console.log(res)
                        if(res.status === 200) {
                            alert("이메일을 전송했습니다. 잠시 후 확인바랍니다.");
                            setValiEmail(1);
                        }
                        else {
                            alert("이메일 전송에 실패했습니다. 다시 이용바랍니다.");
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        alert("이메일 전송에 실패했습니다. 다시 이용바랍니다.");
                    })
        }


        // 인증번호 확인하기
        const codeCheckHandler = (e) => {
            e.preventDefault();
            console.log(code);
            // 코드 유효성 검사
            if(vailEmail === 0) {
                alert("인증번호가 발송되지 않았습니다.")
                return;
            }
            if(!code || code === "") {
                alert("코드 입력해주세요")
                return;
            }
            // 백도어 코드
            // // 인증번호가 맞았다면
            // if (code === "backdoor")
            //     setValiEmail(2);
            // // 인증번호가 틀렸다면
            // else {
            //     alert("인증번호가 틀렸습니다. 다시 확인해주세요")
            //     setValiEmail(1);
            // }
            // 유효성 검사 통과
            // 인증번호 확인 로직 작성
            let data = "email=" + email + "&code=" + code;
            let response = 
                axios.get("/alert-service/users/code?" + data)
                    .then((res) => {
                        console.log(res)
                        if(res.status === 200) {
                            if(res.data.result === 1) {
                                alert("인증되었습니다!");
                                setValiEmail(2);
                            }
                            else {
                                alert("인증번호가 틀렸습니다. 다시 확인해주세요")
                                setValiEmail(1);
                            }
                        }
                        else {
                            alert("인증에 실패했습니다.")
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        alert("통신 오류로 인해 인증에 실패했습니다. 나중에 다시 시도해주세요")
                    })
        }
        const submitHandler = (e) => {
            e.preventDefault();
            // 회원가입 최종 유효성 검사
            if (id === "") {
                alert("아이디를 입력해주세요")
                return;
            }
            if (valiId === 0) {
                alert("아이디 중복 확인을 진행해주세요")
                return;
            }
            if (valiId === 1) {
                alert("중복된 아이디 입니다.")
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
            if (email === "") {
                alert("이메일을 입력해주세요")
                return;
            }
            if (vailEmail === 0) {
                alert("이메일 인증을 진행해주세요.")
                return;
            }
            if (vailEmail === 1) {
                alert("이메일 인증이 완료되지 않았습니다.")
                return;
            }
            // 약관 동의 체크
            if (agree === false) {
                alert("약관 동의에 체크해주세요");
                return;
            }
            let body = {
                userId: id,
                pwd: pwd,
                name: name,
                email: email,
                gender: gender,
                birth: birth,
                agree: agree
            };

            console.log(body);

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
                                                    <h4>회원가입</h4>
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="content">

                                            <div className="pane" eventKey="register">
                                                <div className="login-form-container">
                                                    <div className="login-register-form">
                                                        <form onSubmit={submitHandler}>

                                                            <label>아이디 <span style={{color:"red"}}>*</span></label>
                                                            <div className="idCheck" style={{float:"right"}}>
                                                                <span style={{ color: "gray"}}>
                                                                {
                                                                    valiId === 0 ? "아이디 중복 확인을 진행해주세요." : 
                                                                        valiId === 1 ? "중복된 아이디입니다. 다시 입력해주세요." : 
                                                                            valiId === 2 ? "사용 가능한 아이디입니다." : "오류 발생"
                                                                }
                                                                </span>
                                                                <button type="button" className="btn btn-secondary btn-sm" style={{marginLeft: "5px"}}
                                                                        onClick={idCheckHandler}>중복 확인</button>
                                                            </div>
                                                            <input
                                                                name="id"
                                                                placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합"
                                                                type="text"
                                                                size="60"
                                                                value={id}
                                                                onChange={idHandler}
                                                            />
                                                            

                                                            <label>비밀번호 <span style={{ color: "red" }}>*</span></label>
                                                            <input
                                                                type="password"
                                                                name="pwd"
                                                                placeholder="비밀번호를 입력해주세요"
                                                                value={pwd}
                                                                onChange={pwdHandler}
                                                            />

                                                            <label>이름 <span style={{ color: "red" }}>*</span></label>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                placeholder="이름을 입력해주세요"
                                                                value={name}
                                                                onChange={nameHandler}
                                                            />

                                                            <label>이메일 <span style={{ color: "red" }}>*</span></label>
                                                            <div className="emailCheck" style={{float:"right"}}>
                                                                <span style={{ color: "gray" }}>
                                                                    {
                                                                        vailEmail === 0 ? "본인 확인을 위해 이메일 인증을 진행해주세요." :
                                                                            vailEmail === 1 ? "이메일을 발송 완료. 인증코드를 입력해주세요." :
                                                                                vailEmail === 2 ? "인증이 완료되었습니다." : "오류 발생"
                                                                    }
                                                                </span>
                                                                <button type="button" className="btn btn-secondary btn-sm" style={{ marginLeft: "5px" }}
                                                                    onClick={emailCheckHandler}>인증번호 받기</button>
                                                            </div>
                                                            <input
                                                                name="email"
                                                                placeholder="예: mailkit@kit.com"
                                                                type="email"
                                                                value={email}
                                                                onChange={emailHandler}
                                                            />
                                                            <button type="button" className="btn btn-secondary btn-sm" 
                                                                    onClick={codeCheckHandler} style={{ float: "right", marginTop: "-20px" }}>
                                                                인증번호 확인
                                                            </button>
                                                            <input
                                                                name="code"
                                                                placeholder="인증코드를 입력해주세요"
                                                                type="text"
                                                                value={code}
                                                                onChange={codeHandler}
                                                            />
                                                            

                                                            <label>성별</label>
                                                            <select style={{ marginBottom: "20px", border: "1px solid LightGray"}}
                                                                name="gender"
                                                                type="radio"
                                                                value={gender}
                                                                onChange={genderHandler}
                                                                >
                                                                <option value="0">선택안함</option>
                                                                <option value="1">남자</option>
                                                                <option value="2">여자</option>
                                                            </select>

                                                            <label>생년월일</label>
                                                            <input
                                                                name="birth"
                                                                placeholder="YYYYMMDD (예: 19991010)"
                                                                type="date"
                                                                value={birth}
                                                                onChange={birthHandler}
                                                            />

                                                            <label>이용약관동의 <span style={{ color: "red" }}>*</span></label>
                                                            <textarea readOnly>제 1 조 (목적)
                                                                주식회사 카카오(이하 ‘회사’)가 제공하는 서비스를 이용해 주셔서 감사합니다.
                                                                회사는 여러분이 다양한 인터넷과 모바일 서비스를 좀 더 편리하게 이용할 수 있도록
                                                                회사 또는 관계사의 개별 서비스에 모두 접속 가능한 통합로그인계정 체계를 만들고
                                                                그에 적용되는 '카카오계정 약관(이하 '본 약관')을 마련하였습니다.
                                                                본 약관은 여러분이 카카오계정 서비스를 이용하는 데 필요한 권리, 의무 및 책임사항, 이용조건 및 절차 등 기본적인 사항을 규정하고 있으므로 조금만 시간을 내서 주의 깊게 읽어주시기 바랍니다.
                                                            </textarea>
                                                            <div>
                                                            <input
                                                                name="agree"
                                                                type="checkbox"
                                                                checked={agree}
                                                                onChange={(e) => agreeHandler(e)}
                                                            /><span> 약관을 충분히 읽었으며 이에 동의합니다.</span>
                                                            </div>
                                                            <hr/>
                                                            
                                                            <div className="button-box" style={{float:"right"}}>
                                                                <button type="submit">
                                                                    <span>회원가입</span>
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
