import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SideMenu() {

    const [menuData, setMenuData] = useState([]);
    const [isRole, setIsRole] = useState(localStorage.getItem('role'));
    const [isLogin, setIsLogin] = useState(localStorage.getItem('token'));

    const onClickHandler = () => {
        localStorage.removeItem('userid');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsRole(null);
        setIsLogin(null);
        alert('로그아웃 되었습니다.');
        window.location.href="/";
    }

    const backdoorHandler = () => {
        localStorage.setItem('token',"123")
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
                                            <Link style={{ paddingLeft: "15px" }} onClick={onClickHandler}><b>로그아웃</b></Link>
                                            
                                    </Fragment>
                                )
                            }
                            <Link style={{ paddingLeft: "15px" }} onClick={backdoorHandler}><b>백도어</b></Link>
                        </ul>
                    </nav>                
                </div>
                {
                    isLogin ?
                    (
                            <div className="second-main-menu" style={{ float: "center" }}>
                                <p>{localStorage.getItem('userid')}<span style={{ color: "gray" }}> 회원님 안녕하세요.</span></p>
                                <Link to="/mypkg"> <i type="button" class="fas fa-archive fa-2x" /></Link>
                            </div>
                    )
                    :
                    <Fragment></Fragment>
                }


                {/* <div className="">
                <div className="">
                   <a href="/register"><i>회원가입</i></a>
                    <ul className="sub">
                       {
                            !isLogin ?
                                (
                                   <>
                                   <li><Link to="/login">login</Link></li>
                                   <li><Link to="/register">register</Link></li>
                                   </>
                                )
                                    :
                                (
                                    <>
                                    <li><Link onClick={onClickHandler}>logout</Link></li>
                                   {
                                        isRole === "ROLE_ADMIN" ?
                                            <li><Link to="/admin/users">admin</Link></li>
                                            :
                                            <li><Link to="/mypage">mypage</Link></li>
                                    }
                                    </>
                                )
                        }

                    </ul>
                </div>
                </div> */}
                {/* <div className="same-style mobile-off-canvas d-block d-lg-none">
                    <button className="mobile-aside-button"><i className="las la-bars"></i></button>
                </div> */}
            </div>
        </div>

    );
}