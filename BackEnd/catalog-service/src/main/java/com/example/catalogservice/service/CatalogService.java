package com.example.catalogservice.service;

import com.example.catalogservice.dto.CatalogDto;
import com.example.catalogservice.dto.MyPackageDto;
import com.example.catalogservice.dto.PatalogDto;
import com.example.catalogservice.jpa.*;

import java.util.Optional;

public interface CatalogService {
    Iterable<CatalogEntity> getAllCatalogs();
    Iterable<PatalogEntity> getAllPatalogs();
    Iterable<MyPackageEntity> getAllMyPackage();
    CatalogEntity getCatalog(Long productId);
    PatalogEntity getPatalog(Long patalogsId);
    Iterable<MenuEntity> getAllMenus();
    Iterable<ChildrenEntity> getAllChildren();
    Iterable<PackageEntity> getAllPackage();
    CatalogDto createCatalog(CatalogDto catalog);
    MyPackageDto createMyPackage(MyPackageDto myPackageDto);
    PatalogDto createPatalog(PatalogDto patalog);
    MyPackageDto getMyPackageByPatalogId(MyPackageDto myPackageDto);
    Iterable<MyPackageEntity> getUserMyPackageByUserIdAll(String userId);
    void deleteMyPackage (MyPackageEntity myPackageEntity);
    void deleteCatalog(Long productId);
    void deleteMyPackage(Long patalogId);
    void updateCatalog(CatalogDto catalogDto);
    void updateStock(CatalogEntity catalogEntity);
    void updateMyPackage(MyPackageDto myPackageDto);




}
