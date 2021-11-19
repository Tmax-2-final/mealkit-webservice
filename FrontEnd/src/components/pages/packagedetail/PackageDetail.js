import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from '../../elements/ui/Bread';
import ProductTop from '../../elements/widgets/product/productTop/ProductTop'
import PackageTop from "../../elements/widgets/package/PackageTop";
import PackageMiddle from "../../elements/widgets/package/PackageMiddle";
import PackageBottom from "../../elements/widgets/package/PackageBottom";
import PackageTop1 from "../../elements/widgets/package/PackageTop1";

export default function PackageDetail(props) {

    const { id } = useParams();
    const [ packageData , setPackageData ] = useState([]);

    useEffect(()=>{
        fetch(`/catalog-service/patalogs/${id}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setPackageData(data);
            console.log("==카탈로그 데이터==");
            console.log(data);
        });
    },[id]);

    return (
        <Fragment>
            <Header/>
            <Bread
                productId = {packageData.patalogId}
                productName = "패키지 상세 보기"
                productUrl = {`/pakagedetail/${packageData.patalogId}`}
            />
            <PackageTop1
                props = {props}
                packageData = {packageData}
            />

            {/*<ProductBottom/>*/}
            <Footer/>
        </Fragment>
    );
}