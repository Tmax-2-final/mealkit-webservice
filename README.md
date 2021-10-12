# mini-module-project3
* **팀**: 2조
* **팀명**: One More Things
* **팀원**
    - **민웅기** [팀장]
        - 프로젝트 총괄
        - Catalog Service 담당
    - **오지웅**
        - Order Service 담당
    - **신혜원**
        - 디자인 총괄
        - User Service 담당
    - **김남곤**
        - User Service 담당

## 서비스 주제
* MSA 기반의 책 전자 상거래 서비스 구축

## 요구사항
- Spring Boot Swagger를 통한 API Doc 생성
- 사용자 등록/인증
- 사용자) 상품 조회, 상세보기, 장바구니, 구매하기, 결제하기, 주문 상품 조회, 각 목록의 페이징 처리
- 관리자) 사용자의 기능 + 상품 등록 + 주문 된 상품 상태 변경 + 결제 내역 확인
- Backend) Spring Boot + Spring Cloud + Kafka 사용 
- Frontend) React 사용

## 프로젝트 진행 과정
0. 조별 프로젝트
1. 요구사항 정의서 작성
2. 기능 명세서 작성
3. 사용자 시나리오 또는 유스케이스 작성
4. API 설계서 작성 
    - RESTful API
    - GET/POST/PUT/DELETE 구현 
        - 전체 조회, 개별 조회 (by ID, Date, Keyword)
5. 기능 구현
6. 간단한 UI 추가 
7. 모듈 프로젝트 마지막 날
    - 상품 DB(데이터) 제공 
    - 제공 된 상품 DB로 구현된 요소 변경 해야 함 (UI 제외)
    - 제공 된 상품 DB로 검색 기능 검증 
    - AWS로 Migrate 작업 (EC2 + RDS)
