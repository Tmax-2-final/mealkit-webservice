import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from '../../elements/ui/Bread';
import ProductTop from '../../elements/widgets/product/productTop/ProductTop'
import PackageTop from "../../elements/widgets/package/PackageTop";

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
                patalogId = {packageData.patalogId}
                patalogName = {packageData.name}
                patalogUrl = {`/pakagedetail/${packageData.patalogId}`}
            />
            <PackageTop
                props = {props}
                packageData = {packageData}
            />
            {/*<ProductBottom/>*/}
            <Footer/>
        </Fragment>
    );
}