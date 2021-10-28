import React, {useState} from 'react';
import FooterLogo from '../elements/ui/FooterLogo';
import FooterMenu from '../elements/ui/FooterMenu';

export default function Footer(){

    return (
        <footer>
            <div className="container-fluid" style={{padding: "0px"}}>
                <div className="footer">
                    <div className="container">
                        <div className="row">
                            <FooterLogo />
                            <FooterMenu />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}