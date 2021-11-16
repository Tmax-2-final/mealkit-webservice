import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SideMenu() {

    const [menuData, setMenuData] = useState([]);
    const [isRole, setIsRole] = useState(localStorage.getItem('role'));
    const [isLogin, setIsLogin] = useState(localStorage.getItem('token'));

    const onClickHandler = (e) => {
        e.preventDefault();

        localStorage.removeItem('userid');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('oauth');
        setIsRole(null);
        setIsLogin(null);
        alert('로그아웃 되었습니다.');
        window.location.href="/";
    }

    const csCenterHandler = (e) => {
        e.preventDefault();

        localStorage.setItem('token',"root")
        localStorage.setItem('userid','root')
        window.location.href="/";
    }

    const menuList = menuData.map((item, index) => (

        <div className="same-style header-compare">
            <Link to={item.url}><i className={item.name}></i><span className="count-style">{item.count}</span></Link>
        </div>
    ))

    return (

        <div className="col-xl-4 col-lg-4 col-md-6 col-8">
            <div className="side-menu" style={{ textAlign: "right" }}>
                <div className=" main-menu  " style={{marginTop:"30px", marginBottom:"20px"}}>
                    <nav>
                        <ul>
                            <Link to="/subscription/introduce"><b>구독하기</b></Link>
                            {
                                !isLogin ?
                                (
                                    <Fragment>
                                            <Link style={{ paddingLeft: "15px" }} to="/register"><b>회원가입</b></Link>
                                            <Link style={{ paddingLeft: "15px" }} to="/login"><b>로그인</b></Link>
                                    </Fragment>
                                )
                                :
                                (
                                    <Fragment>
                                            <Link style={{ paddingLeft: "15px" }} to="/mypage"><b>마이페이지</b></Link>
                                            <Link style={{ paddingLeft: "15px" }} to="/#" onClick={onClickHandler}><b>로그아웃</b></Link>
                                            
                                    </Fragment>
                                )
                            }
                            <Link style={{ paddingLeft: "15px" }} to="/#" onClick={csCenterHandler}><b>고객센터</b></Link>
                        </ul>
                    </nav>
                    {
                        isLogin ?
                            (
                                <div className="row pt-2">
                                    <div className="col-9 col-lg-9 col-sm-9" style={{ textAlign: "right" }}>
                                        <p>{localStorage.getItem('userid')}<span style={{ color: "gray" }}> 회원님 안녕하세요.</span></p>
                                    </div>
                                    <div className="col-3 col-lg-3 col-sm-3" style={{textAlign:"left"}}>
                                        <Link to="/mypkg"> <i type="button" className="fas fa-shopping-cart fa-2x" /></Link>
                                    </div>
                                </div>
                            )
                            :
                            null
                    }
                </div>
            </div>
            
        </div>

    );
}