package com.example.catalogservice.service;

import com.example.catalogservice.dto.CatalogDto;
import com.example.catalogservice.jpa.CatalogEntity;
import com.example.catalogservice.jpa.ChildrenEntity;
import com.example.catalogservice.jpa.MenuEntity;

public interface CatalogService {
    Iterable<CatalogEntity> getAllCatalogs();
    CatalogEntity getCatalog(Long productId);
    Iterable<MenuEntity> getAllMenus();
    Iterable<ChildrenEntity> getAllChildren();
    CatalogDto createCatalog(CatalogDto catalog);
    void deleteCatalog(Long productId);
    void updateCatalog(CatalogDto catalogDto);
    void updateStock(CatalogEntity catalogEntity);




}
