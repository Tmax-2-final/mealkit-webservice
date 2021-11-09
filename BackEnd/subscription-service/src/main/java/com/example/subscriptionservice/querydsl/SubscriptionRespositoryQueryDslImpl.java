package com.example.subscriptionservice.querydsl;

import com.example.subscriptionservice.entity.SubscriptionEntity;
import com.example.subscriptionservice.entity.QSubscriptionEntity;
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

public class SubscriptionRespositoryQueryDslImpl extends QuerydslRepositorySupport implements SubscriptionRespositoryQueryDsl{
    public SubscriptionRespositoryQueryDslImpl() {
        super(SubscriptionEntity.class);
    }

    @Override
    public Page<SubscriptionEntity> findAllBySearchKeyword(SubscriptionSearchParam subscriptionSearchParam, Pageable pageRequest) {
        JPQLQuery<SubscriptionEntity> query = findAllBySearchKeywordQuery(subscriptionSearchParam, pageRequest);

        // 페이징 처리를 위한 fetchResults (조회 리스트 + 전체 개수를 포함한 QueryResults
        QueryResults<SubscriptionEntity> queryResults = query.fetchResults();

        return new PageImpl<SubscriptionEntity>(queryResults.getResults(), pageRequest, queryResults.getTotal());
    }

    @Override
    public List<SubscriptionEntity> findAllBySearchKeyword(SubscriptionSearchParam subscriptionSearchParam) {
        JPQLQuery<SubscriptionEntity> query = findAllBySearchKeywordQuery(subscriptionSearchParam, null);
        return query.fetchResults().getResults();
    }

    private JPQLQuery<SubscriptionEntity> findAllBySearchKeywordQuery(SubscriptionSearchParam param, Pageable pageable) {
        QSubscriptionEntity subscriptionEntity = QSubscriptionEntity.subscriptionEntity;
        JPQLQuery<SubscriptionEntity> query = from(subscriptionEntity);
        BooleanBuilder builder = new BooleanBuilder();

        // startDate to endDate
        if(param.getStartDate() != null && param.getEndDate() != null) {
            builder.and(subscriptionEntity.startDate.between(param.getStartDate(),
                    param.getEndDate()));
        }

        // search 타입과 값에 따라 달라지는 동적 쿼리
        if(param.getSearchType().equals("all")) {
            builder.and(subscriptionEntity.userId.contains(param.getSearchValue()));
        }
        else if(param.getSearchType().equals("userId")) {
            builder.and(subscriptionEntity.userId.contains(param.getSearchValue()));
        }

        // 페이징
        if (pageable != null) {
            query.limit(pageable.getPageSize());
            query.offset(pageable.getOffset());
        }

        // order by
        OrderSpecifier<LocalDateTime> startDate = subscriptionEntity.startDate.desc();

        return query.distinct().where(builder).orderBy(startDate);
    }
}
