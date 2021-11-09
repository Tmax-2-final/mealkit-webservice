import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from "axios";

export default function PackageDetailLeft2({packageData}) {
    const [imageCurrentNo, setImageCurrentNo] = useState(0);
    const [ pkgMgtDatas, setPkgMgtDatas] = useState([]);

    console.log(packageData);

    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userid');

    const headers = {
        Authorization: `Bearer ${token}`
    }


    useEffect(()=> {
        axios.get(`/catalog-service/${userId}/pkgmgt/${packageData.patalogId}`,{
            headers: headers
        })
            .then(res => {
                setPkgMgtDatas(res.data);
                console.log(res.data);
            })
    },[packageData])

    console.log(pkgMgtDatas);


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

        return(
            <div className="col-lg-6 col-md-6">
                <div className="imageSlide">
                    <div className="navBox">
                        <span>{imageCurrentNo  + 1}</span>
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
                                        <img src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${image.catalogEntity.image1}`} alt=""/>
                                    </picture>
                                </div>
                            ))}
                        </div>

                        <div
                            className="buttonPrev"
                            onClick={() => onChangeImage(imageCurrentNo - 1)}
                        >
                            <i class="fas fa-chevron-left"></i>
                        </div>
                        <div
                            className="buttonNext"
                            onClick={() => onChangeImage(imageCurrentNo + 1)}
                        >
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </div>
                    <div className="paginationBox">
                        {pkgMgtDatas?.map((image, no) => (

                            <div
                                key={no}
                                onClick={() => {
                                    onChangeImage(no);
                                }}
                            >
                                <picture>
                                    <img src={`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${image.catalogEntity.image1}`} alt="productImg"/>
                                </picture>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
