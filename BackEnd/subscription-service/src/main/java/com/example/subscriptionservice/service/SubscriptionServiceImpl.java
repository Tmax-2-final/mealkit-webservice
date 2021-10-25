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
        subscriptionDto.setNextPaymentDate(cal.getTime());

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
        cancelSubscriptionEntity.setEndDate(new Date());

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


    private Sort sortByAscSubGradeId() {
        return Sort.by(Sort.Direction.ASC, "subGradeId");
    }
}
