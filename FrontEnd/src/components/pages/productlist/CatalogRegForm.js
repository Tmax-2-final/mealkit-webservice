import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from "react-router";
import axios from 'axios';
import S3 from 'react-aws-s3';

export default function CatalogRegForm() {
    const fileInput = useRef();
    const S3_BUCKET = 'bookstore-image';
    const REGION = 'us-east-2';
    
    const ACCESS_KEY = '';
    const SECRET_ACCESS_KEY = '';
    let newFileName = '';
    const history = useHistory();

    const [values, setValues] = useState({
        name: '',
        author: '',
        publisher: '',
        stock: '',
        unitPrice: '',
        category: '',
        rating: '',
        image: newFileName,
        details: ''
    })

    const [guideTxts, setGuideTxts] = useState({
        userGuide : '최대 20자 까지 가능합니다.',
        stockGuide : '최대 100개 까지 가능합니다.',
        priceGuide : '최소 1000원 입니다.',
        authorGuide : '한글 or 영어로 작성해주세요.',
        publisherGuide : '한글로 작성해주세요.',
        categoryGuide : '자기계발서, 경제 경영, 과학, 소설, 수험서 중 하나만 작성해주세요.',
        ratingGuide : '최고 5점 최저 1점 입니다.',
        imageGuide : "'jpg/jpeg' 포맷으로만 입력해주세요"
    });

    const [error, setError] = useState({
        nameError: '',
        authorError: '',
        stockError: '',
        priceError: '',
        categoryError: '',
        publisherError: '',
        ratingError: '',
        detailsError: ''
    })

    const handleChangeForm = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handlePutUserLists = (e) => {
        e.preventDefault();

        let file = fileInput.current.files[0];
        newFileName = fileInput.current.files[0].name;
        console.log(newFileName);
        const config = {
            bucketName: S3_BUCKET,
            region: REGION,
            accessKeyId: ACCESS_KEY,
            secretAccessKey: SECRET_ACCESS_KEY
        };
        const ReactS3Client = new S3(config);
        ReactS3Client.uploadFile(file, newFileName).then(data => {
            console.log(data);
            if(data.status === 204){
                console.log("success");
                console.log("--------------");
                console.log(newFileName);
            }else{
                console.log("fail");
            }
        });

        let body = {
            name: values.name,
            author: values.author,
            publisher: values.publisher,
            stock: values.stock,
            unitPrice: values.unitPrice,
            category: values.category,
            rating: values.rating,
            image: newFileName,
            details: values.details

        }

        console.log(body);

        axios.post(`/catalog-service/catalogs`, body)
            .then(res => {
                console.log(res)
                if (res.status == 201) {
                    alert("상품 등록이 완료 되었습니다.");
                    window.location.href = "/admin/catalogs"
                } else {
                    alert("다시 입력해주세요.");
                }
            })
            .catch(err => {
                alert("다시 다시 입력해주세요.");
                console.log(body);
            });


    };

    return (

        <div className="card-body">
            <div className="myaccount-info-wrapper">
                <form onSubmit={handlePutUserLists} enctype="multipart/form-data">
                    <div className="row">

                        <div className="col-lg-12 col-md-12">
                            <div className="billing-info">
                                <label>상품 이름</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="상품 이름을 입력하세요."
                                    value={values.name}
                                    onChange={handleChangeForm}
                                    // placeholder="ID를 입력해 주세요."
                                />
                            </div>
                        </div>
                        {
                            error.nameError
                                ?
                                <div style={{
                                    color: "red",
                                    fontSize: "10px",
                                    margin: '-5px 0 10px 15px'
                                }}>{error.userIdError}</div>
                                :
                                <div style={{
                                    color: "gray",
                                    fontSize: "10px",
                                    margin: '-5px 0 10px 15px'
                                }}>{guideTxts.userGuide}</div>
                        }


                        <div className="col-lg-12 col-md-12">
                            <div className="billing-info">
                                <label>수량</label>
                                <input
                                    type="text"
                                    name="stock"
                                    placeholder="수량을 입력하세요."
                                    value={values.stock}
                                    onChange={handleChangeForm}
                                />
                            </div>
                        </div>
                        {
                            error.stockError
                                ?
                                <div style={{
                                    color: "red",
                                    fontSize: "10px",
                                    margin: '-5px 0 10px 15px'
                                }}>{error.pwdError}</div>
                                :
                                <div style={{
                                    color: "gray",
                                    fontSize: "10px",
                                    margin: '-5px 0 10px 15px'
                                }}>{guideTxts.stockGuide}</div>
                        }

                        <div className="col-lg-12 col-md-12">
                            <div className="billing-info">
                                <label>가격</label>
                                <input
                                    type="text"
                                    name="unitPrice"
                                    placeholder="가격을 입력하세요."
                                    value={values.unitPrice}
                                    onChange={handleChangeForm}
                                />
                            </div>
                        </div>

                        {
                            error.priceError
                                ?
                                <div style={{
                                    color: "red",
                                    fontSize: "10px",
                                    margin: '-5px 0 10px 15px'
                                }}>{error.confirmPwd}</div>
                                :
                                <div style={{
                                    color: "gray",
                                    fontSize: "10px",
                                    margin: '-5px 0 10px 15px'
                                }}>{guideTxts.priceGuide}</div>
                        }
                        <div className="col-lg-12 col-md-12">
                            <div className="billing-info">
                                <label>지은이</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={values.author}
                                    onChange={handleChangeForm}
                                />
                            </div>
                        </div>
                        {
                            error.authorError
                                ?
                                <div style={{
                                    color: "red",
                                    fontSize: "10px",
                                    margin: '-5px 0 10px 15px'
                                }}>{error.emailError}</div>
                                :
                                <div style={{
                                    color: "gray",
                                    fontSize: "10px",
                                    margin: '-5px 0 10px 15px'
                                }}>{guideTxts.authorGuide}</div>
                        }
                        <div className="col-lg-12 col-md-12">
                            <div className="billing-info">
                                <label>출판사</label>
                                <input
                                    type="text"
                                    name="publisher"
                                    value={values.publisher}
                                    onChange={handleChangeForm}
                                />
                            </div>
                        </div>
                        {
                            error.publisherError
                                ?
                                <div style={{
                                    color: "red",
                                    fontSize: "10px",
                                    margin: '-5px 0 10px 15px'
                                }}>{error.nameError}</div>
                                :
                                <div style={{
                                    color: "gray",
                                    fontSize: "10px",
                                    margin: '-5px 0 10px 15px'
                                }}>{guideTxts.publisherGuide}</div>
                        }
                        <div className="col-lg-12 col-md-12">
                            <div className="billing-info">
                                <label>카테고리</label>
                                <select name="category" onChange={handleChangeForm} value={values.category}>
                                    <option value="경제 경영">경제 경영</option>
                                    <option value="과학">과학</option>
                                    <option value="소설">소설</option>
                                    <option value="수험서">수험서</option>
                                </select>
                                {/* <input
                                    type="text"
                                    
                                    value={values.category}
                                    
                                /> */}
                            </div>
                        </div>
                        {
                            error.categoryError
                                ?
                                <div style={{
                                    color: "red",
                                    fontSize: "10px",
                                    margin: '-5px 0 10px 15px'
                                }}>{error.phoneError}</div>
                                :
                                <div style={{
                                    color: "gray",
                                    fontSize: "10px",
                                    margin: '-5px 0 10px 15px'
                                }}>{guideTxts.categoryGuide}</div>
                        }
                        <div className="col-lg-12 col-md-12">
                            <div className="billing-info">
                                <label>평점</label>
                                <select 
                                    name="rating"
                                    onChange={handleChangeForm}
                                    value={values.rating}>
                                    <option value="1" >1</option>
                                    <option value="2" >2</option>
                                    <option value="3" >3</option>
                                    <option value="4" >4</option>
                                    <option value="5" >5</option>
                                </select>
                                
                            </div>
                        </div>
                        {
                            error.ratingError
                                ?
                                <div style={{
                                    color: "red",
                                    fontSize: "10px",
                                    margin: '-5px 0 10px 15px'
                                }}>{error.phoneError}</div>
                                :
                                <div style={{
                                    color: "gray",
                                    fontSize: "10px",
                                    margin: '-5px 0 10px 15px'
                                }}>{guideTxts.ratingGuide}</div>
                        }
                        <div className="col-lg-12 col-md-12">
                            <div className="billing-info">
                                <label>설명</label>
                                <textarea
                                    type="text"
                                    name="details"
                                    value={values.details}
                                    onChange={handleChangeForm}
                                />
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <div className="billing-info">
                                <label>사진</label>
                                <input
                                    type="file"
                                    ref = {fileInput}
                                />
                            </div>
                        </div>
                        {
                            error.detailsError
                                ?
                                <div style={{
                                    color: "red",
                                    fontSize: "10px",
                                    margin: '-5px 0 10px 15px'
                                }}>{error.phoneError}</div>
                                :
                                <div style={{
                                    color: "gray",
                                    fontSize: "10px",
                                    margin: '-5px 0 10px 15px'
                                }}>{guideTxts.imageGuide}</div>
                        }

                    </div>
                    <div className="billing-back-btn">
                        <div className="billing-btn">
                            <button type="submit">등록</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}