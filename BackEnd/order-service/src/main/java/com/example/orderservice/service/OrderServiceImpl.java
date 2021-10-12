package com.example.orderservice.service;

import com.example.orderservice.dto.OrderDto;
import com.example.orderservice.dto.OrderMgtDto;
import com.example.orderservice.entity.OrderEntity;
import com.example.orderservice.entity.OrderMgtEntity;
import com.example.orderservice.jpa.OrderMgtRepository;
import com.example.orderservice.jpa.OrderRepository;
import com.example.orderservice.vo.RequestDate;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class OrderServiceImpl implements OrderService{
    OrderRepository orderRepository;
    OrderMgtRepository orderMgtRepository;
    Environment env;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, OrderMgtRepository orderMgtRepository, Environment env) {
        this.orderRepository = orderRepository;
        this.orderMgtRepository = orderMgtRepository;
        this.env = env;
    }

    @Override
    @Transactional
    public OrderDto createOrder(OrderDto orderDetails, List<OrderMgtDto> orderMgtDtoList) throws Exception {
        /*orderDetails.setOrderId(UUID.randomUUID().toString());
        orderDetails.setTotalPrice(orderDetails.getQty() * orderDetails.getUnitPrice());*/
        //orderDetails.setInstanceId(env.getProperty("eureka.instance.instance-id"));
        orderDetails.setPayInfo(UUID.randomUUID().toString());
        //orderDetails.setStatus("1");
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        OrderEntity orderEntity = modelMapper.map(orderDetails, OrderEntity.class);

        orderRepository.save(orderEntity);

        Long orderId = orderEntity.getOrderId();

        List<OrderMgtEntity> orderMgtEntityList = new ArrayList<>();

        for(int i = 0; i < orderMgtDtoList.size(); i++){
            OrderMgtEntity orderMgtEntity = modelMapper.map(orderMgtDtoList.get(i), OrderMgtEntity.class);
            orderMgtEntity.setOrderId(orderId);
            orderMgtEntityList.add(orderMgtEntity);
        }

        orderMgtRepository.saveAll(orderMgtEntityList);

        OrderDto returnValue = modelMapper.map(orderEntity, OrderDto.class);

        return returnValue;
    }

    @Override
    @Transactional
    public OrderDto updateOrderStatus(Long orderId,  String status) {
        OrderEntity orderEntity = orderRepository.findByOrderId(orderId);
        orderEntity.setStatus(status);
        orderEntity.setModifiedAt(new Date());

        try {
            orderRepository.save(orderEntity);
            throw new IllegalArgumentException("0으로 나눌 수 없어요.");
        } catch(Exception ex){
            System.out.println(ex.getMessage());
        }

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        OrderDto returnValue = modelMapper.map(orderEntity, OrderDto.class);

        return returnValue;
    }

    @Override
    @Transactional
    public void deleteOrder(Long orderId) throws Exception {
        orderMgtRepository.deleteByOrderId(orderId);
        orderRepository.deleteByOrderId(orderId);
    }

    @Override
    public OrderDto getOrderByOrderId(Long orderId) {
        OrderEntity orderEntity = orderRepository.findByOrderId(orderId);
        OrderDto orderDto = new ModelMapper().map(orderEntity, OrderDto.class);

        return orderDto;
    }

    @Override
    public Iterable<OrderEntity> getOrdersByUserId(String userId) {
        return orderRepository.findAllByUserId(userId);
//        return orderRepository.findByUserId(userId);
    }

    @Override
    public Iterable<OrderEntity> getAllOrders() {
        Sort sort = sortByvDate();

        return orderRepository.findAll(sort);
    }

    @Override
    public Iterable<OrderEntity> getOrderAllBetween(RequestDate requestDate) {
        Sort sort = sortByvDate();

        // 주문번호 검색 데이터 유무로 JPA repo 분기
        if(requestDate.getSearchData() == null) {
            return orderRepository.findAllByCreatedAtBetween(requestDate.getStartDate(), requestDate.getEndDate(), sort);
        }

        // 검색 시작일 종료일이 같으면 = 처리
//        if((requestDate.getStartDate().compareTo(requestDate.getEndDate())) == 0){
//            orderList = orderRepository.findAllByCreatedAt(requestDate.getStartDate(), sort);
//            return orderList;
//        }

        return orderRepository.findAllByOrderIdAndCreatedAtBetween(requestDate.getSearchData(), requestDate.getStartDate(), requestDate.getEndDate(), sort);
    }

    private Sort sortByvDate() {
        return Sort.by(Sort.Direction.DESC, "createdAt");
    }
}
