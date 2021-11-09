package com.example.catalogservice.service;

import com.example.catalogservice.dto.CatalogDto;
import com.example.catalogservice.dto.MyPackageDto;
import com.example.catalogservice.dto.PatalogDto;
import com.example.catalogservice.dto.PkgMgtDto;
import com.example.catalogservice.jpa.*;
import com.example.catalogservice.vo.RequestMyPackage;
import com.example.catalogservice.vo.ResponseMyPackage;
import com.example.catalogservice.vo.ResponsePatalog;
import com.example.catalogservice.vo.ResponsePkgMgt;

import java.util.List;
import java.util.Optional;

public interface CatalogService {
    Iterable<CatalogEntity> getAllCatalogs();
    Iterable<PatalogEntity> getAllPatalogs();
    Iterable<MyPackageEntity> getAllMyPackage();
    Iterable<MyPackageEntity> getUserMyPackage(String userId);
    Iterable<PkgMgtEntity> getPkgMgt(Long patalogId );
    CatalogEntity getCatalog(Long catalogId);
    PatalogEntity getPatalog(Long patalogId);
    PatalogEntity getPatalog();

    Iterable<MenuEntity> getAllMenus();
    Iterable<ChildrenEntity> getAllChildren();
    Iterable<PackageEntity> getAllPackage();
    CatalogDto createCatalog(CatalogDto catalog);
    List<ResponseMyPackage> createMyPackage(List<MyPackageDto> myPackageDtoList);
    MyPackageDto createMyPkgCatalogs(MyPackageDto myPackageDto);
    List<ResponsePkgMgt> createPkgMgt(List<PkgMgtDto> pkgMgtDtoList);
    PatalogDto createPatalog(PatalogDto patalog);
    MyPackageDto getMyPackageByCatalogId(MyPackageDto myPackageDto);
    Iterable<MyPackageEntity> getUserMyPackageByUserIdAll(String userId);
    void deleteMyPackage (MyPackageEntity myPackageEntity);
    void deleteCatalog(Long catalogId);
    void deleteMyPackage(Long myPkgId);
    void updateCatalog(CatalogDto catalogDto);
    void updateStock(CatalogEntity catalogEntity);
    void updateMyPackage(MyPackageDto myPackageDto);




}
