import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

// OAuth2RedirectHandler;
const KakaoLoginCallback = (props) => {

    const [loading, setLoading] = useState(true);

    // 인가코드
    let code = new URL(window.location.href).searchParams.get("code");
    
    useEffect(() => {
            let tokenData = axios
            .get(`/user-service/oauth/callback/kakao?code=` + code)
            .then((res) => {
                console.log(res);
                if(res.status === 200) {

                    window.localStorage.setItem('token', res.headers.token)
                    window.localStorage.setItem('userid', res.headers.userid)
                    window.localStorage.setItem('role', res.headers.role)
                    window.localStorage.setItem('oauth', res.headers.oauth)

                    setLoading(!loading);
                    
                    axios.get(`/user-service/users/preference/` + res.headers.userid)
                    // 선호도 조사가 되지 않았으면 일로
                    // props.history.push({
                    //     pathname: ,
                    //
                    // })
                    // 되어있으면 일로

                }
                else {
                    alert("소셜 로그인 실패");
                    window.location.href = "/login";
                }
            })
            .catch((err) => {
                console.log(err);
                alert("소셜 로그인 실패");
                window.location.href = "/login";
            });
    },[])

    return(
        <Fragment>
            <div className="kako-login-loading-box" style={{textAlign: "center", paddingTop:"250px"}}>
                <ClipLoader
                    color="gray"
                    loading={loading}
                    size="50" />
            </div>
        </Fragment>
    )

};

export default KakaoLoginCallback;
