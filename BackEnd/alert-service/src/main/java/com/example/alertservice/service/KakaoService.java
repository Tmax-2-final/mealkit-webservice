package com.example.alertservice.service;

import com.example.alertservice.client.UserServiceClient;
import com.example.alertservice.common.Const;
import com.example.alertservice.entity.KakaoEntity;
import com.example.alertservice.entity.OAuthEntity;
import com.example.alertservice.util.UtilService;
import com.example.alertservice.vo.RequestAlert;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class KakaoService {

	private final UserServiceClient userServiceClient;
	private final HttpCallService httpCallService;
	private final UtilService utilService;

	@Value("${rest-api-key}")
	private String REST_API_KEY;
	
	@Value("${redirect-uri}")
	private String REDIRECT_URI;	
	
	@Value("${authorize-uri}")
	private String AUTHORIZE_URI;		
	
	@Value("${token-uri}")
	public String TOKEN_URI;			

	@Value("${kakao-api-host}")
	private String KAKAO_API_HOST;

	public KakaoEntity createKakaoForm(RequestAlert requestAlert) {
		KakaoEntity kakaoEntity = new KakaoEntity();
		// 카카오 토큰 확보
		OAuthEntity oAuthEntity = userServiceClient.getUserOauthByUserId(requestAlert.getUserId());

		kakaoEntity.setUserId(requestAlert.getUserId());
		kakaoEntity.setAccess_token(oAuthEntity.getAccess_token());

		// 정기 구독 결제
		if(requestAlert.getType() == 202) {
			kakaoEntity.setTemplate_id("63885");
		}
		// 정기 구독 확정
		else if(requestAlert.getType() == 203) {
			kakaoEntity.setTemplate_id("64552");
		}
		// 배송 시작
		else if(requestAlert.getType() == 301) {
			kakaoEntity.setTemplate_id("63882");
		}
		// 배송 완료
		else if(requestAlert.getType() == 302) {
			kakaoEntity.setTemplate_id("64554");
		}

		return kakaoEntity;
	}

	public String sendKakaoTalkToMe(KakaoEntity kakao) {
		String uri = KAKAO_API_HOST + "/v2/api/talk/memo/send";
		return httpCallService.CallwithToken(Const.POST, uri, kakao.getAccess_token(),
				"template_id="+ kakao.getTemplate_id() +
						"&template_args="+utilService.template_args(kakao.getUserId()));
	}

}
