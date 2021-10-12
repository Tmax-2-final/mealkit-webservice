import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {

    

    const deleteHandler = (e) => {
        e.preventDefault();

        if(window.confirm("정말 탈퇴하시겠습니까?")) {
            const userId = localStorage.getItem('userid');
            const token = localStorage.getItem('token');

            axios.delete(`/user-service/${userId}/users`, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            .then((response) => {
                if(response.status === 200) {
                    console.log(response);
                    alert('정상적으로 탈퇴되었습니다. 이용해주셔서 감사합니다.');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    window.location.href="/";
                }
                else {
                    console.log(response);
                    alert('탈퇴 실패');
                }
            })
            .catch((err) => {
                console.log(err)
                alert('탈퇴 실패')
            })
            
        }
    }

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
                    <div className="single-sidebar-blog">
                        <div className="sidebar-blog-content">

                            <h4>
                                <Link onClick={deleteHandler}>
                                    회원 탈퇴
                                </Link>
                            </h4>
                        </div>
                    </div>


                </div>
            </div>


        </div>
    );
};

export default Sidebar;
