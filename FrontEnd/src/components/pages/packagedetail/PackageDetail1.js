import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from '../../elements/ui/Bread';
import ProductTop from '../../elements/widgets/product/productTop/ProductTop'

export default function ProductDetail(props) {

    const { id } = useParams();
    const [ productData , setProductData ] = useState([]);

    useEffect(()=>{
        fetch(`/catalog-service/catalogs/${id}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setProductData(data);
            console.log("==카탈로그 데이터==");
            console.log(data);
        });
    },[id]);

    return (
        <Fragment>
            <Header/>
            <Bread
                productId = {productData.id}
                productName = {productData.name}
                productUrl = {`/productdetail/${productData.id}`}
            />
            <ProductTop 
                props = {props}
                productData = {productData}
            />
            {/*<ProductBottom/>*/}
            <Footer/>
        </Fragment>
    );
}