export default function CartTableFooter() {
    return(
        <div className="row">
            <div className="col-lg-4 col-md-6">
                <div className="cart-tax">
                    <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">Estimate Shipping And Tax</h4>
                    </div>
                    <div className="tax-wrapper">
                        <p>
                            Enter your destination to get a shipping estimate.
                        </p>
                        <div className="tax-select-wrapper">
                            <div className="tax-select">
                                <label>* Country</label>
                                <select className="email s-email s-wid">
                                    <option>Bangladesh</option>
                                    <option>Albania</option>
                                    <option>Åland Islands</option>
                                    <option>Afghanistan</option>
                                    <option>Belgium</option>
                                </select>
                            </div>
                            <div className="tax-select">
                                <label>* Region / State</label>
                                <select className="email s-email s-wid">
                                    <option>Bangladesh</option>
                                    <option>Albania</option>
                                    <option>Åland Islands</option>
                                    <option>Afghanistan</option>
                                    <option>Belgium</option>
                                </select>
                            </div>
                            <div className="tax-select">
                                <label>* Zip/Postal Code</label>
                                <input type="text" />
                            </div>
                            <button className="cart-btn-2" type="submit">Get A Quote</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6">
                <div className="discount-code-wrapper">
                    <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">Use Coupon Code</h4>
                    </div>
                    <div className="discount-code">
                        <p>Enter your coupon code if you have one.</p>
                        <form>
                            <input type="text" required="" name="name"/>
                            <button className="cart-btn-2" type="submit">Apply Coupon</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-12">
                <div className="grand-totall">
                    <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">Cart Total</h4>
                    </div>
                    <h5>Total products <span>$73.13</span></h5>
                    <h4 className="grand-totall-title">Grand Total <span>$73.13</span></h4>
                    <a href="/checkout">Proceed to Checkout</a>
                </div>
            </div>
        </div>
    );
}