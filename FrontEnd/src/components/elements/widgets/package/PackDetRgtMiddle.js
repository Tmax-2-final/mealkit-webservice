import { Fragment, useEffect } from "react";
import {useParams} from 'react-router-dom';
import AddBuyAndCart from '../product/productTop/AddBuyAndCart';
import AddPackage from "./AddPackage";

export default function PackDetRgtMiddle({props, packageData}) {
    const { id } = useParams();

    useEffect(()=>{
        
    },[packageData]);
    
    return (
        <Fragment>
            {/* <ColorAndSize 
                vData = {varData.variation}
                setColor = {setColor}
                setSize = {setSize}
            /> */}
            <AddPackage
                props = {props}
                packageData = {packageData}
            /> 
        </Fragment>
    
    );
}