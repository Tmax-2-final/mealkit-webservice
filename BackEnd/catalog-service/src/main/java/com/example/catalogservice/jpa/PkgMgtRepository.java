package com.example.catalogservice.jpa;

import org.springframework.data.repository.CrudRepository;

public interface PkgMgtRepository extends CrudRepository<PkgMgtEntity, Long> {
    Iterable<PkgMgtEntity> findByPatalogId(Long patalogId);
}