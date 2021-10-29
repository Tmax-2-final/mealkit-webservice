package com.example.subscriptionservice.service;

import com.example.subscriptionservice.dto.SubscriptionDto;
import com.example.subscriptionservice.dto.SubscriptionGradeDto;
import com.example.subscriptionservice.entity.SubscriptionEntity;
import com.example.subscriptionservice.entity.SubscriptionGradeEntity;
import com.example.subscriptionservice.jpa.SubscriptionGradeRepository;
import com.example.subscriptionservice.jpa.SubscriptionRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Calendar;
import java.util.Date;

@Service
@Slf4j
public class SubscriptionServiceImpl implements SubscriptionService {
    SubscriptionRepository subscriptionRepository;
    SubscriptionGradeRepository subscriptionGradeRepository;
    Environment env;

    @Autowired
    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository, SubscriptionGradeRepository subscriptionGradeRepository, Environment env) {
        this.subscriptionRepository = subscriptionRepository;
        this.subscriptionGradeRepository = subscriptionGradeRepository;
        this.env = env;
    }

    @Override
    public Iterable<SubscriptionGradeEntity> getAllSubscriptionGrade() {
        return subscriptionGradeRepository.findAll(sortByAscSubGradeId());
    }

    @Override
    public SubscriptionGradeEntity getSubscriptionGrade(int subGradeId) {
        return subscriptionGradeRepository.findBySubGradeId(subGradeId);
    }

    @Transactional
    @Override
    public SubscriptionDto createSubscription(SubscriptionDto subscriptionDto) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        // 다음 결제일 계산 및 설정
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MONTH, 1);

        LocalDateTime nextMonthDate = LocalDateTime.of(LocalDate.now().plusMonths(1), LocalTime.now());

        subscriptionDto.setNextPaymentDate(nextMonthDate);

        SubscriptionEntity subscriptionEntity = modelMapper.map(subscriptionDto, SubscriptionEntity.class);

        Object obj = subscriptionRepository.save(subscriptionEntity);

        SubscriptionDto returnValue = modelMapper.map(obj, SubscriptionDto.class);

        return returnValue;
    }

    @Transactional
    @Override
    public void updateSubscription(SubscriptionDto subscriptionDto) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        SubscriptionEntity updatedSubscriptionEntity = modelMapper.map(subscriptionDto, SubscriptionEntity.class);

        subscriptionRepository.save(updatedSubscriptionEntity);
    }

    @Transactional
    @Override
    public void cancelSubscription(SubscriptionDto subscriptionDto) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        SubscriptionEntity cancelSubscriptionEntity = modelMapper.map(subscriptionDto, SubscriptionEntity.class);
        // 1: 구독중 , 2: 구독취소
        cancelSubscriptionEntity.setStatus('2');
        cancelSubscriptionEntity.setEndDate(LocalDateTime.now());

        subscriptionRepository.save(cancelSubscriptionEntity);
    }

    @Override
    public SubscriptionDto getSubscription(String userId) {

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        SubscriptionEntity subscriptionEntity = subscriptionRepository.findByUserId(userId);

        SubscriptionGradeDto subscriptionGradeDto = modelMapper.map(subscriptionEntity.getSubscriptionGradeEntity(), SubscriptionGradeDto.class);

        SubscriptionDto returnValue = modelMapper.map(subscriptionEntity, SubscriptionDto.class);
        returnValue.setSubscriptionGradeDto(subscriptionGradeDto);

        return returnValue;
    }

    @Override
    public void paymentSubscription() {
        LocalDateTime startDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(0,0,0));
        LocalDateTime endDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23,59,59));

        Iterable<SubscriptionEntity> subscriptionEntityList = subscriptionRepository.findByNextPaymentDateBetween(startDatetime, endDatetime);

        // 구독 등급 변경 체크 (change_sub_grade_id)
        subscriptionEntityList.forEach(v -> {
            if(v.getChangeSubGradeId() != null){
                //responseSubscriptionGradeList.add(new ModelMapper().map(v, ResponseSubscriptionGrade.class));
                v.setSubGradeId(v.getChangeSubGradeId());
                v.setChangeSubGradeId(null);

                // 다음 결제일 계산 및 설정
                LocalDateTime nextMonthDate = LocalDateTime.of(LocalDate.now().plusMonths(1), LocalTime.now());
                v.setLastPaymentDate(LocalDateTime.now());
                v.setNextPaymentDate(nextMonthDate);
            }
        });
        subscriptionRepository.saveAll(subscriptionEntityList);
    }

    @Override
    public long existSubscription(String userId) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        // 1이면 존재, 0이면 존재 x
        Long existSubscription = subscriptionRepository.countByuserId(userId);

        return existSubscription;
    }


    private Sort sortByAscSubGradeId() {
        return Sort.by(Sort.Direction.ASC, "subGradeId");
    }
}
