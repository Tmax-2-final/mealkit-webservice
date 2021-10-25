package com.example.alertservice.service;

import com.example.alertservice.client.UserServiceClient;
import com.example.alertservice.entity.MailEntity;
import com.example.alertservice.vo.RequestAlert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class MailService {

    private final JavaMailSender mailSender;
    private final UserServiceClient userServiceClient;

    @Autowired
    public MailService (JavaMailSender mailSender, UserServiceClient userServiceClient) {
        this.mailSender = mailSender;
        this.userServiceClient = userServiceClient;
    }

    /*
    Title:          이메일 발송을 위한 폼 제작
    Subscription:   RequestAlert 의 알림 타입을 받아 어떤 메일 알림을 보내는지와 그 메일 발송을 위한 폼을 제작한다.
    Date:           2021.10.24(일)
    Writer:         김남곤
     */
    public MailEntity createMailForm(RequestAlert requestAlert) {
        MailEntity mailEntity = new MailEntity();
        // 유저 이메일 확보
        String email = userServiceClient.getUserEmailByUserId(requestAlert.getUserId());
        // 제목 및 메세지 작성을 위한 초기 세팅
        StringBuilder title = new StringBuilder();
        StringBuilder msg = new StringBuilder();
        msg.append("<h1>매일(mail)키트 알림</h1>");
        msg.append("<h2><span style=\"color:#03c75a\">" + requestAlert.getUserId() + "</span>");

        // 일반 상품 결제 완료
        if(requestAlert.getType() == 201) {
            // 메일 제목 생성 및 주입
            title.append("[매일(mail)키트] 회원님의 상품 결제가 완료되었습니다.");
            // 메일 메시지 생성
            msg.append("회원님의 결제 완료 내역</h2>");
            msg.append("<table cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;margin:0;padding:0;border-top:1px solid #000;border-bottom:1px solid #000;font-size:14px;line-height:20px\">" +
                    "<tbody><tr><td style=\"width:108px;padding:14px 12px;background:#f7f7f7; border-bottom:1px solid #ededed; color:#000; vertical-align:top;\">" +
                    "주문번호" +
                    "</td><td style=\"padding:11px 0 11px 12px; border-bottom:1px solid #f5f5f5; color:#000;line-height:20px;\">" +
                    "<span style=\"margin-right:11px;\">");
            msg.append(requestAlert.getOrderId());
            msg.append("</span>" +
                    "</td></tr><tr><td style=\"width:108px;padding:14px 12px;background:#f7f7f7;border-bottom:1px solid #ededed; color:#000; vertical-align:top;\">" +
                    "결제일</td>" +
                    "<td style=\"padding:11px 0 11px 12px; border-bottom:1px solid #f5f5f5; color:#000;\">");
            msg.append(requestAlert.getPayDate());
            msg.append("</td></tr><tr><td style=\"width:108px;padding:14px 12px;background:#f7f7f7;border-bottom:1px solid #ededed; color:#000; vertical-align:top;\">" +
                    "결제금액" +
                    "</td><td style=\"padding:11px 0 11px 12px; border-bottom:1px solid #f5f5f5; color:#000; font-weight:bold;\">");
            msg.append(requestAlert.getPayPrice() + "원 (VAT 포함)");
//            msg.append("</td></tr><tr><td style=\"padding:14px 12px;background:#f7f7f7; color:#000; vertical-align:top;\">" +
//                    "다음 결제 예정일" +
//                    "</td><td style=\"padding:11px 0 11px 12px;color:#000; font-weight:bold;\">");
//            msg.append(requestAlert.getNextPayDate());
            msg.append("</td></tr>");
            msg.append("</tbody></table>");

            msg.append("<ul><li>자세한 내용은 <a href=\"http://localhost:3000/mypage/myOrder\" style=\"color:#222;\" target=\"_blank\" rel=\"noreferrer noopener\">" +
                    "주문내역</a>에서 확인하세요</li></ul><br/><br/>");


        }
        // 정기 구독 결제 완료
        else if(requestAlert.getType() == 202) {
            // 메일 제목 생성 및 주입
            title.append("[매일(mail)키트] 회원님의 구독 결제가 완료되었습니다.");
            // 메일 메시지 생성
            msg.append("회원님의 구독 결제 내역</h2>");
            msg.append("<table cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;margin:0;padding:0;border-top:1px solid #000;border-bottom:1px solid #000;font-size:14px;line-height:20px\">" +
                    "<tbody><tr><td style=\"width:108px;padding:14px 12px;background:#f7f7f7; border-bottom:1px solid #ededed; color:#000; vertical-align:top;\">" +
                    "구독등급" +
                    "</td><td style=\"padding:11px 0 11px 12px; border-bottom:1px solid #f5f5f5; color:#000;line-height:20px;\">" +
                    "<span style=\"margin-right:11px;\">");
            msg.append(requestAlert.getSubGradeName());
            msg.append("</span>" +
                    "</td></tr><tr><td style=\"width:108px;padding:14px 12px;background:#f7f7f7;border-bottom:1px solid #ededed; color:#000; vertical-align:top;\">" +
                    "결제일</td>" +
                    "<td style=\"padding:11px 0 11px 12px; border-bottom:1px solid #f5f5f5; color:#000;\">");
            msg.append(requestAlert.getPayDate());
            msg.append("</td></tr><tr><td style=\"width:108px;padding:14px 12px;background:#f7f7f7;border-bottom:1px solid #ededed; color:#000; vertical-align:top;\">" +
                    "결제금액" +
                    "</td><td style=\"padding:11px 0 11px 12px; border-bottom:1px solid #f5f5f5; color:#000; font-weight:bold;\">");
            msg.append(requestAlert.getPayPrice() + "원 (VAT 포함)");
            msg.append("</td></tr><tr><td style=\"padding:14px 12px;background:#f7f7f7; color:#000; vertical-align:top;\">" +
                    "다음 결제 예정일" +
                    "</td><td style=\"padding:11px 0 11px 12px;color:#000; font-weight:bold;\">");
            msg.append(requestAlert.getNextPayDate());
            msg.append("</td></tr>");
            msg.append("</tbody></table>");

            msg.append("<ul><li>자세한 내용은 <a href=\"http://localhost:3000/mypage/mySubOrder\" style=\"color:#222;\" target=\"_blank\" rel=\"noreferrer noopener\">" +
                    "구독내역</a>에서 확인하세요</li></ul><br/><br/>");
        }
        // 구독 확정
        else if(requestAlert.getType() == 203) {
            // 메일 제목 생성 및 주입
            title.append("[매일(mail)키트] 회원님의 구독이 확정되었습니다.");
            // 메일 메시지 생성
            msg.append("회원님의 구독 확정 내역</h2>");
            msg.append("<table cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;margin:0;padding:0;border-top:1px solid #000;border-bottom:1px solid #000;font-size:14px;line-height:20px\">" +
                    "<tbody><tr><td style=\"width:108px;padding:14px 12px;background:#f7f7f7; border-bottom:1px solid #ededed; color:#000; vertical-align:top;\">" +
                    "구독등급" +
                    "</td><td style=\"padding:11px 0 11px 12px; border-bottom:1px solid #f5f5f5; color:#000;line-height:20px;\">" +
                    "<span style=\"margin-right:11px;\">");
            msg.append(requestAlert.getSubGradeName());
            msg.append("</span>" +
                    "</td></tr><tr><td style=\"width:108px;padding:14px 12px;background:#f7f7f7;border-bottom:1px solid #ededed; color:#000; vertical-align:top;\">" +
                    "구독주문번호</td>" +
                    "<td style=\"padding:11px 0 11px 12px; border-bottom:1px solid #f5f5f5; color:#000;\">");
            msg.append(requestAlert.getSubOrderId());
            msg.append("</td></tr><tr><td style=\"width:108px;padding:14px 12px;background:#f7f7f7;border-bottom:1px solid #ededed; color:#000; vertical-align:top;\">" +
                    "배송상태" +
                    "</td><td style=\"padding:11px 0 11px 12px; border-bottom:1px solid #f5f5f5; color:#000; font-weight:bold;\">");
            msg.append("구독 상품 준비중");
            msg.append("</td></tr>");
            msg.append("</tbody></table>");

            msg.append("<ul><li>자세한 내용은 <a href=\"http://localhost:3000/mypage/mySubOrder\" style=\"color:#222;\" target=\"_blank\" rel=\"noreferrer noopener\">" +
                    "구독내역</a>에서 확인하세요</li></ul><br/><br/>");
        }
        // 배송 시작
        else if(requestAlert.getType() == 301) {
            // 메일 제목 생성 및 주입
            title.append("[매일(mail)키트] 회원님의 상품 배송이 시작되었습니다.");
            // 메일 메시지 생성
            msg.append("회원님의 배송 내역</h2>");
            msg.append("<table cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;margin:0;padding:0;border-top:1px solid #000;border-bottom:1px solid #000;font-size:14px;line-height:20px\">" +
                    "<tbody><tr><td style=\"width:108px;padding:14px 12px;background:#f7f7f7; border-bottom:1px solid #ededed; color:#000; vertical-align:top;\">" +
                    "배송번호" +
                    "</td><td style=\"padding:11px 0 11px 12px; border-bottom:1px solid #f5f5f5; color:#000;line-height:20px;\">" +
                    "<span style=\"margin-right:11px;\">");
            msg.append(requestAlert.getDeliveryId());
            msg.append("</span>" +
                    "</td></tr><tr><td style=\"width:108px;padding:14px 12px;background:#f7f7f7;border-bottom:1px solid #ededed; color:#000; vertical-align:top;\">" +
                    "배송업체</td>" +
                    "<td style=\"padding:11px 0 11px 12px; border-bottom:1px solid #f5f5f5; color:#000;\">");
            msg.append("CJ 대한통운");
            msg.append("</td></tr><tr><td style=\"width:108px;padding:14px 12px;background:#f7f7f7;border-bottom:1px solid #ededed; color:#000; vertical-align:top;\">" +
                    "배송도착 예정일" +
                    "</td><td style=\"padding:11px 0 11px 12px; border-bottom:1px solid #f5f5f5; color:#000; font-weight:bold;\">");
            msg.append(requestAlert.getDeliveryDate());
            msg.append("</td></tr>");
            msg.append("</tbody></table>");

            msg.append("<ul><li>자세한 내용은 <a href=\"http://localhost:3000/mypage/myDeliOrder\" style=\"color:#222;\" target=\"_blank\" rel=\"noreferrer noopener\">" +
                    "배송내역</a>에서 확인하세요</li></ul><br/><br/>");
        }
        // 배송 완료
        else if(requestAlert.getType() == 302) {
            // 메일 제목 생성 및 주입
            title.append("[매일(mail)키트] 회원님의 상품 배송이 완료되었습니다.");
            // 메일 메시지 생성
            msg.append("회원님의 배송 완료 내역</h2>");
            msg.append("<table cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;margin:0;padding:0;border-top:1px solid #000;border-bottom:1px solid #000;font-size:14px;line-height:20px\">" +
                    "<tbody><tr><td style=\"width:108px;padding:14px 12px;background:#f7f7f7; border-bottom:1px solid #ededed; color:#000; vertical-align:top;\">" +
                    "배송번호" +
                    "</td><td style=\"padding:11px 0 11px 12px; border-bottom:1px solid #f5f5f5; color:#000;line-height:20px;\">" +
                    "<span style=\"margin-right:11px;\">");
            msg.append(requestAlert.getDeliveryId());
            msg.append("</span>" +
                    "</td></tr><tr><td style=\"width:108px;padding:14px 12px;background:#f7f7f7;border-bottom:1px solid #ededed; color:#000; vertical-align:top;\">" +
                    "배송업체</td>" +
                    "<td style=\"padding:11px 0 11px 12px; border-bottom:1px solid #f5f5f5; color:#000;\">");
            msg.append("CJ 대한통운");
            msg.append("</td></tr><tr><td style=\"width:108px;padding:14px 12px;background:#f7f7f7;border-bottom:1px solid #ededed; color:#000; vertical-align:top;\">" +
                    "배송상태" +
                    "</td><td style=\"padding:11px 0 11px 12px; border-bottom:1px solid #f5f5f5; color:#000; font-weight:bold;\">");
            msg.append("배송 완료");
            msg.append("</td></tr>");
            msg.append("</tbody></table>");

            msg.append("주문하신 상품은 잘 받으셨나요? 상품이 고객님 마음에 들었으면 좋겠습니다.<br /> 마음에 드셨다면 " +
                    "<a href=\"http://localhost:3000/mypage/reviews\" style=\"color:#222;\" target=\"_blank\" rel=\"noreferrer noopener\">리뷰작성</a>" +
                    "과 함께 구매확정 부탁드려요! <br/><br/><br/>");
        }
        msg.append("<p>본 메일은 발신전용 메일이므로, 회신을 통한 문의는 처리되지 않습니다.</p>" +
                "<p>문의사항은 <b>고객센터(1588–3820)</b>를 이용해 주세요.</p><br />"+
                "<p>Copyright ⓒ MailKit Corp. All Rights Reserved.</p>");
        mailEntity.setTitle(title.toString());
        mailEntity.setAddress(email);
        mailEntity.setMessage(msg.toString());
        return mailEntity;
    }

    public void sendMail(MailEntity mail) throws MessagingException {
//        // 1. 단순 텍스트 형태 이메일 발송
//        SimpleMailMessage message = new SimpleMailMessage();
//        // 제목, 수신자, 발신자, 내용
//        message.setSubject(mail.getTitle());
//        message.setTo(mail.getAddress());
//        message.setFrom("Mailkit<master@mailkit.com>"); // from 값을 설정하지 않으면 application.yml의 username값이 설정됩니다.
//        message.setText(mail.getMessage());
        // 2. html 코드 삽입 및 이미지, 데이터 전송이 가능한 형태 이메일 발송
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        // 제목, 수신자, 발신자, 내용
        helper.setSubject(mail.getTitle());
        helper.setTo(mail.getAddress());
        helper.setFrom("MailKit <master@mailkit.com>");
        helper.setText(mail.getMessage(), true);
        // 매일 전송
        mailSender.send(message);
    }

}