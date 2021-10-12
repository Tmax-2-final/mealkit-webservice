import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from "react-router";
import axios from 'axios';
import {Link} from "react-router-dom";
import S3 from 'react-aws-s3';

export default function CatalogRegUpdate({productId}) {

    const [name, setName] = useState();
    const [stock, setStock] = useState();
    const [publisher, setPublisher] = useState();
    const [author, setAuthor] = useState();
    const [unitPrice, setUnitPrice] = useState();
    const [category, setCategory] = useState();
    const [ rating, setRating ] = useState();
    const [ image, setImage ] = useState();
    const [ details, setDetails ] = useState();
    const [ Id, setId] = useState();

    const fileInput = useRef();
    const S3_BUCKET = 'bookstore-image';
    const REGION = 'us-east-2';
    const ACCESS_KEY = '';
    const SECRET_ACCESS_KEY = '';
    let newFileName = '';
    const history = useHistory();

    useEffect(()=>{
        axios.get(`/catalog-service/catalogs/${productId}`)
            .then(res => {
                console.log(res.data);
                setName(res.data.name);
                setAuthor(res.data.author);
                setPublisher(res.data.publisher);
                setStock(res.data.stock);
                setUnitPrice(res.data.unitPrice);
                setImage(res.data.image);
                setRating(res.data.rating);
                setDetails(res.data.default);
                setCategory(res.data.category);
                setId(res.data.productId);
                setDetails(res.data.details);


            });
    },[]);


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
        detailsError:''
      })

    const nameHandler = (e) => {

        e.preventDefault();
        setName(e.target.value);
    };

    const stockHandler = (e) => {
        e.preventDefault();
        setStock(e.target.value);
    };

    const unitPriceHandler = (e) => {
        e.preventDefault();
        setUnitPrice(e.target.value);
    };

    const authorHandler = (e) => {
        e.preventDefault();
        setAuthor(e.target.value);
    };

    const categoryHandler = (e) => {
        e.preventDefault();
        setCategory(e.target.value);
    };

    const ratingHandler = (e) => {
        e.preventDefault();
        setRating(e.target.value);
    };

    const imageHandler = (e) => {
        e.preventDefault();
        setImage(e.target.value);
    };

    const detailsHandler = (e) => {
        e.preventDefault();
        setDetails(e.target.value);
    };

    const publisherHandler = (e) => {
        e.preventDefault();
        setPublisher(e.target.value);
    };


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
                name: name,
                author: author,
                publisher: publisher,
                stock: stock,
                unitPrice: unitPrice,
                category: category,
                rating: rating,
                image: newFileName,
                details: details

            }

                axios.put(`/catalog-service/catalogs/${productId}`, body)
                    .then(res => {
                        console.log(res)
                        if(res.status == 200) {
                            alert("상품 수정이 완료 되었습니다.");
                            window.location.href = "/admin/catalogs"
                        } else {
                            alert("다시 입력해주세요.");
                        }
                    })
                    .catch(err => {
                        alert("다시 다시 입력해주세요.");
                    })


    };

    return(
        <div className="table-content table-responsive cart-table-content" style={{width: "570px", opacity: "1"}}>
            <br/>
        <tr key={productId} >
            <td className="product-thumbnail"><Link to={`/productdetail/${productId}`}><img className="img-fluid" src={`https://bookstore-image.s3.us-east-2.amazonaws.com/${image}`} alt="/" style={{width: "270px", opacity: "1"}} /></Link></td>
        </tr>
        <div className="card-body">
            <div className="myaccount-info-wrapper">
            <form  onSubmit={handlePutUserLists}>
                <div className="row">
                    
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>상품 이름</label>
                            <input 
                                type="text"
                                name="name"
                                value= {name}
                                onChange={nameHandler}

                                // placeholder="ID를 입력해 주세요."
                            />
                        </div>
                    </div>
                    {
                        error.nameError
                            ? 
                                <div style={{ color: "red", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{error.userIdError}</div>
                            :
                                <div style={{ color: "gray", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{guideTxts.userGuide}</div>
                    }

                    
                    
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>수량</label>
                            <input 
                                type="text"
                                name="stock"
                                value={stock}
                                onChange={stockHandler}
                            />
                        </div>
                    </div>
                    {
                        error.stockError
                            ? 
                                <div style={{ color: "red", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{error.pwdError}</div>
                            :
                                <div style={{ color: "gray", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{guideTxts.stockGuide}</div>
                    }

                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>가격</label>
                            <input 
                                type="text"
                                name="unitPrice"
                                value={unitPrice}
                                onChange={unitPriceHandler}
                            />
                        </div>
                    </div>

                    {
                        error.priceError
                            ? 
                                <div style={{ color: "red", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{error.confirmPwd}</div>
                            :
                                <div style={{ color: "gray", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{guideTxts.priceGuide}</div>
                    }
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>지은이</label>
                            <input 
                                type="text"
                                name="author"
                                value={author}
                                onChange={authorHandler}
                            />
                        </div>
                    </div>
                    {
                        error.authorError
                            ? 
                                <div style={{ color: "red", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{error.emailError}</div>
                            :
                                <div style={{ color: "gray", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{guideTxts.authorGuide}</div>
                    }
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>출판사</label>
                            <input 
                                type="text"
                                name="publisher"
                                value={publisher}
                                onChange={publisherHandler}
                            />
                        </div>
                    </div>
                    {
                        error.publisherError
                            ? 
                                <div style={{ color: "red", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{error.nameError}</div>
                            :
                                <div style={{ color: "gray", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{guideTxts.publisherGuide}</div>
                    }
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>카테고리</label>
                                    <select name="category" onChange={categoryHandler} value={category}>
                                        <option value="경제 경영">경제 경영</option>
                                        <option value="과학">과학</option>
                                        <option value="소설">소설</option>
                                        <option value="수험서">수험서</option>
                                    </select>
                            {/* <input 
                                type="text"
                                name="category"
                                
                                
                            /> */}
                        </div>
                    </div>
                    {
                        error.categoryError
                            ? 
                                <div style={{ color: "red", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{error.phoneError}</div>
                            :
                                <div style={{ color: "gray", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{guideTxts.categoryGuide}</div>
                    }
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>평점</label>
                                    <select
                                        name="rating"
                                        onChange={ratingHandler}
                                        value={rating} >
                                        <option value="1" >1</option>
                                        <option value="2" >2</option>
                                        <option value="3" >3</option>
                                        <option value="4" >4</option>
                                        <option value="5" >5</option>
                                    </select>
                            {/* <input
                                type="text"
                                name={"rating"}
                                
                                
                            /> */}
                        </div>
                    </div>
                    {
                        error.ratingError
                            ?
                            <div style={{ color: "red", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{error.phoneError}</div>
                            :
                            <div style={{ color: "gray", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{guideTxts.ratingGuide}</div>
                    }
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>설명</label>
                            <textarea
                                type="text"
                                name="details"
                                value={details}
                                onChange={detailsHandler}
                            />
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>사진</label>
                            <input
                                type="file"
                                ref={fileInput}
                            />
                            <label>{image}</label>
                        </div>
                    </div>
                    {
                        error.detailsError
                            ?
                            <div style={{ color: "red", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{error.phoneError}</div>
                            :
                            <div style={{ color: "gray", fontSize: "10px", margin: '-5px 0 10px 15px' }}>{guideTxts.imageGuide}</div>
                    }
                    
                </div>
                <div className="billing-back-btn">
                    <div className="billing-btn">
                        <button type="submit">수정</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
        </div>
    );

}