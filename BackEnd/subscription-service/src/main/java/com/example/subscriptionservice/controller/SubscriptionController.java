package com.example.subscriptionservice.controller;

import com.example.subscriptionservice.entity.SubscriptionGradeEntity;
import com.example.subscriptionservice.service.SubscriptionService;
import com.example.subscriptionservice.vo.ResponseSubscriptionGrade;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/")
public class SubscriptionController {
    SubscriptionService subscriptionService;
    Environment env;

    @Autowired
    public SubscriptionController(SubscriptionService subscriptionService, Environment env) {
        this.subscriptionService = subscriptionService;
        this.env = env;
    }

    @ApiOperation(value = "구독서비스 상태체크", notes = "구독서비스 상태체크를 한다")
    @GetMapping("/health_check")
    public String status(HttpServletRequest request){
        return String.format("It's Working in User Service," +
                        "port(local.server.port)=%s, port(server.port)=%s," +
                        "token_secret=%s, token_expiration_time=%s," +
                        "gateway_ip=%s, kafka_url=%s",
                env.getProperty("local.server.port"), env.getProperty("server.port"),
                env.getProperty("token.secret"), env.getProperty("token.expiration_time"), env.getProperty("gateway.ip"), env.getProperty("kafka.url"));
    }

    @ApiOperation(value = "구독등급 조회", notes = "구독등급을 조회한다.")
    @GetMapping("/subscription/grade")
    public ResponseEntity<Iterable<ResponseSubscriptionGrade>> getSubscriptionGrade() {
        log.info("구독등급 조회 API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        Iterable<SubscriptionGradeEntity> subscriptionGradeList = subscriptionService.getAllSubscriptionGrade();
        List<ResponseSubscriptionGrade> responseSubscriptionGradeList = new ArrayList<>();

        subscriptionGradeList.forEach(v -> {
            responseSubscriptionGradeList.add(new ModelMapper().map(v, ResponseSubscriptionGrade.class));
        });

        log.info("구독등급 조회 API END");
        return ResponseEntity.status(HttpStatus.OK).body(responseSubscriptionGradeList);
    }
}
