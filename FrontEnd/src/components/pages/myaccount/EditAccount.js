export default function EditAccout() {

    return(

        <div className="card-body">
            <div className="myaccount-info-wrapper">
                <div className="account-info-wrapper">
                    <h4>My Account Information</h4>
                    <h5>Your Personal Details</h5>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="billing-info">
                            <label>First Name</label>
                            <input type="text"/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="billing-info">
                            <label>Last Name</label>
                            <input type="text"/>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="billing-info">
                            <label>Email Address</label>
                            <input type="email"/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="billing-info">
                            <label>Telephone</label>
                            <input type="text"/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="billing-info">
                            <label>Fax</label>
                            <input type="text"/>
                        </div>
                    </div>
                </div>
                <div className="billing-back-btn">
                    <div className="billing-btn">
                        <button type="submit">Continue</button>
                    </div>
                </div>
            </div>
        </div>
    );

}