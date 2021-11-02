package com.example.subscriptionservice.service;

import com.example.subscriptionservice.dto.SubShipDto;
import com.example.subscriptionservice.dto.SubscriptionDto;
import com.example.subscriptionservice.dto.SubscriptionGradeDto;
import com.example.subscriptionservice.entity.SubscriptionEntity;
import com.example.subscriptionservice.entity.SubscriptionGradeEntity;
import com.example.subscriptionservice.entity.SubscriptionShipsEntity;
import com.example.subscriptionservice.jpa.SubscriptionGradeRepository;
import com.example.subscriptionservice.jpa.SubscriptionRepository;
import com.example.subscriptionservice.jpa.SubscriptionShipsRepository;
import com.example.subscriptionservice.vo.RequestCancelSubscription;
import com.example.subscriptionservice.vo.RequestUpdateSubscription;
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
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class SubscriptionServiceImpl implements SubscriptionService {
    SubscriptionRepository subscriptionRepository;
    SubscriptionGradeRepository subscriptionGradeRepository;
    SubscriptionShipsRepository subscriptionShipsRepository;
    Environment env;

    @Autowired
    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository,
                                   SubscriptionGradeRepository subscriptionGradeRepository,
                                   SubscriptionShipsRepository subscriptionShipsRepository,
                                   Environment env) {
        this.subscriptionRepository = subscriptionRepository;
        this.subscriptionGradeRepository = subscriptionGradeRepository;
        this.subscriptionShipsRepository = subscriptionShipsRepository;
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
        LocalDateTime nextMonthDate = LocalDateTime.of(LocalDate.now().plusMonths(1), LocalTime.now());

        subscriptionDto.setNextPaymentDate(nextMonthDate);

        SubscriptionEntity subscriptionEntity = modelMapper.map(subscriptionDto, SubscriptionEntity.class);

        Object obj = subscriptionRepository.save(subscriptionEntity);

        SubscriptionDto returnValue = modelMapper.map(obj, SubscriptionDto.class);

        return returnValue;
    }

    @Override
    public void restartSubscription(RequestUpdateSubscription requestUpdateSubscription) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        Character subscribingAndBeforeConfirmedPkgStatus = '1';

        SubscriptionDto subscriptionDto = getSubscription(requestUpdateSubscription.getUserId());

        subscriptionDto.setSubGradeId(requestUpdateSubscription.getSubGradeId());
        subscriptionDto.setStatus(subscribingAndBeforeConfirmedPkgStatus);
        subscriptionDto.setStartDate(LocalDateTime.now());
        subscriptionDto.setEndDate(null);
        subscriptionDto.setCancelContent(null);
        subscriptionDto.setChangeSubGradeId(null);
        subscriptionDto.setSubPkgId(null);

        // 다음 결제일 계산 및 설정
        LocalDateTime nextMonthDate = LocalDateTime.of(LocalDate.now().plusMonths(1), LocalTime.now());

        subscriptionDto.setNextPaymentDate(nextMonthDate);
        subscriptionDto.setLastPaymentDate(LocalDateTime.now());

        SubscriptionEntity restartSubscriptionEntity = modelMapper.map(subscriptionDto, SubscriptionEntity.class);

        subscriptionRepository.save(restartSubscriptionEntity);
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
    public void cancelSubscription(RequestCancelSubscription requestCancelSubscription) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        Character cancelStatus = '3';

        // 요청 userId 로 구독정보 조회
        // 구독취소 사유(cancelContent), 구독취소 상태(status:3) 설정
        SubscriptionDto subscriptionDto = getSubscription(requestCancelSubscription.getUserId());
        subscriptionDto.setCancelContent(requestCancelSubscription.getCancelContent());
        subscriptionDto.setStatus(cancelStatus);

        SubscriptionEntity deleteSubscriptionEntity = modelMapper.map(subscriptionDto, SubscriptionEntity.class);

        subscriptionRepository.save(deleteSubscriptionEntity);
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
        Long existSubscription = subscriptionRepository.countByUserId(userId);

        return existSubscription;
    }

    @Transactional
    @Override
    public SubShipDto createSubShips(SubShipDto subShipDto) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);



        List<SubscriptionShipsEntity> subscriptionShipsEntityList = new ArrayList<>();

        for(int i = 0; i < 4; i++){
            SubscriptionShipsEntity subscriptionShipsEntity = modelMapper.map(subShipDto, SubscriptionShipsEntity.class);
            // 7일씩 더해서 배송예정일자를 수정
            LocalDateTime dueDate = subscriptionShipsEntity.getDueDate().plusDays(7*i);
            subscriptionShipsEntity.setDueDate(dueDate);
            subscriptionShipsEntityList.add(subscriptionShipsEntity);
        }

        Object obj = subscriptionShipsRepository.saveAll(subscriptionShipsEntityList);

        SubShipDto returnValue = modelMapper.map(obj, SubShipDto.class);

        return returnValue;
    }

    @Override
    public Long getRefundAmount(String userId) {
        return subscriptionShipsRepository.getRefundAmountByUserId(userId);
    }

    @Override
    public void updateRefundCancelShips(String userId) {
        
    }


    private Sort sortByAscSubGradeId() {
        return Sort.by(Sort.Direction.ASC, "subGradeId");
    }
}
