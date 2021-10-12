package com.example.orderservice.mq;

import com.example.orderservice.dto.OrderDto;
import com.example.orderservice.dto.OrderMgtDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;


@Service
@Slf4j
public class KafkaProducer {
    private KafkaTemplate<String, String> kafkaTemplate;


    public KafkaProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void send(String topic, List<OrderMgtDto> orderMgtDtoList){
        ObjectMapper mapper= new ObjectMapper();
        String jsonInString = "";

        for (OrderMgtDto orderMgtDto: orderMgtDtoList) {
            try {
                jsonInString = mapper.writeValueAsString(orderMgtDto);
            } catch (JsonProcessingException e) {
                log.info(e.getMessage());
            }

            kafkaTemplate.send(topic, jsonInString);
            log.info("Requested order was sent by kafka producer : " + jsonInString);
        }
    }
}
