import React from "react";
import { Link } from "react-router-dom";

const UserSidebar = () => {
    return (
        <div className="sidebar-style">
            <div className="sidebar-widget">


            </div>
            <div className="sidebar-widget">
                <div className="sidebar-project-wrap mt-30">
                    <div className="single-sidebar-blog">
                        <div className="sidebar-blog-content">

                            <h4>
                                <Link to={process.env.PUBLIC_URL + "/mypage"}>
                                    회원 정보 조회
                                </Link>
                            </h4>
                        </div>
                    </div>
                    <div className="single-sidebar-blog">
                        <div className="sidebar-blog-content">
                            <h4>
                                <Link to={process.env.PUBLIC_URL + "/mypage/myOrder"}>
                                    주문 정보 조회
                                </Link>
                            </h4>
                        </div>
                    </div>
                    <div className="single-sidebar-blog">
                        <div className="sidebar-blog-content">

                            <h4>
                                <Link to={process.env.PUBLIC_URL + "/mypage/myInfo"}>
                                    개인 정보 수정
                                </Link>
                            </h4>
                        </div>
                    </div>


                </div>
            </div>


        </div>
    );
};

export default UserSidebar;
