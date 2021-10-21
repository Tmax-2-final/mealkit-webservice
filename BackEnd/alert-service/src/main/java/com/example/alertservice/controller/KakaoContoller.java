package com.example.alertservice.controller;

import com.example.alertservice.service.KakaoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@Slf4j
@RestController
public class KakaoContoller {

	private final KakaoService kakaoService;

    @Autowired
    public KakaoContoller(KakaoService kakaoService) {
        this.kakaoService = kakaoService;
    }

	@RequestMapping("/login")
    public RedirectView goKakaoOAuth() {
       return kakaoService.goKakaoOAuth();
    }

	@RequestMapping("/login-callback")
	public String loginCallback(@RequestParam("code") String code) {
        kakaoService.loginCallback(code);
        return kakaoService.messageTemplates();
	}	
	
	@RequestMapping("/profile")
    public String getProfile() {
       return kakaoService.getProfile();
    }	
	
	@RequestMapping("/authorize")
    public RedirectView goKakaoOAuth(@RequestParam("scope") String scope) {
		return kakaoService.goKakaoOAuth(scope);
    }	
	
	@RequestMapping("/friends")
    public String getFriends() {
       return kakaoService.getFriends();
    }	
	
	@RequestMapping("/message")
    public String message() {
       return kakaoService.messageTemplates();
    }
    @RequestMapping("/message2")
    public String message2() {
        return kakaoService.messageTemplates2();
    }

}
