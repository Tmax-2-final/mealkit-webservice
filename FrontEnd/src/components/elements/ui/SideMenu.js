import React, { useEffect, useState } from 'react';
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

    const menuList = menuData.map((item, index) => (

        <div className="same-style header-compare">
            <Link to={item.url}><i className={item.name}></i><span className="count-style">{item.count}</span></Link>
        </div>
    ))

    return (

        <div className="col-xl-4 col-lg-4 col-md-6 col-8">
            {/* <form className="pro-sidebar-search-form">
                
                <button styles="background:white;"><i type="button" className="las la-search" /></button>
            </form> */}

                <div className=" main-menu  " style={{paddingLeft:"15px", marginTop:"30px"}}>
                    <nav>
                        <ul>
                            <Link style={{paddingLeft:"15px"}} to="/subscription/introduce">구독하기</Link>
                            <Link style={{paddingLeft:"15px"}} to="/register">회원가입</Link>
                            <Link style={{paddingLeft:"15px"}} to="/login">로그인</Link>
                            <Link style={{paddingLeft:"15px"}} to="/cscenter">고객센터</Link>
                        </ul>
                    </nav>
                </div>

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
                <div className="same-style mobile-off-canvas d-block d-lg-none">
                    <button className="mobile-aside-button"><i className="las la-bars"></i></button>
                </div>
            </div>

    );
}