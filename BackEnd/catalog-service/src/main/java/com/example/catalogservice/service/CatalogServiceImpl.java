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
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static java.lang.Math.floor;

@Data
@Slf4j
@Service
public class CatalogServiceImpl implements CatalogService{
    CatalogRepository catalogRepository;
    MenuRepository menuRepository;
    ChildrenRepository childrenRepository;
    PackageRepository packageRepository;
    PatalogRepository patalogRepository;
    MyPackageRepository myPackageRepository;
    PkgMgtRepository pkgMgtRepository;


    @Autowired
    public CatalogServiceImpl(CatalogRepository catalogRepository, MenuRepository menuRepository, ChildrenRepository childrenRepository, PackageRepository packageRepository, PatalogRepository patalogRepository, MyPackageRepository myPackageRepository, PkgMgtRepository pkgMgtRepository) {
        this.catalogRepository = catalogRepository;
        this.menuRepository = menuRepository;
        this.childrenRepository = childrenRepository;
        this.patalogRepository = patalogRepository;
        this.packageRepository = packageRepository;
        this.myPackageRepository = myPackageRepository;
        this.pkgMgtRepository = pkgMgtRepository;
    }

    @Override
    public Iterable<CatalogEntity> getAllCatalogs() {
        return catalogRepository.findAll();
    }

    @Override
    public Iterable<PatalogEntity> getAllPatalogs() { return patalogRepository.findAll(); }

    @Override
    public Iterable<MyPackageEntity> getAllMyPackage() { return myPackageRepository.findAll();}

    @Override
    public Iterable<MyPackageEntity> getUserMyPackage(String userId) {
        return myPackageRepository.findByUserId(userId);
    }

    @Override
    public Iterable<PkgMgtEntity> getPkgMgt(Long patalogId) { return pkgMgtRepository.findByPatalogId(patalogId);}


    @Override
    public CatalogEntity getCatalog(Long catalogId) { return catalogRepository.findByCatalogId(catalogId);}

    @Override
    public PatalogEntity getPatalog(Long patalogId) { return patalogRepository.findByPatalogId(patalogId);}

    @Override
    public PatalogEntity getPatalog() { return patalogRepository.findFirstByOrderByPatalogIdDesc();}


    @Override
    public Iterable<MenuEntity> getAllMenus() {return menuRepository.findAll();}

    @Override
    public Iterable<ChildrenEntity> getAllChildren() {
        return childrenRepository.findAll();
    }

    @Override
    public Iterable<PackageEntity> getAllPackage() { return packageRepository.findAll() ;}

    @Override
    public CatalogDto createCatalog(CatalogDto catalog) {
        long i = 0;
        catalog.setCatalogId(i++);

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        CatalogEntity catalogEntity = mapper.map(catalog, CatalogEntity.class);

        catalogRepository.save(catalogEntity);

        CatalogDto catalogDto = mapper.map(catalogEntity, CatalogDto.class);

        return catalogDto;
    }

    @Override
    public List<ResponseMyPackage> createMyPackage(List<MyPackageDto> myPackageDtoList) {
        // 1. cartDto -> cartEntity -> jpa -> mariadb
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        List<MyPackageEntity> myPackageEntityList = myPackageDtoList.stream().map(v -> mapper.map(v, MyPackageEntity.class)).collect(Collectors.toList());

        // 2. repository save
        myPackageRepository.saveAll(myPackageEntityList);
        // 3. result entity -> dto

        List<ResponseMyPackage> responseMyPackageList = myPackageDtoList.stream().map(v -> mapper.map(v, ResponseMyPackage.class)).collect(Collectors.toList());

        return responseMyPackageList;
    }

    @Override
    public MyPackageDto createMyPkgCatalogs(MyPackageDto myPackageDto) {
        // 1. cartDto -> cartEntity -> jpa -> mariadb
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        MyPackageEntity myPackageEntity = mapper.map(myPackageDto, MyPackageEntity.class );

        // 2. repository save
        myPackageRepository.save(myPackageEntity);
        // 3. result entity -> dto

        return myPackageDto;
    }

    @Override
    public List<ResponsePkgMgt> createPkgMgt(List<PkgMgtDto> pkgMgtDtoList) {

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        List<PkgMgtEntity> pkgMgtEntityList = pkgMgtDtoList.stream().map(v -> mapper.map(v, PkgMgtEntity.class)).collect(Collectors.toList());

        // 2. repository save
        pkgMgtRepository.saveAll(pkgMgtEntityList);
        // 3. result entity -> dto

        List<ResponsePkgMgt> responsePkgMgtList = pkgMgtDtoList.stream().map(v -> mapper.map(v, ResponsePkgMgt.class)).collect(Collectors.toList());

        return responsePkgMgtList;
    }

    @Override
    public PatalogDto createPatalog(PatalogDto patalog) {
        long i = 0;
        patalog.setPatalogId(i++);

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        PatalogEntity patalogEntity = mapper.map(patalog, PatalogEntity.class);

        patalogRepository.save(patalogEntity);

        PatalogDto patalogDto = mapper.map(patalogEntity, PatalogDto.class);

        return patalogDto;
    }

    @Override
    public MyPackageDto getMyPackageByCatalogId(MyPackageDto myPackageDto) {
        Optional<MyPackageEntity> myPackageEntity = myPackageRepository.findByCatalogIdAndUserId(myPackageDto.getCatalogId(), myPackageDto.getUserId());
        if(!myPackageEntity.isPresent()) {
            MyPackageDto nullDto = new MyPackageDto();
            nullDto.setFind(0);

            return nullDto;
        }

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        MyPackageDto resultDto = mapper.map(myPackageEntity.get(), MyPackageDto.class);
        resultDto.setFind(1);

        return resultDto;
    }

    @Override
    public Iterable<MyPackageEntity> getUserMyPackageByUserIdAll(String userId) {
        Iterable<MyPackageEntity> result = myPackageRepository.findAllByUserId(userId);

//
        return result;
    }

    @Override
    public void deleteMyPackage(MyPackageEntity myPackageEntity) { myPackageRepository.delete(myPackageEntity);};


    @Override
    public void deleteCatalog(Long productId){
         catalogRepository.deleteById(productId);
    }

    @Override
    public void deletePatalog(Long patalogId) { patalogRepository.deleteById(patalogId);

    }

    @Override
    public void deleteMyPackage(Long myPkgId) { myPackageRepository.deleteById(myPkgId);}

    @Override
    public void updateCatalog(CatalogDto catalogDto) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        CatalogEntity catalogEntity = mapper.map(catalogDto, CatalogEntity.class);

        catalogRepository.save(catalogEntity);

    }

    @Override
    public void updateStock(CatalogEntity catalogEntity) {
        catalogRepository.save(catalogEntity);
    }

    @Override
    public void updateMyPackage(MyPackageDto myPackageDto) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        MyPackageEntity myPackageEntity = mapper.map(myPackageDto, MyPackageEntity.class);

        myPackageRepository.save(myPackageEntity);
    }

}
