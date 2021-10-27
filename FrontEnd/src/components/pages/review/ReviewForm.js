import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import LayoutOne from "../../pages/user/LayoutOne";
import Bread from "../../elements/ui/Bread";


export default function ReviewForm(props) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const titleHandler = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    const contentHandler = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (title === "") {
            alert("제목을 입력해주세요")
            return;
        }
        if (content === "") {
            alert("내용을 입력해주세요")
            return;
        }

        let body = {
            title: title,
            content: content
        };
    }

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
                                                        <h4>리뷰 작성하기</h4>
                                                    </Link>
                                                </li>
                                            </ul>
                                            <div className="content">

                                                <div className="pane" eventKey="register">
                                                    <div className="login-form-container">
                                                        <div className="login-register-form">
                                                            <form onSubmit={submitHandler}>
                                                                
                                                                <label>제목</label>

                                                                <input
                                                                    name="title"
                                                                    placeholder="제목을 입력해주세요."
                                                                    type="text"
                                                                    size="60"
                                                                    value={title}
                                                                    onChange={titleHandler}
                                                                />

                                                                <label>상품은 만족하셨나요?</label>
                                                                <select
                                                                    name="rating"
                                                                //  onChange={ratingHandler}
                                                                //  value={rating} 
                                                                >
                                                                    <option value="5" >★★★★★</option>
                                                                    <option value="4" >★★★★</option>
                                                                    <option value="3" >★★★</option>
                                                                    <option value="2" >★★</option>
                                                                    <option value="1" >★</option>
                                                                    
                                                                </select>
                                                                <br />
                                                                <br />
                                                                
                                                                <label>상품평</label>
                                                                
                                                                <input
                                                                    name="content"
                                                                    placeholder="최소 10자 이상 입력해주세요."
                                                                    type="text"
                                                                    size="300"
                                                                    value={content}
                                                                    onChange={contentHandler}
                                                                    style={{ height: "100px" }}
                                                                />
                                                          
                                                               

                                                                <div className="billing-info">
                                                                    <label>이미지</label>
                                                                    <input
                                                                        type="file"
                                                                    // ref={fileInput}
                                                                    />
                                                                </div>

                                                                <div className="button-box" style={{ float: "right" }}>
                                                                    <button type="submit">
                                                                        <span>등록하기</span>
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