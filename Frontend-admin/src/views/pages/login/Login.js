import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'

const Login = (props) => {

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isRight, setIsRight] = useState('');

  const history = useHistory();

  const idChangeHandler = (e) => {
    e.preventDefault();
    setId(e.target.value);
  }

  const passwordChangeHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  }

  const loginHandler = (e) => {
    e.preventDefault();

    if (id === "") {
      alert("아이디를 입력해 주세요")
      return;
    }
    if (password === "") {
      alert("비밀번호를 입력해 주세요")
      return;
    }

    let body ={
      userId: id,
      password: password
    }

    let response =
      axios.post("/user-service/admin/login", body)
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            window.localStorage.setItem('isLoggedIn', 'true')
            window.localStorage.setItem('token', res.headers.token)
            window.location.href = "/";
          }
          else {
            alert("아이디 혹은 비밀번호가 틀렸습니다");
          }
        })
        .catch(err => {
          alert("아이디 혹은 비밀번호가 틀렸습니다");
        })

  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <div className="service-logo" style={{ textAlign: "center" , marginBottom: "50px"}}>
              <h1>Mail Kit</h1>
            </div>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <div className="login-title" style={{ textAlign: "center", marginBottom: "20px" }}>
                      <h1>로그인</h1>
                      <p style={{color:'red'}}>{isRight}</p>
                    </div>
                    <CInputGroup className="mb-4 row">
                      <CFormLabel>아이디</CFormLabel>
                      <CFormInput 
                      placeholder="" 
                      autoComplete="username" 
                      onChange={idChangeHandler}
                      value={id}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4 row">
                      <CFormLabel>비밀번호</CFormLabel>
                      <CFormInput
                        type="password"
                        placeholder=""
                        autoComplete="current-password"
                        onChange={passwordChangeHandler}
                        value={password}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit" className="px-6" onClick={loginHandler}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          비밀번호 임시 코드 요청
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
