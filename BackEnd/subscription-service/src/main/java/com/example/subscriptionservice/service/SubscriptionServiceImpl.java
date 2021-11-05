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
import com.example.subscriptionservice.vo.ResponseSubscription;
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
import java.util.*;
import java.util.stream.Collectors;

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
    public SubscriptionGradeDto getSubscriptionGrade(Integer subGradeId) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        SubscriptionGradeEntity subscriptionGradeEntity = subscriptionGradeRepository.findBySubGradeId(subGradeId);

        SubscriptionGradeDto subscriptionGradeDto = modelMapper.map(subscriptionGradeEntity, SubscriptionGradeDto.class);

        return subscriptionGradeDto;
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

        Iterable<SubscriptionShipsEntity> subscriptionShipsEntities = getSubShips(requestCancelSubscription.getUserId());

        for (SubscriptionShipsEntity subscriptionShipsEntity : subscriptionShipsEntities) {
            // 환불 가능한 상품준비중(1)인 배송건에 대해서만 배송취소(4) 처리
            if(subscriptionShipsEntity.getStatus() == '1') subscriptionShipsEntity.setStatus('4');
        }

        subscriptionShipsRepository.saveAll(subscriptionShipsEntities);
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
    public Iterable<SubscriptionDto> paymentSubscription() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        LocalDateTime startDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(0,0,0));
        LocalDateTime endDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23,59,59));

        Iterable<SubscriptionEntity> subscriptionEntityList = subscriptionRepository.findByStatusAndNextPaymentDateLessThanEqual('2', endDatetime);

        // 구독 등급 변경 체크 (change_sub_grade_id)
        subscriptionEntityList.forEach(v -> {
            if(v.getChangeSubGradeId() != null) {
                //responseSubscriptionGradeList.add(new ModelMapper().map(v, ResponseSubscriptionGrade.class));
                v.setSubGradeId(v.getChangeSubGradeId());
                v.setChangeSubGradeId(null);
            }

            v.setSubPkgId(null);
            // 결제 후 구독중(패키지확정전) 상태로 변경
            v.setStatus('1');

            // 다음 결제일 계산 및 설정
            LocalDateTime nextMonthDate = LocalDateTime.of(LocalDate.now().plusMonths(1), LocalTime.now());
            v.setLastPaymentDate(LocalDateTime.now());
            v.setNextPaymentDate(nextMonthDate);
        });

        List<SubscriptionEntity> subscriptionEntityList2 = subscriptionRepository.saveAll(subscriptionEntityList);

        List<SubscriptionDto> subscriptionDtoList = subscriptionEntityList2.stream().map(v -> modelMapper.map(v, SubscriptionDto.class)).collect(Collectors.toList());

        //SubscriptionDto returnValue = modelMapper.map(responseSubscriptionsList, SubscriptionDto.class);

        return subscriptionDtoList;
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


        subShipDto.setDueDate(subShipDto.getDueDate());

        for(int i = 0; i < 4; i++){
            SubscriptionShipsEntity subscriptionShipsEntity = modelMapper.map(subShipDto, SubscriptionShipsEntity.class);
            // 7일씩 더해서 배송예정일자를 수정
            LocalDate dueDate = subscriptionShipsEntity.getDueDate().plusDays(7*i);
            subscriptionShipsEntity.setDueDate(dueDate);
            subscriptionShipsEntityList.add(subscriptionShipsEntity);
        }

        Object obj = subscriptionShipsRepository.saveAll(subscriptionShipsEntityList);

        SubShipDto returnValue = modelMapper.map(obj, SubShipDto.class);

        return returnValue;
    }

    @Override
    public Iterable<SubscriptionShipsEntity> getAllSubShips() {
        return subscriptionShipsRepository.findAll();
    }

    @Override
    public Iterable<SubscriptionShipsEntity> getSubShips(String userId) {
        return subscriptionShipsRepository.findByUserId(userId);
    }

    @Override
    public void updateSubShip(Long shipId, String postcode, String address, String addressDetail, LocalDate dueDate, Character type) {
        Optional<SubscriptionShipsEntity> subscriptionEntity = subscriptionShipsRepository.findById(shipId);
        subscriptionEntity.get().setAddress(address);
        subscriptionEntity.get().setAddressDetail(addressDetail);
        subscriptionEntity.get().setPostcode(postcode);
        subscriptionEntity.get().setDueDate(dueDate);
        subscriptionEntity.get().setType(type);

        subscriptionShipsRepository.save(subscriptionEntity.get());
    }

    @Override
    public Long getRefundAmount(String userId) {
        return subscriptionShipsRepository.getRefundAmountByUserId(userId);
    }

    @Override
    public void updateRefundCancelShips(String userId) {
        
    }

    @Override
    public void confirmSubPkg(String userId, Long pkgId) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        SubscriptionDto subscriptionDto = getSubscription(userId);

        // 구독중 - 구독패키지 확정완료
        Character subscribingAndAfterConfirmedPkgStatus = '2';

        subscriptionDto.setStatus(subscribingAndAfterConfirmedPkgStatus);
        subscriptionDto.setSubPkgId(pkgId);

        SubscriptionEntity subscriptionEntity = modelMapper.map(subscriptionDto, SubscriptionEntity.class);

        subscriptionRepository.save(subscriptionEntity);
    }

    @Override
    public Long getRevenueMonthAgo() {
        // 오늘로부터 2달전~1달전 매출액 기간 설정
        LocalDate startDatetime = LocalDate.now().minusMonths(2);
        LocalDate endDatetime = LocalDate.now().minusMonths(1);

        Long revenueMonthAgo = subscriptionShipsRepository.getRevenueBetween(startDatetime, endDatetime);

        return revenueMonthAgo;
    }

    @Override
    public Long getRevenueMonth() {
        // 오늘로부터 1달전~오늘 매출액 기간 설정
        LocalDate startDatetime = LocalDate.now().minusMonths(1);
        LocalDate endDatetime = LocalDate.now();

        Long revenueMonth = subscriptionShipsRepository.getRevenueBetween(startDatetime, endDatetime);

        return revenueMonth;
    }

    @Override
    public Long getTotalRevenue() {
        Long totalRevenue = subscriptionShipsRepository.getTotalRevenue();

        return totalRevenue;
    }

    private Sort sortByAscSubGradeId() {
        return Sort.by(Sort.Direction.ASC, "subGradeId");
    }
}
