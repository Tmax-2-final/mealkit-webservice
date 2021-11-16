import React, { Fragment } from 'react';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Banner from '../../elements/ui/Banner';
import Brand from '../../elements/widgets/brand/Brand';
import Deal from '../deal/Deal';
import Blog from '../blog/Blog';

export default function Home() {
    return (
        <Fragment>
            <Header/>
            <Banner />
            {/* 배송되나요? 받을 수 있어요 */}
            <Brand />
            {/* 유저가 만든 정기 구독 패키지 */}
            <Blog />
            {/* 베스트 밀키트 */}
            <Deal />
            
            <Footer />
        </Fragment>
    );
}