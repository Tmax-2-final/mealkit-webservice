package com.example.alertservice.controller;

import com.example.alertservice.client.UserServiceClient;
import com.example.alertservice.entity.MailEntity;
import com.example.alertservice.service.AlertService;
import com.example.alertservice.service.KakaoService;
import com.example.alertservice.service.MailService;
import com.example.alertservice.util.UtilService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/")
public class AlertController {

    private final MailService mailService;
    private final UtilService utilService;
    private final AlertService alertService;
    private final KakaoService kakaoService;
    private final UserServiceClient userServiceClient;
    private final Environment env;

    @Autowired
    public AlertController(MailService mailService, UtilService utilService,
                           AlertService alertService, KakaoService kakaoService,
                           UserServiceClient userServiceClient, Environment env) {
        this.mailService = mailService;
        this.utilService = utilService;
        this.alertService = alertService;
        this.kakaoService = kakaoService;
        this.userServiceClient = userServiceClient;
        this.env = env;
    }

    @ApiOperation(value = "상태", notes="상태 조회")
    @GetMapping("/health_check")
    public String status(HttpServletRequest request) {

        return String.format("It`s Working in User Service, " +
                        "Port(local.server.port)=%s,  Port(server.port)=%s, " +
                        "token.secret=%s, token.expiration_time=%s, gateway.ip=%s",
                env.getProperty("local.server.port"), env.getProperty("server.port"),
                env.getProperty("token.secret"), env.getProperty("token.expiration_time"), env.getProperty("gateway.ip"));
    }

    @ApiOperation(value = "이메일 테스트 발송", notes="이메일 테스트 발송")
    @GetMapping("/send-test")
    public MailEntity sendTestMail(String email) {
        MailEntity mailEntity = new MailEntity();

        mailEntity.setAddress(email);
        mailEntity.setTitle("테스트 발송 이메일입니다.");
        mailEntity.setMessage("안녕하세요. 반가워요!");

        mailService.sendMail(mailEntity);

        return mailEntity;
    }

    @ApiOperation(value = "이메일 인증", notes="회원가입 본인 인증용 이메일 발송")
    @GetMapping("/alert/email")
    public ResponseEntity<String> createUserCheckEmail(String email) {
        StringBuilder message = new StringBuilder();

        // 인증 코드 제작
        StringBuilder code = new StringBuilder();
        code.append(utilService.createKey());

        log.info("회원 가입 인증 이메일 전송 시작");
        // 메일 폼 세팅 및 메일 전송
        MailEntity mailEntity = new MailEntity();
        mailEntity.setAddress(email);
        mailEntity.setTitle("[매일(mail)키트] 회원가입을 위한 인증 코드 메일입니다.");
        mailEntity.setMessage(code.toString());
        mailService.sendMail(mailEntity);

        message.append("회원가입 인증 코드 이메일을 성공적으로 발송했습니다. 잠시 후 확인해주세요.");

        log.info("회원 가입 인증 이메일 전송 완료");
        // 유저 이메일 별 인증 코드 DB에 저장
        alertService.createMailAuth(email, code.toString());

        return ResponseEntity.status(HttpStatus.OK).body(message.toString());
    }

    @ApiOperation(value = "인증코드 조회", notes="회원가입 시 이메일 별 인증코드 검사")
    @GetMapping("/alert/code")
    public ResponseEntity<Map<String, Integer>> getUsersEmailAndAuthCode(@RequestParam("email") String email, @RequestParam("code") String code) {
        Map<String,Integer> result = new HashMap<>();

        // 저장된 유저이메일별인증코드 데이터가 있는지 조회하기
        boolean findUsersEmailAndAuthCode = alertService.getUsersEmailAndAuthCode(email, code);
        // 있다면 result에 1저장
        if(findUsersEmailAndAuthCode == true){
            result.put("result", 1);
        }
        // 없다면 result에 0저장
        else {
            result.put("result", 0);
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value="일반 상품 결제 완료 알람", notes="일반 상품 결제 완료 이메일 및 카카오 알림")
    @RequestMapping("/alert/orders/{userId}/{orderId}")
    public Map<String, Integer> sendOrderComplete(HttpSession httpSession, @PathVariable("userId") String userId, @PathVariable("orderId") String orderId) {
        Map<String, Integer> result = new HashMap<>();
        // 카카오 알림 발송 코드
        if(httpSession.getAttribute("token") != null || httpSession.getAttribute("token") != "") {
            // kakaoService.goKakaoOAuth();
            // kakaoService.message();
        }
        // 이메일 발송 코드
        log.info("일반 상품 결제 완료 이메일 알림 발송 시작");
        // 유저 이메일 확보
        String email = userServiceClient.getUserEmailByUserId(userId);
        try {
            // 메일 메시지 생성
            StringBuilder msg = new StringBuilder();
            msg.append(userId);
            msg.append("회원님이 선택하신 상품의 결제가 완료되었습니다.\n\n");
            msg.append("주문번호: ");
            msg.append(orderId);
            msg.append("\n\n저희 서비스를 이용해주셔서 감사합니다.");
            msg.append("\n\n<a href=\"http://localhost:3000/mypage/myOrder\">확인하기</a>");

            // 메일 폼 세팅 및 메일 전송
            MailEntity mailEntity = new MailEntity();
            mailEntity.setAddress(email);
            mailEntity.setTitle("[매일(mail)키트] 회원님의 상품 결제가 완료되었습니다.");
            mailEntity.setMessage(msg.toString());
            mailService.sendMail(mailEntity);
            log.info("일반 상품 결제 완료 이메일 알림 발송 완료");

            result.put("result_code", 0);
        }
        catch(Exception e) {
            log.error("이메일 발송 실패");
            result.put("result_code", 550);
        }
        // 데이터베이스에 저장
        return result;
    }

}
