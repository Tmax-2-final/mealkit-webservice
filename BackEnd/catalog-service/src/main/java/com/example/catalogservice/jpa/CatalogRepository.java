package com.example.catalogservice.jpa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;

public interface CatalogRepository extends JpaRepository<CatalogEntity, Long> {
    CatalogEntity findByCatalogId(Long catalogId);
    Page<CatalogEntity> findByNameLike(String searchData, Pageable requestPage);

    Iterable<CatalogEntity> findByCategoryInOrFlavorInOrCookingtimeOrAge(String[] themes, String[] flavors, Integer cookingTime, Integer age);
}