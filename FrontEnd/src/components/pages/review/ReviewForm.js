import PropTypes from "prop-types";
import React, { Fragment, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import LayoutOne from "../user/LayoutOne";
import Bread from "../../elements/ui/Bread";
import axios from 'axios';
import S3 from 'react-aws-s3';
import Rating from '@mui/material/Rating';
    
export default function ReviewForm(props) {
    const {pkgId, productId, orderType, pkgName, productName} = props.location.state;
    console.log(pkgId, productId, orderType, pkgName, productName);
    

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);
    const [image, setImage] = useState();
    const [accessKey, setAccessKey] = useState('');
    const [secretAccessKey, setSecretAccessKey] = useState('');
    
    let userId = localStorage.getItem('userid');
    let token = localStorage.getItem('token');
    const fileInput = useRef();
    const S3_BUCKET = 'tmax-2';
    const REGION = 'ap-northeast-2';
    let newFileName = '';

    useEffect(() => {
        axios.get(`/config-service/s3-accesskey/default`)
        .then((res) => {
            console.log(res.data.propertySources[0]);
            setAccessKey(res.data.propertySources[0].source.ACCESS_KEY);
            setSecretAccessKey(res.data.propertySources[0].source.SECRET_ACCESS_KEY);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const titleHandler = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    const contentHandler = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    };

    const ratingHandler = (e) => {
        e.preventDefault();
        setRating(e.target.value);
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

        let file = fileInput.current.files[0];
        newFileName = fileInput.current.files[0].name;
        const config = {
            bucketName: S3_BUCKET,
            region: REGION,
            accessKeyId: accessKey,
            secretAccessKey: secretAccessKey
        };
        
        const ReactS3Client = new S3(config);
        ReactS3Client.uploadFile(file, newFileName).then(data => {
            console.log(data);
            if (data.status === 204) {
                console.log("success");
                console.log("--------------");
                console.log(newFileName);
            } else {
                console.log("fail");
            }
        });

        let body = {
            title: title,
            content: content,
            rating: rating,
            userId: userId,
            image: newFileName,
            pkgId: pkgId,
            productId: productId,
            orderType: orderType,
            pkgName: pkgName,
            productName: productName
        };

        console.log(body);

        let response =
            axios.post("/review-service/reviews", body)
                .then((res) => {
                    console.log(res)
                    if (res.status === 201) {
                        alert("리뷰 등록이 완료되었습니다.")
                        window.location.href = "/";

                    }
                    else {
                        alert("다시 입력해주세요.");
                    }
                })
                .catch(err => {
                    alert("다시 입력해주세요.");
                })
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

                                                            <label>{orderType === 1 ? "패키지명" : "상품명"} </label>
                                                            <input
                                                                type="text"
                                                                name="Name"
                                                                value={orderType === 1 ? pkgName : productName}
                                                                readOnly
                                                            /> 

                                                            <label>제목</label>

                                                            <input
                                                                name="title"
                                                                placeholder="제목을 입력해주세요."
                                                                type="text"
                                                                size="60"
                                                                value={title}
                                                                onChange={titleHandler}
                                                            />

                                                            <label>상품은 만족하셨나요?</label><br/>
                                                            {/* <select
                                                                name="rating"
                                                                onChange={ratingHandler}
                                                                value={rating}
                                                            >
                                                                <option value="5" >★★★★★</option>
                                                                <option value="4" >★★★★</option>
                                                                <option value="3" >★★★</option>
                                                                <option value="2" >★★</option>
                                                                <option value="1" >★</option>

                                                            </select> */}
                                                            <Rating
                                                                name="rating"
                                                                value={rating}
                                                                onChange= {
                                                                    ratingHandler
                                                                }
                                                            />
                                                            <br />
                                                            <br />

                                                            <label>상품평</label>

                                                            <textarea
                                                                name="content"
                                                                placeholder="최소 10자 이상 입력해주세요."
                                                                type="text"
                                                                size="300"
                                                                value={content}
                                                                onChange={contentHandler}
                                                                style={{ height: "100px" }}
                                                            />

                                                            <br /><br />


                                                            <div>
                                                                <div className="billing-info">
                                                                    <label>이미지</label>
                                                                    <input
                                                                        type="file"
                                                                        ref={fileInput}
                                                                    />
                                                                    <label>{image}</label>
                                                                </div>
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
