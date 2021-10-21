package com.example.catalogservice.service;

import com.example.catalogservice.dto.CatalogDto;
import com.example.catalogservice.dto.PatalogDto;
import com.example.catalogservice.jpa.*;

public interface CatalogService {
    Iterable<CatalogEntity> getAllCatalogs();
    Iterable<PatalogEntity> getAllPatalogs();
    CatalogEntity getCatalog(Long productId);
    PatalogEntity getPatalog(Long patalogsId);
    Iterable<MenuEntity> getAllMenus();
    Iterable<ChildrenEntity> getAllChildren();
    Iterable<PackageEntity> getAllPackage();
    CatalogDto createCatalog(CatalogDto catalog);
    PatalogDto createPatalog(PatalogDto patalog);
    void deleteCatalog(Long productId);
    void updateCatalog(CatalogDto catalogDto);
    void updateStock(CatalogEntity catalogEntity);




}
