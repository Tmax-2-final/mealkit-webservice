package com.example.alertservice.service;

import com.example.alertservice.common.Const;
import com.example.alertservice.transformer.Trans;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
@Service
public class KakaoService {
	
	private final HttpSession httpSession;	
	
	@Autowired
	public HttpCallService httpCallService;
	

	@Value("${rest-api-key}")
	private String REST_API_KEY;
	
	@Value("${redirect-uri}")
	private String REDIRECT_URI;	
	
	@Value("${authorize-uri}")
	private String AUTHORIZE_URI;		
	
	@Value("${token-uri}")
	public String TOKEN_URI;			
	
	@Value("${client-secret}")
	private String CLIENT_SECRET;	
	
	@Value("${kakao-api-host}")
	private String KAKAO_API_HOST;	
	
	
	public RedirectView goKakaoOAuth() {
       return goKakaoOAuth("");
	}
	
	public RedirectView goKakaoOAuth(String scope) {
	   
	   String uri = AUTHORIZE_URI+"?redirect_uri="+REDIRECT_URI+"&response_type=code&client_id="+REST_API_KEY;
	   if(!scope.isEmpty()) uri += "&scope="+scope;
			   
       return new RedirectView(uri);
	}	
	
	public RedirectView loginCallback(String code) {	
		String param = "grant_type=authorization_code&client_id="+REST_API_KEY+"&redirect_uri="+REDIRECT_URI+"&client_secret="+CLIENT_SECRET+"&code="+code;
		String rtn = httpCallService.Call(Const.POST, TOKEN_URI, Const.EMPTY, param);
        httpSession.setAttribute("token", Trans.token(rtn, new JsonParser()));
		return new RedirectView("/index.html");
	}
			
	public String getProfile() {	
		String uri = KAKAO_API_HOST + "/v2/user/me";
		return httpCallService.CallwithToken(Const.GET, uri, httpSession.getAttribute("token").toString());
	}
	
	public String getFriends() {	
		String uri = KAKAO_API_HOST + "/v1/api/talk/friends";
		return httpCallService.CallwithToken(Const.GET, uri, httpSession.getAttribute("token").toString());
	}

	public String messageTemplates() {
		String uri = KAKAO_API_HOST + "/v2/api/talk/memo/send";
		return httpCallService.CallwithToken(Const.POST, uri, httpSession.getAttribute("token").toString(), "template_id=63882&template_args="+Trans.template_args);
	}

	public String messageTemplates2() {
		String uri = KAKAO_API_HOST + "/v2/api/talk/memo/send";
		String userId = "zxcv9455";
		String subscribeName = "스탠다드";
		Integer subscribeQty = 3;
		String template_args = Trans.template_args2(userId, subscribeName, subscribeQty);
		return httpCallService.CallwithToken(Const.POST, uri, httpSession.getAttribute("token").toString(), "template_id=63885&template_args="+template_args);
	}
}
