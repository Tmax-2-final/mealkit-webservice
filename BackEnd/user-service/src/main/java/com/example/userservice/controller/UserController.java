package com.example.userservice.controller;

import com.example.userservice.dto.CartDto;
import com.example.userservice.dto.UserDto;
import com.example.userservice.entity.CartEntity;
import com.example.userservice.entity.UserEntity;
import com.example.userservice.service.UserService;
import com.example.userservice.vo.*;
import io.swagger.annotations.ApiOperation;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/")
public class UserController {

    private final Environment env;
    private final UserService userService;

    @Autowired
    public UserController(Environment env, UserService userService) {
        this.env = env;
        this.userService = userService;
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

    /* 전체 사용자 목록 조회 */
    @ApiOperation(value = "사용자 목록 조회", notes="관리자의 사용자 전체 목록 조회")
    @GetMapping("/users")
    public ResponseEntity<List<ResponseUser>> getUsers(HttpServletRequest request) {
        // 헤더에 어떤 정보가 있는지
        Enumeration<String> em = request.getHeaderNames();
        request.getHeader("token"); // 헤더에 포함된 토큰을 가져옴

        Iterable<UserEntity> usersList = userService.getUserByAll();
        List<ResponseUser> responseUsersList = new ArrayList<>();

        // 람다 표현식; list 내에 있는 데이터를 v라고 두고, 이 v에 대한 어떤 액션을 하겠다는 '->'
        // list 안의 데이터 요소를 mapper 를 활용해 responseUser 형태로 바꿔서 결과값을 반환할 list 에 저장
        usersList.forEach(v -> {
            responseUsersList.add(new ModelMapper().map(v, ResponseUser.class));
        });

        return ResponseEntity.status(HttpStatus.OK).body(responseUsersList);
    }


    /* 사용자 상세 보기 (with 주문 목록) */
    @ApiOperation(value = "사용자별 주문 조회", notes="사용자의 주문목록 상세 조회")
    @GetMapping("/users/{userId}")
    public ResponseEntity<ResponseUser> getUser(@PathVariable("userId") String userId) {
        UserDto userDto = userService.getUserByUserId(userId);

        ResponseUser responseUser = new ModelMapper().map(userDto, ResponseUser.class);

        return ResponseEntity.status(HttpStatus.OK).body(responseUser);
    }

    /* 사용자 삭제 하기 : 관리자 페이지에서 해당 회원 삭제한다. */
    @ApiOperation(value = "사용자 삭제", notes="관리자 페이지에서의 회원 삭제")
    @DeleteMapping("/{userId}/users")
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


    /* 사용자 비밀번호 찾기 */
    @ApiOperation(value = "비밀번호 찾기", notes="사용자의 비밀번호 찾기")
    @PutMapping("/find/pw")
    public ResponseEntity<Map<String, String>> findPassword(@RequestBody @Valid RequestFindPwUser requestFindPwUser) {
        // 1. 이름, 이메일 정보 활용해 아이디 정보 가져오기
        UserDto userDto = userService.getUserByUserEmailAndName(requestFindPwUser.getEmail(), requestFindPwUser.getName());
        // 2. 임시 비밀번호로 변경(업데이트) 하기
        String password = userService.updateUserPassword(userDto);
        // 3. 임시 비밀번호 return 해주기
        Map<String, String> resultSet = new HashMap<>();
        resultSet.put("password", password);
        return ResponseEntity.status(HttpStatus.OK).body(resultSet);
    }

    /* 카트 등록하기 */
    @ApiOperation(value = "카트 등록", notes="카트 등록")
    @PostMapping("/{userId}/carts")
    public ResponseEntity<ResponseCart> createCart(@RequestBody @Valid RequestCart requestCart, @PathVariable("userId") String userId) {
        // 1. requestCart + userId => cartDto
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        CartDto cartDto = mapper.map(requestCart, CartDto.class); // userDto -> userEntity 로 매핑
        cartDto.setUserId(userId);

        // 등록된 카트가 있는지 조회하기
        CartDto existCartDto = userService.getCartByProductId(cartDto);

        // 있으면 수량만 변경한다.
        if(existCartDto.getFind() == 1) { // 0은 없음 1은 있음
            // 기존 수량 + 새로 들어오는 수량
            existCartDto.setQty(cartDto.getQty() + existCartDto.getQty());
            userService.updateUserCarts(existCartDto);

            return ResponseEntity.status(HttpStatus.OK).body(null);
        }

        // 2. service -> jpa -> mariadb 저장 = 카트 등록 서비스
        userService.createCart(cartDto);
        // 3. responseCart 로 지정
        ResponseCart responseCart = mapper.map(cartDto, ResponseCart.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseCart);
    }

    /* 유저가 담은 카트 조회하기 */
    @ApiOperation(value = "카트 조회", notes="유저가 카드에 담은 상품 조회")
    @GetMapping("/{userId}/carts")
    public ResponseEntity<List<ResponseCart>> getUserCarts(@PathVariable("userId") String userId) {
        Iterable<CartEntity> cartsList = userService.getUserCartsByUserIdAll(userId);
        List<ResponseCart> responseUserCartsList = new ArrayList<>();

        // 람다 표현식; list 내에 있는 데이터를 v라고 두고, 이 v에 대한 어떤 액션을 하겠다는 '->'
        // list 안의 데이터 요소를 mapper 를 활용해 responseUser 형태로 바꿔서 결과값을 반환할 list 에 저장
        cartsList.forEach(v -> {
            System.out.println(v.getCartId());
            responseUserCartsList.add(new ModelMapper().map(v, ResponseCart.class));
        });
        return ResponseEntity.status(HttpStatus.OK).body(responseUserCartsList);
    }

    /* 유저가 담은 카트 삭제하기 : 주문-결제 과정을 지나 카트에 담긴 상품이 삭제된다. */
    @ApiOperation(value = "카트 삭제", notes="결제 이후 카트 속 상품 삭제")
    @DeleteMapping("/{userId}/carts")
    public ResponseEntity<String> deleteUserCarts(@PathVariable("userId") String userId) {
        // 1. 회원이 담은 상품 리스트 조회
        Iterable<CartEntity> cartsList = userService.getUserCartsByUserIdAll(userId);
        // 2. 하나씩 삭제
        cartsList.forEach(v -> {
            try {
                userService.deleteCart(v);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        });

        return ResponseEntity.status(HttpStatus.OK).body("장바구니가 비었습니다.");
    }

    /* 유저가 담은 카트 삭제하기 : 유저가 자신이 담은 상품을 삭제한다. */
    @ApiOperation(value = "카트 삭제", notes="유저가 카트에 담은 상품 삭제")
    @DeleteMapping("/carts/{cartId}")
    public ResponseEntity<String> deleteCart(@PathVariable("cartId") Long cartId) {
        Optional<CartEntity> cart = userService.getCartByCartId(cartId);
        userService.deleteCart(cart.get());
        return ResponseEntity.status(HttpStatus.OK).body("해당 상품을 삭제했습니다.");
    }



    /* 유저의 장바구니 일괄 수정: 주문하기 클릭 시 수량에 대한 체크 */
    @ApiOperation(value = "장바구니 일괄 수정", notes="장바구니 일괄 수정")
    @PutMapping("{userId}/carts")
    public ResponseEntity<String> updateCart(@RequestBody List<CartDto> cartDtoList, @PathVariable String userId) {
        cartDtoList.forEach(cartDto -> {
            cartDto.setUserId(userId);
            userService.updateUserCarts(cartDto);
        });

        return ResponseEntity.status(HttpStatus.OK).body("장바구니를 수정했습니다.");
    }

    /* 유저의 정보 수정 */
    @ApiOperation(value = "유저 정보 수정", notes="유저 정보 수정")
    @PutMapping("{userId}/users")
    public ResponseEntity<String> updateUser(@RequestBody RequestUpdateUser requestUpdateUser, @PathVariable String userId) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        UserDto userDto = mapper.map(requestUpdateUser, UserDto.class);

        userDto.setUserId(userId);
        userDto.setModifiedAt(new Date());

        userService.updateUsers(userDto);

        return ResponseEntity.status(HttpStatus.OK).body("고객님의 정보를 수정했습니다.");
    }

    /* 날짜별 유저 검색 */
    @ApiOperation(value = "날짜별 유저 검색", notes="날짜별 유저 검색")
    @PostMapping("/users/date")
    public ResponseEntity<List<ResponseUser>> getUsersByDate(@RequestBody RequestDate requestDate) {
        Iterable<UserEntity> usersList = userService.getUserAllBetween(requestDate);
        List<ResponseUser> responseUsersList = new ArrayList<>();

        // 람다 표현식; list 내에 있는 데이터를 v라고 두고, 이 v에 대한 어떤 액션을 하겠다는 '->'
        // list 안의 데이터 요소를 mapper 를 활용해 responseUser 형태로 바꿔서 결과값을 반환할 list 에 저장
        usersList.forEach(v -> {
            responseUsersList.add(new ModelMapper().map(v, ResponseUser.class));
        });

        return ResponseEntity.status(HttpStatus.OK).body(responseUsersList);
    }


}