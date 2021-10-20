package com.example.catalogservice.jpa;

import org.springframework.data.repository.CrudRepository;

public interface PatalogRepository extends CrudRepository<PatalogEntity, Long> {
    PatalogEntity findByPatalogsId(Long patalogsId);
}