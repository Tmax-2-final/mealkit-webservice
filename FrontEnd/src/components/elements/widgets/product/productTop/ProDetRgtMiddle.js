import { Fragment, useEffect } from "react";
import {useParams} from 'react-router-dom';
import AddBuyAndCart from './AddBuyAndCart';

export default function ProDetRgtMiddle({props, productData}) {
    const { id } = useParams();

    useEffect(()=>{
        
    },[productData]);
    
    return (
        <Fragment>
            {/* <ColorAndSize 
                vData = {varData.variation}
                setColor = {setColor}
                setSize = {setSize}
            /> */}
            <AddBuyAndCart 
                props = {props}
                productData = {productData}
            /> 
        </Fragment>
    
    );
}