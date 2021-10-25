import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from '../../elements/ui/Bread';
import RegisterDetail from './RegisterDetail';
import RegisterDetail2 from './RegisterDetail2';

export default function Grade(props) {
    const chkedGradeData = props.location.state.chkedGradeData;

    return (
        <Fragment>
            <Header/>
            <Bread
                productId = ""
                productName = "카드 등록 및 구독 시작"
                productUrl = "/subscription/grade"
            />
            <RegisterDetail2
                chkedGradeData = {chkedGradeData}
            />
            <Footer/>
        </Fragment>
    );
}