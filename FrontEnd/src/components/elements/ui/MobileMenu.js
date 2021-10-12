export default function MobileMednu() {
    return (
        <div className="offcanvas-mobile-menu" id="offcanvas-mobile-menu">
                <button className="offcanvas-menu-close" id="mobile-menu-close-trigger"><i className="pe-7s-close"></i></button>
                <div className="offcanvas-wrapper">
                    <div className="offcanvas-inner-content">
                        <div className="offcanvas-mobile-search-area">
                            <form action="#">
                                <input type="search" placeholder="Search ..." />
                                <button type="submit"><i className="fa fa-search"></i></button>
                            </form>
                        </div>
                        <nav className="offcanvas-navigation" id="offcanvas-navigation">
                            <ul>
                                <li className="menu-item-has-children">
                                    <a href="/">Home</a>
                                    <span className="menu-expand"><i></i></span>
                                    <ul className="sub-menu">
                                        <li className="menu-item-has-children">
                                            <a href="/">Home Group One</a>
                                            <span className="menu-expand"><i></i></span>
                                            <ul className="sub-menu">
                                                <li><a href="/home-fashion">Home Fashion</a></li>
                                                
                                            </ul>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <a href="/">Home Group Two</a>
                                            <span className="menu-expand"><i></i></span>
                                            <ul className="sub-menu">
                                                <li><a href="/home-furniture-five">Home Furniture Five</a></li>
                                               
                                            </ul>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <a href="/">Home Group Three</a>
                                            <span className="menu-expand"><i></i></span>
                                            <ul className="sub-menu">
                                                <li><a href="/home-grid-banner">Home Grid Banner</a></li>
                                                
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li className="menu-item-has-children">
                                    <a href="/shop-grid-standard">Shop</a>
                                    <span className="menu-expand"><i></i></span>
                                    <ul className="sub-menu">
                                        <li className="menu-item-has-children">
                                            <a href="/shop-grid-standard">Shop Layout</a>
                                            <span className="menu-expand"><i></i></span>
                                            <ul className="sub-menu">
                                                <li><a href="/shop-grid-standard">Shop Grid Standard</a></li>
                                               
                                            </ul>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <a href="/product/1">Product Details</a>
                                            <span className="menu-expand"><i></i></span>
                                            <ul className="sub-menu">
                                                <li><a href="/product/1">Product Tab Bottom</a></li>
                                                
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li><a href="/shop-grid-standard">Collection</a></li>
                                <li className="menu-item-has-children">
                                    <a href="/">Pages</a>
                                    <span className="menu-expand"><i></i></span>
                                    <ul className="sub-menu">
                                        <li><a href="/cart">Cart</a></li>
                                        
                                    </ul>
                                </li>
                                <li className="menu-item-has-children">
                                    <a href="/blog-standard">Blog</a>
                                    <span className="menu-expand"><i></i></span>
                                    <ul className="sub-menu">
                                        <li><a href="/blog-standard">Blog Standard</a></li>
                                       
                                    </ul>
                                </li>
                                <li><a href="/contact">Contact Us</a></li>
                            </ul>
                        </nav>
                        <div className="mobile-menu-middle">
                            <div className="lang-curr-style">
                                <span className="title mb-2">Choose Language </span>
                                <select>
                                    <option value="en">English</option>
                                    <option value="fn">French</option>
                                    <option value="de">Germany</option>
                                </select>
                            </div>
                            <div className="lang-curr-style">
                                <span className="title mb-2">Choose Currency</span>
                                <select>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                </select>
                            </div>
                        </div>
                        <div className="offcanvas-widget-area">
                            <div className="off-canvas-contact-widget">
                                <div className="header-contact-info">
                                    <ul className="header-contact-info__list">
                                        <li><i className="fa fa-phone"></i> <a href="tel://12452456012">(1245) 2456 012 </a></li>
                                        <li><i className="fa fa-envelope"></i> <a href="mailto:info@yourdomain.com">info@yourdomain.com</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="off-canvas-widget-social">
                                <a href="//twitter.com" title="Twitter"><i className="fa fa-twitter"></i></a>
                                <a href="//instagram.com" title="Instagram"><i className="fa fa-instagram"></i></a>
                                <a href="//facebook.com" title="Facebook"><i className="fa fa-facebook"></i></a>
                                <a href="//pinterest.com" title="Pinterest"><i className="fa fa-pinterest"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}