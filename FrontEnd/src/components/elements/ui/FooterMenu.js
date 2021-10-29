import { Link } from 'react-router-dom';

export default function FooterMenu(){

    return(
        <div className="col-12 col-md-8">
            <p className="menuTitle">
                <Link to="" >이용약관</Link>
                <Link to="" style={{ marginLeft: "20px" }}>개인정보처리 방침</Link>
                <Link to="" style={{ marginLeft: "20px" }}>법적 고지</Link>
                <Link to="" style={{ marginLeft: "20px" }}>사업자정보 확인</Link>
            </p>
            <p>
                <span style={{ color: " black" }}>매일키트(주) 대표이사 : </span> 민웅기, 오지웅, 신혜원, 김남곤
                <br/>
                <span style={{ color: " black" }}>사업자등록번호 : </span>104-86-09535
                <br />
                <span style={{ color: " black" }}>주소 : </span> 경기도 성남시 분당구 수내동 6-4, 티맥스 수내타워 1층
                <br />
                <span style={{ color: " black" }}>개인정보보호책임자 : </span>김남곤  이메일 : mailkits.omt@gmail.com <br />
                <span style={{ color: " black" }}>호스팅제공자 : </span>매일키트㈜ <br />
                고객님은 안전거래를 위해 현금등으로 결제 시 OO은행과 재무지급보증계약을 체결하여 안전거래를 보장하고 있습니다. <br />
                <Link to="" style={{textDecoration:"underline"}}>서비스 가입사실 확인</Link> <br />
            </p>
        </div>
    );
}