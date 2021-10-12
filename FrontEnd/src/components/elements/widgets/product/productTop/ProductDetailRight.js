import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import ProDetRgtTop from './ProDetRgtTop';
import ProDetRgtMiddle from './ProDetRgtMiddle';
import ProDetRgtBottom from './ProDetRgtBottom';

export default function ProductDetailRight({props, productData}) {
    useEffect(()=>{
        
    },[productData])
    
    return (
        <div className="col-lg-6 col-md-6">
            <div className="product-details-content ml-70">

                <ProDetRgtTop 
                    name = {productData.name}
                    price = {productData.unitPrice}
                    rating = {productData.rating}
                    txt = {productData.details}
                />
                <ProDetRgtMiddle 
                    props = {props}
                    productData = {productData}
                />
                {/* <ProDetRgtBottom /> */}

            </div>
        </div>
    );
}