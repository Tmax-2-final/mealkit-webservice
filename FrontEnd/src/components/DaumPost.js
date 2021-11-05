import DaumPostCode from 'react-daum-postcode';

const DaumPost = (props) => {
    const {setAddress, setPostcode, setModalOpen, setFullAddress} = props;

    const handleComplete = (data) => {
        
        let fullAddress = data.address;
        let extraAddress = '';
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setAddress(data.address);
        setPostcode(data.zonecode);
        setModalOpen(false);
        setFullAddress(fullAddress)
    }
    return (
                <>
                <div className="container">
                    <div className="row">
                        <div className="col-6 offset-3">
                        <DaumPostCode
                            onComplete={handleComplete} className="post-code" />
                        </div>
                    
                    </div>
                </div>
                
                </>);
}
export default DaumPost;