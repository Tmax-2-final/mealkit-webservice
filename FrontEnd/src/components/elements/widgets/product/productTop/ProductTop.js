
import { useEffect, useState } from 'react';
import ProductDetailLeft from './ProductDetailLeft';
import ProductDetailRight from './ProductDetailRight';

export default function ProductTop({props, productData}) {
    useEffect(()=>{
    },[productData])

    return (
        
        <div className="shop-area pt-100 pb-100">
            <div className="container">
                <div className="row">
                    <ProductDetailLeft 
                        productData = {productData}
                    />
                    <ProductDetailRight 
                        props = {props}
                        productData = {productData}
                    /> 
                </div>
            </div>
        </div>

    );
}