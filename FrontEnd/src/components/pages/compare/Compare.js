import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Bread from '../../elements/ui/Bread';
import CompareTable from '../../elements/widgets/comparetable/CompareTable';
import { Fragment } from 'react';

export default function Compare() {
    return(
        <Fragment>
            <Header />
            <Bread productName = "패키지 직접 제작"/>
            <CompareTable />
            <Footer />
        </Fragment>
    );
}
