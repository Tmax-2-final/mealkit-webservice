package com.example.catalogservice.jpa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatalogRepository extends JpaRepository<PatalogEntity, Long> {
    PatalogEntity findByPatalogId(Long patalogId);
//    PatalogEntity findTopByPatalogId(Sort sort);
    PatalogEntity findFirstByOrderByPatalogIdDesc();

    Page<PatalogEntity> findByNameContaining(String name, Pageable pageRequest);
}