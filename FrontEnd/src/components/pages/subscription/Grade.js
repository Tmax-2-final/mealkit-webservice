import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from '../../elements/ui/Bread';
import IntroductionDetail from './IntroductionDetail';
import GradeDetail from './GradeDetail';

export default function Grade(props) {

    return (
        <Fragment>
            <Header/>
            <Bread
                productId = ""
                productName = "구독 - 멤버십 선택"
                productUrl = "/subscription/grade"
            />
            <GradeDetail/>
            <Footer/>
        </Fragment>
    );
}