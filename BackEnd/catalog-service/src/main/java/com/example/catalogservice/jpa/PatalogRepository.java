package com.example.catalogservice.jpa;

import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatalogRepository extends CrudRepository<PatalogEntity, Long> {
    PatalogEntity findByPatalogId(Long patalogId);
//    PatalogEntity findTopByPatalogId(Sort sort);
    PatalogEntity findFirstByOrderByPatalogIdDesc();
}