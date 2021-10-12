import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <div className="sidebar-style">
            <div className="sidebar-widget">


            </div>
            <div className="sidebar-widget">
                <div className="sidebar-project-wrap mt-30">
                    <div className="single-sidebar-blog">
                        <div className="sidebar-blog-content">

                            <h4>
                                <Link to={process.env.PUBLIC_URL + "/admin/users"}>
                                    회원관리
                                </Link>
                            </h4>
                        </div>
                    </div>
                    <div className="single-sidebar-blog">
                        <div className="sidebar-blog-content">
                            <h4>
                                <Link to={process.env.PUBLIC_URL + "/admin/orders"}>
                                    주문관리
                                </Link>
                            </h4>
                        </div>
                    </div>
                    <div className="single-sidebar-blog">
                        <div className="sidebar-blog-content">

                            <h4>
                                <Link to={process.env.PUBLIC_URL + "/admin/catalogs"}>
                                    상품관리
                                </Link>
                            </h4>
                        </div>
                    </div>


                </div>
            </div>

        </div>

    );
};

export default AdminSidebar;
