package com.example.subscriptionservice.jpa;

import com.example.subscriptionservice.entity.SubscriptionGradeEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

public interface SubscriptionGradeRepository extends CrudRepository<SubscriptionGradeEntity, Long> {
    Iterable<SubscriptionGradeEntity> findAll(Sort sort);

    SubscriptionGradeEntity findBySubGradeId(int subGradeId);
}
