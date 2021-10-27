package com.example.alertservice.querydsl;

import com.example.alertservice.entity.AlertsEntity;
import com.example.alertservice.entity.QAlertsEntity;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.Date;
import java.util.List;

public class AlertsRepositoryQueryDslImpl extends QuerydslRepositorySupport implements AlertsRepositoryQueryDsl{
    public AlertsRepositoryQueryDslImpl() {
        super(AlertsEntity.class);
    }

    @Override
    public Page<AlertsEntity> findAllBySearchKeyword(AlertsSearchParam alertsSearchParam, Pageable pageRequest) {
        JPQLQuery<AlertsEntity> query = findAllBySearchKeywordQuery(alertsSearchParam, pageRequest);

        // 페이징 처리를 위한 fetchResults (조회 리스트 + 전체 개수를 포함한 QueryResults
        QueryResults<AlertsEntity> queryResults = query.fetchResults();

        return new PageImpl<AlertsEntity>(queryResults.getResults(), pageRequest, queryResults.getTotal());
    }

    @Override
    public List<AlertsEntity> findAllBySearchKeyword(AlertsSearchParam alertsSearchParam) {

        JPQLQuery<AlertsEntity> query = findAllBySearchKeywordQuery(alertsSearchParam, null);
        return query.fetchResults().getResults();
    }

    private JPQLQuery<AlertsEntity> findAllBySearchKeywordQuery(AlertsSearchParam param, Pageable pageable) {
        QAlertsEntity alertsEntity = QAlertsEntity.alertsEntity;
        JPQLQuery<AlertsEntity> query = from(alertsEntity);
        BooleanBuilder builder = new BooleanBuilder();

        // startDate to endDate
        if(param.getStartDate() != null && param.getEndDate() != null) {
            builder.and(alertsEntity.createdAt.between(java.sql.Timestamp.valueOf(param.getStartDate()),
                                                        java.sql.Timestamp.valueOf(param.getEndDate())));
        }

        // search 타입과 값에 따라 달라지는 동적 쿼리
        if(param.getSearchType().equals("all")) {
            builder.and(alertsEntity.userId.contains(param.getSearchValue())
                    .or(alertsEntity.email.contains(param.getSearchValue())
                            .or(alertsEntity.title.contains(param.getSearchValue()))));
        }
        else if(param.getSearchType().equals("userId")) {
            builder.and(alertsEntity.userId.contains(param.getSearchValue()));
        }
        else if(param.getSearchType().equals("email")) {
            builder.and(alertsEntity.email.contains(param.getSearchValue()));
        }
        else if(param.getSearchType().equals("title")) {
            builder.and(alertsEntity.title.contains(param.getSearchValue()));
        }

        // 페이징
        if (pageable != null) {
            query.limit(pageable.getPageSize());
            query.offset(pageable.getOffset());
        }

        // order by
        OrderSpecifier<Date> createdAt = alertsEntity.createdAt.desc();

        return query.distinct().where(builder).orderBy(createdAt);
    }
}
