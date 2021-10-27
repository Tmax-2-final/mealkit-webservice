import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from '../../elements/ui/Bread';
import IntroductionDetail from './IntroductionDetail';
import GradeDetail from './GradeDetail';
import GradeDetail2 from './GradeDetail2';

export default function Grade(props) {

    return (
        <Fragment>
            <Header/>
            <Bread
                productId = ""
                productName = "구독 선택"
                productUrl = "/subscription/grade"
            />
            <GradeDetail2/>
            <Footer/>
        </Fragment>
    );
}