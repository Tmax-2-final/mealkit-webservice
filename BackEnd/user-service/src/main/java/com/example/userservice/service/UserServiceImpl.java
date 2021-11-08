package com.example.userservice.service;

import com.example.userservice.client.CatalogServiceClient;
import com.example.userservice.client.OrderServiceClient;

import com.example.userservice.dto.PrfrDto;
import com.example.userservice.dto.UserDto;
import com.example.userservice.entity.*;
import com.example.userservice.jpa.PrfrRepository;
import com.example.userservice.jpa.UserRepository;
import com.example.userservice.vo.RequestDate;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.circuitbreaker.CircuitBreaker;
import org.springframework.cloud.client.circuitbreaker.CircuitBreakerFactory;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PrfrRepository prfrRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final Environment env;
    private final RestTemplate restTemplate;


    // openFeign
    private final OrderServiceClient orderServiceClient;
    private final CatalogServiceClient catalogServiceClient;
    private final CircuitBreakerFactory circuitBreakerFactory;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                           PrfrRepository prfrRepository,
                           BCryptPasswordEncoder bCryptPasswordEncoder,
                           Environment env,
                           RestTemplate restTemplate,
                           OrderServiceClient orderServiceClient,
                           CatalogServiceClient catalogServiceClient,
                           CircuitBreakerFactory circuitBreakerFactory) {
        this.userRepository = userRepository;
        this.prfrRepository = prfrRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.env = env;
        this.restTemplate = restTemplate;
        this.orderServiceClient = orderServiceClient;
        this.catalogServiceClient = catalogServiceClient;
        this.circuitBreakerFactory = circuitBreakerFactory;

    }

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByUserId(userId);

        if(userEntity == null)
            throw new UsernameNotFoundException(userId + ": not found");

        /* 권한 */
        Collection<GrantedAuthority> roles = new ArrayList<>();
        roles.add(new SimpleGrantedAuthority(userEntity.getRole()));

        // User in an UserDetails
        User user = new User(userEntity.getUserId(), userEntity.getEncryptedPwd(),
                true, true, true, true, roles);

        return user;
    }

    @Override
    public UserDto createUser(UserDto userDto) {
        /* 권한 부여 */
        if(userDto.getUserId().contains("admin")){
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
    public boolean getUserIdForCreateUser(String userId) {
        boolean userExists = userRepository.existsById(userId);
        // 존재한다면
        if(userExists == true)
            return true;
        else
            return false;
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
//        Iterable<OrderEntity> ordersList = null;
//        try {
//            ordersList = orderServiceClient.getOrder(userId);
//        } catch (FeignException e) {
//            log.error(e.getMessage());
//        }
        /* Circuit Breaker */
//        log.info("Before call order-service");
//        CircuitBreaker circuitBreaker = circuitBreakerFactory.create("my-circuitbreaker");
//        ordersList = circuitBreaker.run(() -> orderServiceClient.getOrder(userId),
//                throwable -> new ArrayList<>());
//        log.info("After call order-service");
//
//        userDto.setOrders(ordersList);

        return userDto;
    }

    @Override
    public UserDto getUserDetailsByUserId(String userId) {
        UserEntity userEntity = userRepository.findByUserId(userId);
        if(userEntity == null)
            throw new UsernameNotFoundException(userId);

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
    public Page<UserEntity> getUserByAll(Pageable pageRequest) {
        return userRepository.findAll(pageRequest);
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
    public void updateUsers(UserDto userDto) {

        UserEntity originUser = userRepository.findByUserId(userDto.getUserId());

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        UserEntity updateUser = mapper.map(userDto, UserEntity.class);

        copyNonNullProperties(updateUser, originUser);

        userRepository.save(originUser);
    }

    @Override
    public Page<UserEntity> getUserAllBetween(RequestDate requestDate, Pageable pageRequest) {
        return userRepository.findAllByNameContainingAndCreatedAtBetween(requestDate.getSearchData(), requestDate.getStartDate(), requestDate.getEndDate(), pageRequest);

    }

    @Override
    public void deleteUser(UserEntity userEntity) {
        userRepository.delete(userEntity);
    }

    @Override
    public String getUserEmailByUserId(String userId) {
        return userRepository.findEmailByUserId(userId);
    }

    @Override
    public String getUserOauthByUserId(String userId) {
        return userRepository.findOauthByUserId(userId);
    }

    @Override
    public Long getNewUserCount() {
        Date startDate = Timestamp.valueOf(LocalDate.now().atStartOfDay());
        Date endDate = Timestamp.valueOf(LocalDate.now().plusDays(1L).atStartOfDay());
        log.info("현재 시간: " + startDate);
        log.info("내일 시간: " + endDate);
        return userRepository.countByCreatedAtBetween(startDate, endDate);
    }

    @Override
    public Long getTotalUserCount() {
        return userRepository.count();
    }

    /* 객체의 내부 데이터 중 null 값이 있는지 없는지 확인 */
    public static void copyNonNullProperties(Object src, Object target) {
        BeanUtils.copyProperties(src, target, getNullPropertyNames(src));
    }

    public static String[] getNullPropertyNames (Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<String>();
        for (java.beans.PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }

    public PrfrDto createPrfr(PrfrDto prfrDto) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        PrfrEntity prfrEntity = mapper.map(prfrDto, PrfrEntity.class);

        prfrRepository.save(prfrEntity);

        return prfrDto;
    }

    @Override
    public Iterable<PrfrEntity> getAllPrfrs(){
        return prfrRepository.findAll();
    }

    @Override
    public Iterable<PrfrEntity> getPrfrsByUserId(String userId) {
        return prfrRepository.findAllByUserId(userId);
    }

    @Override
    public void deletePrfr(String userId ,Long prfrId) {
        prfrRepository.deleteByUserIdAndPrfrId(userId, prfrId);
    }

    @Override
    public void updatePrfr(PrfrDto prfrDto, String userId, Long prfrId) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        PrfrEntity prfrEntity = prfrRepository.findByUserIdAndPrfrId(userId, prfrId);

        prfrEntity.setTheme(prfrDto.getTheme());
        prfrEntity.setFlavor(prfrDto.getFlavor());
        prfrEntity.setCookingtime(prfrDto.getCookingtime());

        prfrRepository.save(prfrEntity);
    }

    @Override
    public boolean getUserPrfrDone(String userId) { // 0: 선호도 안함 false, 1: 선호도 함 true
        Long userPrfr = prfrRepository.countByUserId(userId);
        if(userPrfr == 0) {
            return false;
        }
        return true;
    }
}
