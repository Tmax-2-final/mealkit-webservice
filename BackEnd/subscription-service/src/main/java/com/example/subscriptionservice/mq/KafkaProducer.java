package com.example.subscriptionservice.mq;

import com.example.subscriptionservice.dto.SubscriptionDto;
import com.example.subscriptionservice.vo.RequestCatalog;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;


@Service
@Slf4j
public class KafkaProducer {
    private KafkaTemplate<String, String> kafkaTemplate;


    public KafkaProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void send(String topic, Iterable<RequestCatalog> catalogList){
        ObjectMapper mapper= new ObjectMapper();
        String jsonInString = "";

        for (RequestCatalog requestCatalog: catalogList) {
            try {
                jsonInString = mapper.writeValueAsString(requestCatalog);
            } catch (JsonProcessingException e) {
                log.info(e.getMessage());
            }

            kafkaTemplate.send(topic, jsonInString);
            log.info("Requested catalog was sent by kafka producer : " + jsonInString);
        }
    }

    public void send(String topic, SubscriptionDto subDto){
        String jsonInString = "";

        try {
            jsonInString = new ObjectMapper().registerModule(new JavaTimeModule()).writeValueAsString(subDto);
        } catch (JsonProcessingException e) {
            log.info(e.getMessage());
        }

        kafkaTemplate.send(topic, jsonInString);
        log.info("Requested subscription was sent by kafka producer : " + jsonInString);

    }
}
