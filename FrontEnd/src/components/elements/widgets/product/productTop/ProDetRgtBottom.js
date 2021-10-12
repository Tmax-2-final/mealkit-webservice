import { Fragment } from "react";

export default function ProDetRgtBottom() {

    return(
        <Fragment>
            <div className="pro-details-meta">
                <span>Categories :</span>
                <ul>
                    <li><a href="/shop-grid-standard">fashion</a></li>
                    
                </ul>
            </div>
            <div className="pro-details-meta">
                <span>Tags :</span>
                <ul>
                    <li><a href="/shop-grid-standard">fashion</a></li>
                    
                </ul>
            </div>
            <div className="pro-details-social">
                <ul>
                    <li><a href="//facebook.com"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="//naver.com"><i className="fab fa-line"></i></a></li>
                    <li><a href="//twitter.com"><i className="fab fa-twitter"></i></a></li>
                </ul>
            </div>
        </Fragment>
    );
}