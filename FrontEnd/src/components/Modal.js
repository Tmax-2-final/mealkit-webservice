import React from 'react';
import "../../src/assets/css/modal.css";
import DaumPost from './DaumPost';

export const Modal = ( props ) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, setAddress, setPostcode, setModalOpen } = props;

    // 바깥 검은 바탕 클릭 시 모달 종료
    const handlClick = () => {
        close();
    }

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={ open ? 'openModal modal' : 'modal' } onClick={handlClick}>
            { open ? (  
                <DaumPost close={close} setAddress={setAddress} setPostcode={setPostcode} setModalOpen={setModalOpen}></DaumPost>
            ) : null }
        </div>
    )
}