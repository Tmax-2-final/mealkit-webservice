package com.example.subscriptionservice.querydsl;

import com.example.subscriptionservice.entity.SubscriptionShipsEntity;
import com.example.subscriptionservice.entity.QSubscriptionShipsEntity;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.time.LocalDateTime;
import java.util.List;

public class ShipsRespositoryQueryDslImpl extends QuerydslRepositorySupport implements ShipsRespositoryQueryDsl{
    public ShipsRespositoryQueryDslImpl() {super(SubscriptionShipsEntity.class);}

    @Override
    public Page<SubscriptionShipsEntity> findAllBySearchKeyword(ShipsSearchParam shipsSearchParam, Pageable pageRequest) {
        JPQLQuery<SubscriptionShipsEntity> query = findAllBySearchKeywordQuery(shipsSearchParam, pageRequest);

        // 페이징 처리를 위한 fetchResults (조회 리스트 + 전체 개수를 포함한 QueryResults
        QueryResults<SubscriptionShipsEntity> queryResults = query.fetchResults();

        return new PageImpl<SubscriptionShipsEntity>(queryResults.getResults(), pageRequest, queryResults.getTotal());
    }

    @Override
    public List<SubscriptionShipsEntity> findAllBySearchKeyword(ShipsSearchParam shipsSearchParam) {
        JPQLQuery<SubscriptionShipsEntity> query = findAllBySearchKeywordQuery(shipsSearchParam, null);
        return query.fetchResults().getResults();
    }

    private JPQLQuery<SubscriptionShipsEntity> findAllBySearchKeywordQuery(ShipsSearchParam param, Pageable pageable) {
        QSubscriptionShipsEntity subscriptionShipsEntity = QSubscriptionShipsEntity.subscriptionShipsEntity;
        JPQLQuery<SubscriptionShipsEntity> query = from(subscriptionShipsEntity);
        BooleanBuilder builder = new BooleanBuilder();

        // startDate to endDate
        if(param.getStartDate() != null && param.getEndDate() != null) {
            builder.and(subscriptionShipsEntity.dueDate.between(param.getStartDate(),
                    param.getEndDate()));
        }

        // search 타입과 값에 따라 달라지는 동적 쿼리
        if(param.getSearchType().equals("all")) {
            builder.and(subscriptionShipsEntity.userId.contains(param.getSearchValue()));
        }
        else if(param.getSearchType().equals("userId")) {
            builder.and(subscriptionShipsEntity.userId.contains(param.getSearchValue()));
        }

        // 페이징
        if (pageable != null) {
            query.limit(pageable.getPageSize());
            query.offset(pageable.getOffset());
        }

        // order by
        OrderSpecifier<LocalDateTime> startDate = subscriptionShipsEntity.startDate.desc();

        return query.distinct().where(builder).orderBy(startDate);
    }
}
