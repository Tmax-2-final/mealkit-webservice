import React, { Fragment, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useHistory } from 'react-router-dom'

const Logout = (props) => {

  const [loading, setLoading] = useState(true);

  const history = useHistory();

  
  useEffect(() => {
    // 로그아웃 함수
    async function Logout() {
      window.localStorage.setItem('isLoggedIn', false)
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('role')

      alert("업무를 종료합니다!");

      setLoading(!loading);

      history.push({
        pathname: "/login"
      })
    }
    // 로그인 전 로그아웃 불가능
    const logins = localStorage.getItem('isLoggedIn');

    if (logins === 'false') {
      history.push({
        pathname: '/login'
      })
    }
    else {
      Logout();
    }
  })

  return (
    <Fragment>
      <div className="kako-login-loading-box" style={{ textAlign: "center", paddingTop: "250px" }}>
        <ClipLoader
          color="gray"
          loading={loading}
          size="50px" />
      </div>
    </Fragment>
  )
}

export default Logout
