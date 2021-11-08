package com.example.userservice.jpa;

import com.example.userservice.entity.PrfrEntity;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

public interface PrfrRepository extends CrudRepository<PrfrEntity, Long> {

    Iterable<PrfrEntity> findAllByUserId(String userId);
    PrfrEntity findByPrfrId(Long prfrId);
    Long countByUserId(String userId);

    @Transactional
    void deleteByUserIdAndPrfrId(String userId, Long prfrId);

    PrfrEntity findByUserIdAndPrfrId(String userId, Long prfrId);
}
