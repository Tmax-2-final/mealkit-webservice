package com.example.alertservice.util;

import com.example.alertservice.querydsl.AlertsSearchParam;
import org.apache.commons.lang.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Random;

@Service
public class UtilService {
    //	인증코드 만들기
    public static String createKey() {
        StringBuffer key = new StringBuffer();
        // 코드 한줄로 숫자+문자 조합 10개까지 랜덤 생성하기
        key.append(RandomStringUtils.randomAlphanumeric(10));
        // 직접 코드 작성하기
//        Random rnd = new Random();
//
//        for (int i = 0; i < 10; i++) { // 인증코드 10자리
//            int index = rnd.nextInt(3); // 0~2 까지 랜덤
//            switch (index) {
//                case 0:
//                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
//                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
//                    break;
//                case 1:
//                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
//                    //  A~Z
//                    break;
//                case 2:
//                    key.append((rnd.nextInt(10)));
//                    // 0~9
//                    break;
//            }
//        }

        return key.toString();
    }

    // 검색 파라미터 세팅하기
    public AlertsSearchParam setAlertsSearchParameter(String searchType, String searchValue,
                                                      LocalDate startDate, LocalDate endDate) {
        AlertsSearchParam alertsSearchParam = new AlertsSearchParam();

        alertsSearchParam.setSearchType(searchType);
        alertsSearchParam.setSearchValue(searchValue);
        if(startDate != null && endDate != null) {
            alertsSearchParam.setStartDate(startDate.atStartOfDay());
            alertsSearchParam.setEndDate(endDate.plusDays(1L).atStartOfDay());
        }

        return alertsSearchParam;
    }
    // 카카오 메세지 템플릿 만들기
    public static String template_args(String userId) {
        String s = ""
                + "{"
                + "\"userId\": \"" + userId +"\""
                + "}"
                + "";
        return s;
    }
}
