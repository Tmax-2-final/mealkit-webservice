package com.example.alertservice.controller;

import com.example.alertservice.client.UserServiceClient;
import com.example.alertservice.entity.AlertsEntity;
import com.example.alertservice.entity.KakaoEntity;
import com.example.alertservice.entity.MailEntity;
import com.example.alertservice.querydsl.AlertsSearchParam;
import com.example.alertservice.service.AlertService;
import com.example.alertservice.service.KakaoService;
import com.example.alertservice.service.MailService;
import com.example.alertservice.util.UtilService;
import com.example.alertservice.vo.RequestAlert;
import com.example.alertservice.vo.ResponseAlert;
import com.example.alertservice.vo.ResponseUser;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDate;
import java.util.*;

@RestController
@Slf4j
@RequestMapping("/")
public class AlertController {

    private final MailService mailService;
    private final UtilService utilService;
    private final AlertService alertService;
    private final KakaoService kakaoService;
    private final Environment env;
    private final UserServiceClient userServiceClient;

    @Autowired
    public AlertController(MailService mailService, UtilService utilService,
                           AlertService alertService, KakaoService kakaoService,
                           Environment env, UserServiceClient userServiceClient) {
        this.mailService = mailService;
        this.utilService = utilService;
        this.alertService = alertService;
        this.kakaoService = kakaoService;
        this.env = env;
        this.userServiceClient = userServiceClient;
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

    @ApiOperation(value = "이메일 인증", notes="회원가입 본인 인증용 이메일 발송")
    @GetMapping("/alerts/email")
    public ResponseEntity<String> createUserCheckEmail(String email) {
        StringBuilder message = new StringBuilder();

        // 인증 코드 제작
        StringBuilder code = new StringBuilder();
        code.append(utilService.createKey());

        log.info("회원 가입 인증 이메일 전송 시작");
        try{
            // 메일 폼 세팅 및 메일 전송
            // MailEntity mailEntity = mailService.createMailForm(101);
            MailEntity mailEntity = new MailEntity();
            mailEntity.setAddress(email);
            mailEntity.setTitle("[매일(mail)키트] 회원가입을 위한 인증 코드 메일입니다.");
            mailEntity.setMessage(code.toString());
            mailService.sendMail(mailEntity);

            message.append("회원가입 인증 코드 이메일을 성공적으로 발송했습니다. 잠시 후 확인해주세요.");

            log.info("회원 가입 인증 이메일 전송 완료");
            // 유저 이메일 별 인증 코드 DB에 저장
            alertService.createMailAuth(email, code.toString());
        }
        catch (Exception e){
            log.error("회원 가입 인증 이메일 전송 실패");
            e.printStackTrace();
            message.append("이메일 전송 실패\n\n 사유:\n");
            message.append(e.getMessage());
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message.toString());
        }

        return ResponseEntity.status(HttpStatus.OK).body(message.toString());
    }

    @ApiOperation(value = "인증코드 조회", notes="회원가입 시 이메일 별 인증코드 검사")
    @GetMapping("/alerts/code")
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

    @ApiOperation(value="알림 발송", notes="알림 코드에 따른 알림 발송(메일&카카오)")
    @PostMapping("/alerts")
    public Map<String, String> sendAndSaveAlerts(@RequestBody RequestAlert requestAlert) {
        Map<String, String> result = new HashMap<>();
        // 유저 id로 유저 정보 불러오기
        ResponseUser user = userServiceClient.getUser(requestAlert.getUserId());
        if(user == null) {
            log.error("유저정보 불러오기 실패");
            result.put("result", "550");
            return result;
        }

        // 카카오 알림 발송 코드
        if(user.getOauth() != null && user.getOauth().equals("kakao")) {
            log.info("카카오 알림 발송 시작");
            // 0. 토큰 만료 기간부터 파악, 만료되었다면 갱신이 먼저 - 불가능함
            // kakaoService.refreshKakaoToken();
            // 1. 카카오 메세지 발송을 위한 카카오 알림 폼 제작
            KakaoEntity kakaoEntity = kakaoService.createKakaoForm(requestAlert);
            // 2. 카카오 메세지 발송
            String kakaoTalkResult = kakaoService.sendKakaoTalkToMe(kakaoEntity);
            result.put("kakao_result_code", kakaoTalkResult);
            log.info("카카오 알림 발송 완료");
        }
        // 이메일 발송 코드
        log.info("이메일 알림 발송 시작");
        try {
            // 1. 알림 코드로 어떤 메일 알림을 보낼 건지 service layer 에서 파악
            // 2. 메일 알림 폼 제작
            MailEntity mailEntity = mailService.createMailForm(requestAlert, user.getEmail());
            // 3. 알림 발송
            mailService.sendMail(mailEntity);
            // 4. 알림 전송 성공 코드
            result.put("result_code", "0");
            log.info("이메일 알림 발송 성공, DB에 알림 내역 저장 시작");
            // 5. 알림 내역 db 저장
            alertService.saveAlerts(requestAlert.getType(), requestAlert.getUserId(), mailEntity);
            log.info("알림 내역 저장 완료");
        }
        catch(Exception e) {
            log.error("이메일 발송 실패");
            result.put("result_code", "550");
        }
        return result;
    }

    @ApiOperation(value = "알림 내역 전체 페이징 조회", notes = "모든 알림 내역을 페이지별로 조회")
    @GetMapping("/alerts")
    public ResponseEntity<Page<ResponseAlert>> getAllAlerts(@PageableDefault(size = 8, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageRequest) {
        Page<AlertsEntity> alertsList = alertService.getAllAlerts(pageRequest);
        Page<ResponseAlert> responseAlertList = alertsList.map(
                v -> new ModelMapper().map(v, ResponseAlert.class)
        );

//        alertsList.forEach(v -> {
//            responseAlertList.add(new ModelMapper().map(v, ResponseAlert.class));
//        });

        return ResponseEntity.status(HttpStatus.OK).body(responseAlertList);
    }

    @ApiOperation(value = "알림 내역 타입+기간 별 페이징 조회", notes = "모든 알림 내역 중 일정 기간 내 타입 별로 페이징 조회")
    @GetMapping("/alerts/{type}")
    public ResponseEntity<Page<ResponseAlert>> getAlertsByCode(@PathVariable("type") Integer type,
                                                               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value="startDate", required = false) LocalDate startDate,
                                                               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value="endDate", required = false) LocalDate endDate,
                                                               @PageableDefault(size = 8, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageRequest) {
        Page<AlertsEntity> alertsList = null;
        // 1. 특정 기간이 포함된 경우
        if(startDate != null && endDate != null) {
            // 날짜 타입 변경 LocalDate -> Date
            Date fromDate = java.sql.Date.valueOf(startDate);
            Date toDate = java.sql.Date.valueOf(endDate.plusDays(1L));
            log.info(fromDate.toString());
            log.info(toDate.toString());
            alertsList = alertService.getAlertsByCodeAndCreatedAtBetween(type, fromDate, toDate, pageRequest);
        }
        // 2. 특정 기간이 포함되지 않은 경우(기간 제외)
        else {
            alertsList = alertService.getAlertsByCode(type, pageRequest);
        }
        Page<ResponseAlert> responseAlertList = alertsList.map(
                v -> new ModelMapper().map(v, ResponseAlert.class)
        );

        return ResponseEntity.status(HttpStatus.OK).body(responseAlertList);
    }

    @ApiOperation(value = "알림 내역 일정 기간 내 키워드 페이징 조회", notes = "모든 알림 내역 중 일정 기간 내 검색한 유저아이디 별로 페이징 조회")
    @GetMapping("/alerts/search")
    public ResponseEntity<Page<ResponseAlert>> getAlertsByUserIdContaining(@RequestParam(value = "searchType", required = false, defaultValue = "all") String searchType,
                                                               @RequestParam(value = "searchValue", required = false, defaultValue = "") String searchValue,
                                                               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value = "startDate", required = false) LocalDate startDate,
                                                               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value = "endDate", required = false) LocalDate endDate,
                                                               @PageableDefault(size = 8, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageRequest) {
        // 검색에 필요한 parameter 세팅 작업
        AlertsSearchParam alertsSearchParam = utilService.setAlertsSearchParameter(searchType, searchValue, startDate, endDate);

        // 데이터 찾기
        Page<AlertsEntity> alertsList = alertService.getAlertsBySearchKeyword(alertsSearchParam, pageRequest);

        Page<ResponseAlert> responseAlertList = alertsList.map(
                v -> new ModelMapper().map(v, ResponseAlert.class)
        );

        return ResponseEntity.status(HttpStatus.OK).body(responseAlertList);
    }

}
