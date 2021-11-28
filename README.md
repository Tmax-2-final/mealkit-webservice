# 매일키트(MailKit)
* 밀키트 정기 구독 서비스

## 개요
1인 가구가 늘어남과 코로나 19의 영향으로 집에서 끼니를 해결하는 사람들이 늘어났고, 정기적으로 밀키트(Meal kit)를 구매하는 소비자가 증가했다. 밀키트는 편리함뿐만 아니라 채식주의자 제품, 저칼로리 제품으로 구성되어 있어 건강한 식단을 찾는 소비자, 체중 감량을 원하는 소비자들에게도 큰 인기를 끌고 있다. 이에 밀키트를 구매하고 정기 구독하는 온라인 쇼핑몰을 구축하고자 한다.

## 팀
- 팀명: One More Thing
- 팀장: 민웅기
    - 상품 및 정기 구독 패키지 서비스 담당
- 팀원: 오지웅
    - 정기 구독 결제 및 배송 서비스 담당
- 팀원: 신혜원
    - 화면 레이아웃 표준 검토 및 리뷰 서비스 담당
- 팀원: 김남곤
    - 회원 관리 및 알림 서비스 담당

## 시스템 전체 아키텍쳐
![image](https://user-images.githubusercontent.com/32921225/143766905-95456e05-41ee-4790-9642-ad57340e7c78.png)


## 서비스 API
![image](https://user-images.githubusercontent.com/32921225/143767083-9ef1ce70-196c-432f-99d0-81ea70d05709.png)


## 문서관리
[작업 목록](https://www.notion.so/89ce9e72a6914ccfafd1e3c552f7cdbe)
- 진행 상황을 작성하는 곳입니다.

[일정 관리](https://www.notion.so/8e915e8d22dc4c5fa8ea8bbad5aec9a1)
- 프로젝트 전체 일정을 관리하는 WBS 링크페이지입니다.

[문서](https://www.notion.so/da22ed50af8a46c7904e32ad7e5249ba)
- 프로젝트에 필요한 모든 문서를 포함한 곳입니다.

[회의록](https://www.notion.so/419f53ee5d344b8e937d1f4c29019ddd)
- 일일, 주간 회의를 작성하는 곳입니다.

[기타 작업](https://www.notion.so/7f79b14c00154d7bb6c3ccb69f7ff5a3)
- 기타적으로 작업했거나 조사한 자료들을 임시적으로 보관하는 곳입니다.

## 개선사항
1.  Architecture
    - Outer Architecture: Telemtery for Monitering, Logging etc..
    - Spring Cloud에 종속적인 MSA
2.  Development
    - Real Payment과의 연결: PG사 결제 모듈, 카카오페이, 네이버페이 등
    - 카카오 알림톡 채널
3.  CI/CD
    - Kubernetes 기반 Cloud Migration
