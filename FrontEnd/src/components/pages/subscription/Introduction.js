import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from '../../elements/ui/Bread';
import IntroductionDetail from './IntroductionDetail';

export default function Introduction(props) {
    return (
        <Fragment>
            <Header/>
            <Bread
                productId = ""
                productName = "정기구독 혜택"
                productUrl = "/subscription/grade"
            />
            <IntroductionDetail
                props = {props}
            />
            <Footer/>
        </Fragment>
    );
}