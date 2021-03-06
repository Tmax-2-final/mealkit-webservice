package com.example.userservice.controller;

import com.example.userservice.dto.PrfrDto;
import com.example.userservice.dto.UserDto;
import com.example.userservice.entity.PrfrEntity;
import com.example.userservice.entity.UserEntity;
import com.example.userservice.service.UserService;
import com.example.userservice.vo.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/")
public class UserController {

    private final Environment env;
    private final UserService userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserController(Environment env, UserService userService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.env = env;
        this.userService = userService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    @ApiOperation(value = "상태", notes="상태 조회")
    @GetMapping("/health_check")
    public String status(HttpServletRequest request) {

        return String.format("It`s Working in User Service, " +
                        "Port(local.server.port)=%s,  Port(server.port)=%s, " +
                        "token.secret=%s, token.expiration_time=%s, gateway.ip=%s" +
                        "카카오 토큰=%s" ,
                env.getProperty("local.server.port"), env.getProperty("server.port"),
                env.getProperty("token.secret"), env.getProperty("token.expiration_time"), env.getProperty("gateway.ip"),
                env.getProperty("kakao.oauth.client-id"));
    }

    @GetMapping("/welcome")
    public String welcome(HttpSession httpSession) {
        System.out.println(httpSession.getAttribute("role"));
        return env.getProperty("greeting.message");
    }
    @ApiOperation(value = "회원가입", notes="사용자 등록")
    @PostMapping("/users")
    public ResponseEntity<ResponseUser> createUser(@RequestBody @Valid RequestUser user) {

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        // requestUser -> userDto
        UserDto userDto = mapper.map(user, UserDto.class); // userDto -> userEntity 로 매핑
        userService.createUser(userDto);
        // userDto -> responseUser
        ResponseUser responseUser = mapper.map(userDto, ResponseUser.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseUser);
    }

    @ApiOperation(value = "아이디 중복검사", notes="아이디 중복검사")
    @GetMapping("/users/id/{userId}")
    public ResponseEntity<Map<String, Integer>> getUserIdForCreateUser(@PathVariable("userId") String userId) {
        boolean userIdCheck = userService.getUserIdForCreateUser(userId);
        Map<String, Integer> result = new HashMap<>();
        // 중복되는 아이디가 없다면
        if(userIdCheck == false) {
            result.put("result", 2);
        } else {
            result.put("result", 1);
        }
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    /* 사용자 비밀번호 찾기 */
    @ApiOperation(value = "비밀번호 찾기", notes="사용자의 비밀번호 찾기")
    @PutMapping("/find/pw")
    public ResponseEntity<Map<String, String>> findPassword(@RequestBody @Valid RequestFindPwUser requestFindPwUser) {
        // 1. 이름, 이메일 정보 활용해 아이디 정보 가져오기
        UserDto userDto = userService.getUserByUserEmailAndName(requestFindPwUser.getUserId(), requestFindPwUser.getName(), requestFindPwUser.getEmail());
        // 2. 임시 비밀번호로 변경(업데이트) 하기
        String password = userService.updateUserPassword(userDto);
        // 3. 임시 비밀번호 return 해주기
        Map<String, String> resultSet = new HashMap<>();
        resultSet.put("password", password);
        return ResponseEntity.status(HttpStatus.OK).body(resultSet);
    }

    /* 전체 사용자 목록 조회 */
    @ApiOperation(value = "사용자 목록 조회", notes="관리자의 사용자 전체 목록 조회")
    @GetMapping("/users")
    public ResponseEntity<Page<ResponseUser>> getAllUsers(@PageableDefault(size = 5, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageRequest) {

        Page<UserEntity> usersList = userService.getUserByAll(pageRequest);
        // 람다 표현식; list 내에 있는 데이터를 v라고 두고, 이 v에 대한 어떤 액션을 하겠다는 '->'
        // list 안의 데이터 요소를 mapper 를 활용해 responseUser 형태로 바꿔서 결과값을 반환할 list 에 저장
        Page<ResponseUser> responseUsersList = usersList.map(
                v -> new ModelMapper().map(v, ResponseUser.class)
        );

        return ResponseEntity.status(HttpStatus.OK).body(responseUsersList);
    }

    /* 사용자 상세 보기 (with 주문 목록) */
    @ApiOperation(value = "사용자 상세 조회", notes="사용자 상세 조회")
    @GetMapping("/users/{userId}")
    public ResponseEntity<ResponseUser> getUser(@PathVariable("userId") String userId) {
        UserDto userDto = userService.getUserByUserId(userId);

        ResponseUser responseUser = new ModelMapper().map(userDto, ResponseUser.class);

        return ResponseEntity.status(HttpStatus.OK).body(responseUser);
    }

    /* 사용자 삭제 하기 : 관리자 페이지에서 해당 회원 삭제한다. */
    @ApiOperation(value = "사용자 삭제", notes="관리자 페이지에서의 회원 삭제")
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") String userId) {
        // 회원을 가져온다.
        UserDto user = userService.getUserByUserId(userId);
        // Dto -> entity로 바꾼다.
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        UserEntity userEntity = mapper.map(user, UserEntity.class); // userDto -> userEntity 로 매핑

        userService.deleteUser(userEntity);
        return ResponseEntity.status(HttpStatus.OK).body("해당 회원을 삭제했습니다.");
    }

    /* 유저의 정보 수정 */
    @ApiOperation(value = "유저 정보 수정", notes="유저 정보 수정")
    @PutMapping("/users/{userId}")
    public ResponseEntity<String> updateUser(@RequestBody RequestUpdateUser requestUpdateUser, @PathVariable String userId) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        UserDto userDto = mapper.map(requestUpdateUser, UserDto.class);

        userDto.setUserId(userId);
        userDto.setModifiedAt(new Date());

        userService.updateUsers(userDto);

        return ResponseEntity.status(HttpStatus.OK).body("고객님의 정보를 수정했습니다.");
    }

    /* 특정 기간과 검색어가 포함된 모든 유저 검색 */
    @ApiOperation(value = "특정 기간동안 검색어가 포함된 모든 유저 검색", notes="날짜별 유저 검색")
    @PostMapping("/users/date")
    public ResponseEntity<Page<ResponseUser>> getUsersByDate(@RequestBody RequestDate requestDate,
                                                             @PageableDefault(size = 5, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageRequest) {
        Page<UserEntity> usersList = userService.getUserAllBetween(requestDate, pageRequest);
        Page<ResponseUser> responseUsersList = usersList.map(
                v -> new ModelMapper().map(v, ResponseUser.class)
        );

        return ResponseEntity.status(HttpStatus.OK).body(responseUsersList);
    }

    /* 유저 아이디로 유저 이메일 찾기 */
    @ApiOperation(value="유저 이메일 검색", notes="특정 유저 아이디로 유저 이메일 찾기")
    @GetMapping("/users/email/{userId}")
    public String getUserEmailByUserId(@PathVariable("userId") String userId) {
        String result = userService.getUserEmailByUserId(userId);
        return result;
    }

    /* 신규 가입 및 전체 가입 유저 수 조회 */
    @ApiOperation(value="유저 수 조회", notes="신규 가입 및 전체 가입 유저 수 조회하기")
    @GetMapping("/users/count")
    public ResponseEntity<ResponseUserCount> getUserCount() {
        Long newUser = userService.getNewUserCount();
        Long totalUser = userService.getTotalUserCount();

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseUserCount(newUser, totalUser));
    }

    @ApiOperation(value = "선호도 조사 등록", notes = "사용자의 선호도 조사 등록")
    @PostMapping("/users/preference")
    public ResponseEntity<ResponsePrfr> createPrfr(@RequestBody @Valid RequestPrfr prfr) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        PrfrDto prfrDto = mapper.map(prfr, PrfrDto.class);
        userService.createPrfr(prfrDto);
        ResponsePrfr responsePrfr = mapper.map(prfrDto, ResponsePrfr.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responsePrfr);
    }

    @ApiOperation(value = "선호도 조회", notes = "관리자의 선호도 전체 목록 조회")
    @GetMapping("/users/preference")
    public ResponseEntity<Iterable<PrfrEntity>> getPrfr(){
        Iterable<PrfrEntity> prfrList = userService.getAllPrfrs();
        return ResponseEntity.status(HttpStatus.OK).body(prfrList);
    }

    @ApiOperation(value = "특정 회원 선호도 조회", notes = "특정 회원의 선호도 모두 조회")
    @GetMapping("/users/preference/{userId}")
    public ResponseEntity<ResponsePrfr> getPrfr(@PathVariable("userId") String userId){
        PrfrEntity prfrEntity = userService.getPrfrsByUserId(userId);

        ResponsePrfr responsePrfr = new ModelMapper().map(prfrEntity, ResponsePrfr.class);

        return ResponseEntity.status(HttpStatus.OK).body(responsePrfr);
    }

    @ApiOperation(value = "선호도 삭제", notes = "해당 고객이 자신이 작성한 선호도 삭제")
    @DeleteMapping("/users/preference/{userId}/{prfrId}")
    public ResponseEntity<ResponsePrfr> deletePrfr(@PathVariable("userId") String userId,
                                                       @PathVariable("prfrId") Long prfrId){
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        try{
            userService.deletePrfr(userId, prfrId);
        } catch (Exception ex){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @ApiOperation(value = "선호도 수정", notes = "해당 고객이 자신이 작성한 선호도 수정")
    @PutMapping("/users/preference/{userId}/{prfrId}")
    public ResponseEntity<ResponsePrfr> updatePrfr(@RequestBody RequestPrfr requestPrfr,
                                                       @PathVariable("userId") String userId,
                                                       @PathVariable("prfrId") Long prfrId){

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        PrfrDto prfrDto = mapper.map(requestPrfr, PrfrDto.class);
        userService.updatePrfr(prfrDto, userId, prfrId);
        ResponsePrfr responsePrfr = mapper.map(prfrDto, ResponsePrfr.class);

        return ResponseEntity.status(HttpStatus.OK).body(responsePrfr);
    }

    @ApiOperation(value = "특정 회원이 선호도 조사를 마쳤는지 점검", notes = "0: 선호도 안함 false, 1: 선호도 함 true")
    @GetMapping("/users/{userId}/preference")
    public ResponseEntity<Map<String, Boolean>> getUserPrfrDone(@PathVariable("userId") String userId) { // 0: 선호도 안함 false, 1: 선호도 함 true
        Map<String, Boolean> result = new HashMap<>();
        Boolean data = userService.getUserPrfrDone(userId);
        result.put("result", data);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "관리자 로그인", notes = "관리자 계정 로그인 전용")
    @PostMapping("/admin/login")
    public ResponseEntity<String> adminLoginByRole(@RequestBody RequestLogin requestLogin) {
        // 디비 찾기
        UserDto user = userService.getUserByUserId(requestLogin.getUserId());
        // 아이디 존재 여부 파악
        if(user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("아이디를 찾을 수 없습니다");
        }
        // 관리자 아이디인지 존재 여부 파악
        if(!user.getUserId().equals(env.getProperty("admin.id"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("관리자 아이디가 아닙니다.");
        }
        // 관리자 권한 여부 파악
        if(!user.getRole().equals(env.getProperty("admin.role"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("관리자 권한이 아닙니다.");
        }
        // 관리자 비밀번호 파악
        if(!(bCryptPasswordEncoder.matches(requestLogin.getPassword(), user.getEncryptedPwd()))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("관리자 비밀번호가 아닙니다.");
        }

        // 관리자 로그인 성공 처리 //
        // 토근 생성
        String token = Jwts.builder()
                .setSubject(user.getUserId()) // 어떤 정보를 가지고 토큰을 만들 것인가 - userId
                .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(env.getProperty("token.expiration_time")))) // 토큰 만료 기간은 얼마인가. 현재 시간 + 토큰 시간
                .signWith(SignatureAlgorithm.HS512, env.getProperty("token.secret")) // 서명 - 암호화에 사용된 키 종류와 키 값
                .compact();
        // 헤더에 삽입
        HttpHeaders headers = new HttpHeaders();
        headers.set("token", token);
        headers.set("userId", user.getUserId());
        headers.set("role", user.getRole());
        // 리턴
        return ResponseEntity.status(HttpStatus.OK).headers(headers).body(null);
    }

}