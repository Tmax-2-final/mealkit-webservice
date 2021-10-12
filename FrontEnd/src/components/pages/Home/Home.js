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
            <Deal />
            <Blog />
            <Footer />
        </Fragment>
    );
}