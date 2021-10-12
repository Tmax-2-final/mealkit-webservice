import React from 'react';
import Nav from '../../elements/ui/Nav';
import Brand from '../../elements/widgets/brand/Brand';

export default function Features() {
    return (
        <div id="wrap">
            <div className="container-fluid" style={{padding: "0px"}}>
                <Nav/>
            </div>
            <Brand />
        </div>
    );
}