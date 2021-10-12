import DaumPostCode from 'react-daum-postcode';

const DaumPost = (props) => {
    const setAddress = props.setAddress;
    const setPostcode = props.setPostcode;
    const setModalOpen = props.setModalOpen;

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
        //fullAddress -> 전체 주소반환
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