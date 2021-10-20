import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from '../../elements/ui/Bread';
import RegisterDetail from './RegisterDetail';

export default function Grade(props) {
    const grade = props.location.state.grade;

    return (
        <Fragment>
            <Header/>
            <Bread
                productId = ""
                productName = "구독 - 멤버십 선택"
                productUrl = "/subscription/grade"
            />
            <RegisterDetail
                grade = {grade}
            />
            <Footer/>
        </Fragment>
    );
}