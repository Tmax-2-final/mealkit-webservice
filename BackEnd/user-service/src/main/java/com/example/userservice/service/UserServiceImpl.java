package com.example.userservice.service;

import com.example.userservice.client.CatalogServiceClient;
import com.example.userservice.client.OrderServiceClient;
import com.example.userservice.dto.CartDto;
import com.example.userservice.dto.UserDto;
import com.example.userservice.entity.CartEntity;
import com.example.userservice.entity.CatalogEntity;
import com.example.userservice.entity.OrderEntity;
import com.example.userservice.entity.UserEntity;
import com.example.userservice.jpa.CartRepository;
import com.example.userservice.jpa.UserRepository;
import com.example.userservice.vo.RequestDate;
import com.example.userservice.vo.ResponseOrder;
import feign.FeignException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.circuitbreaker.CircuitBreaker;
import org.springframework.cloud.client.circuitbreaker.CircuitBreakerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Slf4j
@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final Environment env;
    private final RestTemplate restTemplate;

    // openFeign
    private final OrderServiceClient orderServiceClient;
    private final CatalogServiceClient catalogServiceClient;
    private final CircuitBreakerFactory circuitBreakerFactory;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                           CartRepository cartRepository,
                           BCryptPasswordEncoder bCryptPasswordEncoder,
                           Environment env,
                           RestTemplate restTemplate,
                           OrderServiceClient orderServiceClient,
                           CatalogServiceClient catalogServiceClient,
                           CircuitBreakerFactory circuitBreakerFactory) {
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.env = env;
        this.restTemplate = restTemplate;
        this.orderServiceClient = orderServiceClient;
        this.catalogServiceClient = catalogServiceClient;
        this.circuitBreakerFactory = circuitBreakerFactory;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByEmail(email);

        if(userEntity == null)
            throw new UsernameNotFoundException(email + ": not found");

        /* 권한 */
        Collection<GrantedAuthority> roles = new ArrayList<>();
        roles.add(new SimpleGrantedAuthority(userEntity.getRole()));

        // User in an UserDetails
        User user = new User(userEntity.getEmail(), userEntity.getEncryptedPwd(),
                true, true, true, true, roles);

        return user;
    }

    @Override
    public UserDto createUser(UserDto userDto) {
        userDto.setUserId(UUID.randomUUID().toString());
        /* 권한 부여 */
        if(userDto.getName().equals("admin")){
            userDto.setRole("ROLE_ADMIN");
        } else {
            userDto.setRole("ROLE_USER");
        }

        // requestUser -> userDto -> userEntity -> jpa -> h2 DB
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        UserEntity userEntity = mapper.map(userDto, UserEntity.class); // userDto -> userEntity 로 매핑

        userEntity.setEncryptedPwd(bCryptPasswordEncoder.encode(userDto.getPwd())); // 비밀번호 암호화

        userRepository.save(userEntity);

        UserDto userVo = mapper.map(userEntity, UserDto.class);

        return userVo;
    }

    @Override
    public UserDto getUserByUserId(String userId) {
        UserEntity userEntity = userRepository.findByUserId(userId);

        if(userEntity == null) throw new UsernameNotFoundException(("User Not Found"));

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        UserDto userDto = mapper.map(userEntity, UserDto.class);

        /* order-service 에서 주문 내역 조회
        1) restTemplate 방식 이용
        */
//        List<ResponseOrder> ordersList = new ArrayList<>();
//        String orderUrl = String.format(env.getProperty("order-service.url"), userId);
//        ResponseEntity<List<ResponseOrder>> responseOrderList = restTemplate.exchange(orderUrl, HttpMethod.GET, null,
//                new ParameterizedTypeReference<List<ResponseOrder>>() {
//                });
//        ordersList = responseOrderList.getBody();
        /*
        * 2) Open Feign 방식
        */
        Iterable<OrderEntity> ordersList = null;
//        try {
//            ordersList = orderServiceClient.getOrder(userId);
//        } catch (FeignException e) {
//            log.error(e.getMessage());
//        }
        /* Circuit Breaker */
        log.info("Before call order-service");
        CircuitBreaker circuitBreaker = circuitBreakerFactory.create("my-circuitbreaker");
        ordersList = circuitBreaker.run(() -> orderServiceClient.getOrder(userId),
                throwable -> new ArrayList<>());
        log.info("After call order-service");

        userDto.setOrders(ordersList);

        return userDto;
    }

    @Override
    public UserDto getUserDetailsByEmail(String email) {
        UserEntity userEntity = userRepository.findByEmail(email);
        if(userEntity == null)
            throw new UsernameNotFoundException(email);

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        UserDto userDto = mapper.map(userEntity, UserDto.class);

        return userDto;
    }

    @Override
    public UserDto getUserByUserEmailAndName(String email, String username) {
        UserEntity userEntity = userRepository.findByEmailAndName(email, username);
        if(userEntity == null)
            throw new UsernameNotFoundException(email);

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        UserDto userDto = mapper.map(userEntity, UserDto.class);

        return userDto;
    }

    @Override
    public Iterable<UserEntity> getUserByAll() {
        return userRepository.findAll();
    }

    @Override
    public String updateUserPassword(UserDto userDto) {
        String randomPwd = UUID.randomUUID().toString().substring(0, 10);
        userDto.setPwd(randomPwd);

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        UserEntity userEntity = mapper.map(userDto, UserEntity.class); // userDto -> userEntity 로 매핑

        userEntity.setEncryptedPwd(bCryptPasswordEncoder.encode(userDto.getPwd())); // 비밀번호 암호화

        userRepository.save(userEntity);

        return randomPwd;
    }

    @Override
    public CartDto createCart(CartDto cartDto) {
        // 1. cartDto -> cartEntity -> jpa -> mariadb
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        CartEntity cartEntity = mapper.map(cartDto, CartEntity.class); // userDto -> userEntity 로 매핑
        // 2. repository save
        cartRepository.save(cartEntity);
        // 3. result entity -> dto
        CartDto resultCartDto = mapper.map(cartEntity, CartDto.class);

        return resultCartDto;
    }

    @Override
    public Iterable<CartEntity> getUserCartsByUserIdAll(String userId) {

        Iterable<CartEntity> result = cartRepository.findAllByUserId(userId);


        CatalogEntity catalogEntity = null;
        try {
            for(CartEntity cartEntity :  result){
                Long productId = cartEntity.getProductId();
                catalogEntity = catalogServiceClient.getCatalog(productId);
                String image = catalogEntity.getImage();
                String productName = catalogEntity.getName();
                cartEntity.setImage(image);
                cartEntity.setName(productName);
            }

        } catch (FeignException e) {
            log.error(e.getMessage());
        }

        return result;
    }

    @Override
    public void deleteCart(CartEntity cartEntity) {
        cartRepository.delete(cartEntity);
    }

    @Override
    public Optional<CartEntity> getCartByCartId(Long cartId) {
        return cartRepository.findById(cartId);
    }

    @Override
    public void updateUserCarts(CartDto cartDto) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        CartEntity cartEntity = mapper.map(cartDto, CartEntity.class);

        cartRepository.save(cartEntity);

    }

    @Override
    public void updateUsers(UserDto userDto) {

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        UserEntity userEntity = mapper.map(userDto, UserEntity.class);

        userEntity.setEncryptedPwd(bCryptPasswordEncoder.encode(userDto.getPwd())); // 비밀번호 암호화

        userRepository.save(userEntity);
    }

    @Override
    public Iterable<UserEntity> getUserAllBetween(RequestDate requestDate) {
        return userRepository.findAllByNameContainingAndCreatedAtBetween(requestDate.getSearchData(), requestDate.getStartDate(), requestDate.getEndDate());

    }

    @Override
    public CartDto getCartByProductId(CartDto cartDto) {

        Optional<CartEntity> cartEntity = cartRepository.findByProductIdAndUserId(cartDto.getProductId(), cartDto.getUserId());
        if(!cartEntity.isPresent()) {
            CartDto nullDto = new CartDto();
            nullDto.setFind(0);

            return nullDto;
        }

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        CartDto resultDto = mapper.map(cartEntity.get(), CartDto.class);
        resultDto.setFind(1);

        return resultDto;
    }

    @Override
    public void deleteUser(UserEntity userEntity) {
        userRepository.delete(userEntity);
    }

}
