import {useEffect, useState} from 'react';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ReviewTable from "../../../pages/review/ReviewTable";
import axios from "axios";


export default function PackageDetailBottom({packageData}) {
    const [value, setValue] = useState('1');

    const [reviewCnt, setReviewCnt] = useState('1324')
    const [reviewDatas, setReviewDatas] = useState([]);
    const [imageCurrentNo, setImageCurrentNo] = useState(0);
    const [ pkgMgtDatas, setPkgMgtDatas] = useState();

    const images = [
        `https://tmax-2.s3.ap-northeast-2.amazonaws.com/product-1-img1.jpg`,
        "https://tmax-2.s3.ap-northeast-2.amazonaws.com/product-1-img2.jpg",
        "https://tmax-2.s3.ap-northeast-2.amazonaws.com/product-1-img3.jpg",
        "https://tmax-2.s3.ap-northeast-2.amazonaws.com/product-1-img4.jpg",];

    const onChangeImage = (index) => {
        if (pkgMgtDatas.length <= index) index = 0;
        if (index < 0) index = pkgMgtDatas.length - 1;

        setImageCurrentNo(index);
    }

    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userid');


    useEffect(() => {
        axios.get(`/catalog-service/pkgmgt/${packageData.patalogId}`)
            .then(res => {
                setPkgMgtDatas(res.data);
                console.log(res.data);
            }, [])

        axios.get(`/review-service/reviews/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(data => {
                console.log(data);
                setReviewDatas(data.data);
            });
    }, [pkgMgtDatas]);

    
    return(
        <div className="row">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                        <span style={{color:"black"}}><strong>패키지 정보</strong></span>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        <span style={{color:"black"}}><strong>상세 설명</strong></span>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">
                        <span style={{color:"black"}}><strong>{`리뷰 ( ${reviewCnt}개 )`}</strong></span>
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="row mt-30">
                        <div className="imageSlide">
                        <div className="navBox">
                            <span>{imageCurrentNo + 1}</span>
                            <span>/</span>
                            <span>{pkgMgtDatas && pkgMgtDatas.length}</span>
                        </div>
                        <div className="slideBox">
                            <div
                                className="slideList"
                                style={{
                                    transform: `translate3d(
                        ${imageCurrentNo * -500}px, 0px, 0px`,
                                }}
                            >
                                {pkgMgtDatas?.map((image, no) => (
                                    <div className="slideContent" key={no}>
                                        <picture>
                                            <h3>{image.catalogEntity.name}</h3>
                                            <img
                                                src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${image.catalogEntity.detailImg}`}
                                                alt="" />
                                        </picture>
                                    </div>
                                ))}
                            </div>

                            <div
                                className="buttonPrev"
                                onClick={() => onChangeImage(imageCurrentNo - 1)}
                            >
                                <i className="fas fa-chevron-left"></i>
                            </div>
                            <div
                                className="buttonNext"
                                onClick={() => onChangeImage(imageCurrentNo + 1)}
                            >
                                <i className="fas fa-chevron-right"></i>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div className="row">
                        <div className="imageSlide">
                            <div className="navBox">
                                <span>{imageCurrentNo + 1}</span>
                                <span>/</span>
                                <span>{pkgMgtDatas && pkgMgtDatas.length}</span>
                            </div>
                            <div className="slideBox">
                                <div
                                    className="slideList"
                                    style={{
                                        transform: `translate3d(
                        ${imageCurrentNo * -500}px, 0px, 0px`,
                                    }}
                                >
                                    {pkgMgtDatas?.map((image, no) => (
                                        <div className="slideContent" key={no}>
                                            <picture>
                                                <h3>{image.catalogEntity.name}</h3>
                                                <img
                                                    src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${image.catalogEntity.summaryImg}`}
                                                    alt="" style={{width:"100%", maxHeight:"100%"}}/>
                                            </picture>
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className="buttonPrev"
                                    onClick={() => onChangeImage(imageCurrentNo - 1)}
                                >
                                    <i className="fas fa-chevron-left"></i>
                                </div>
                                <div
                                    className="buttonNext"
                                    onClick={() => onChangeImage(imageCurrentNo + 1)}
                                >
                                    <i className="fas fa-chevron-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <div className="row">
                        <ReviewTable
                            reviewDatas={reviewDatas}
                            setReviewDatas={setReviewDatas}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}