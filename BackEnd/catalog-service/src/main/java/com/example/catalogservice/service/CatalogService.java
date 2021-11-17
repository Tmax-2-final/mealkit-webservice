package com.example.catalogservice.service;

import com.example.catalogservice.dto.CatalogDto;
import com.example.catalogservice.dto.MyPackageDto;
import com.example.catalogservice.dto.PatalogDto;
import com.example.catalogservice.dto.PkgMgtDto;
import com.example.catalogservice.jpa.*;
import com.example.catalogservice.vo.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CatalogService {
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
    Page<CatalogEntity> getCatalogByAll(Pageable pageRequest);
    Page<PatalogEntity> getPatalogByAll(Pageable pageRequest);
    Page<CatalogEntity> getCatalogBySearch(RequestData requestData, Pageable pageRequest);
    void deleteMyPackage (MyPackageEntity myPackageEntity);
    void deleteCatalog(Long catalogId);
    void deletePatalog(Long patalogId);
    void deleteMyPackage(Long myPkgId);
    void updateCatalog(CatalogDto catalogDto);
    void updateStock(CatalogEntity catalogEntity);
    void updateMyPackage(MyPackageDto myPackageDto);

    Page<PatalogEntity> getSubPatalogs(String searchValue, Pageable pageRequest);
    Iterable<CatalogEntity> getRecommendPatalogs(String[] themes, String[] flavors, Integer cookingtime, Integer age);
}
