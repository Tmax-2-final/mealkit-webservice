package com.example.userservice.mq;

import com.example.userservice.entity.UserEntity;
import com.example.userservice.jpa.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class KafkaConsumer {

    private final UserRepository userRepository;

    @Autowired
    public KafkaConsumer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    @KafkaListener(topics = "subscription-topic")
    public void updateSubsribeOrNot(String kafkaMessage) {
        log.info("회원의 구독 정보를 불러옵니다: " + kafkaMessage);

        Map<Object, Object> map = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            map = mapper.readValue(kafkaMessage, new TypeReference<Map<Object, Object>>() {
            });
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        // 회원 구독 여부 업데이트
        UserEntity user = userRepository.findByUserId(map.get("userId").toString());
        log.info(user.getSubscribeYn().toString());
        if (user != null) {
            String updateSubscribeStatus = map.get("status").toString();
            // 1이면 1 3이면 0
            if(updateSubscribeStatus.equals("1"))
                user.setSubscribeYn(1); // 구독 가입했다
            else if(updateSubscribeStatus.equals("3"))
                user.setSubscribeYn(0); // 구독 취소했다

            userRepository.save(user);
        }
    }
}
