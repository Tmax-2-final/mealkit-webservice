import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function ProductDetailLeft2({productData}) {
    const [imageCurrentNo, setImageCurrentNo] = useState(0);
    const [images, setImages] = useState([]);

    useEffect(()=>{
        fetchImageData();
    },[productData])


    const fetchImageData = () => {
        let data = new Array;
        if (productData.image1) {
            data.push(`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${productData.image1}`);
        }
        if (productData.image2) {
            data.push(`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${productData.image2}`);
        }
        if (productData.image3) {
            data.push(`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${productData.image3}`);
        }
        if (productData.image4) {
            data.push(`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${productData.image4}`);
        }

        setImages(data);
    }

    // const images = [
    //     productData.image1 ? (`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${productData.image1}`) : ,
    //     productData.image2 ? (`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${productData.image2}`) : '',
    //     productData.image3 ? (`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${productData.image3}`) : '',
    //     productData.image4 ? (`https://tmax-2.s3.ap-northeast-2.amazonaws.com/${productData.image4}`) : '',
    //             ];

    const onChangeImage = (index) => {
        if (images.length <= index) index = 0;
        if (index < 0) index = images.length - 1;
    
        setImageCurrentNo(index);
    }

    return(
        <div className="col-lg-6 col-md-6">
            <div className="imageSlide">
                <div className="navBox">
                <span>{imageCurrentNo  + 1}</span>
                <span>/</span>
                <span>{images && images.length}</span>
                </div>
                <div className="slideBox">
                <div
                    className="slideList"
                    style={{
                    transform: `translate3d(
                        ${imageCurrentNo * -500}px, 0px, 0px`,
                    }}
                >
                    {images?.map((image, no) => (
                    <div className="slideContent" key={no}>
                        <picture>
                            <img src={image} alt=""/>
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
                {images?.map((image, no) => (
                    <div
                    key={no}
                    onClick={() => {
                        onChangeImage(no);
                    }}
                    >
                    <picture>
                        <img src={image} alt="productImg"/>
                    </picture>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}