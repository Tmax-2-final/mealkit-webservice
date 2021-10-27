package com.example.catalogservice.service;

import com.example.catalogservice.dto.CatalogDto;
import com.example.catalogservice.dto.MyPackageDto;
import com.example.catalogservice.dto.PatalogDto;
import com.example.catalogservice.jpa.*;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

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


    @Autowired
    public CatalogServiceImpl(CatalogRepository catalogRepository, MenuRepository menuRepository, ChildrenRepository childrenRepository, PackageRepository packageRepository, PatalogRepository patalogRepository, MyPackageRepository myPackageRepository) {
        this.catalogRepository = catalogRepository;
        this.menuRepository = menuRepository;
        this.childrenRepository = childrenRepository;
        this.patalogRepository = patalogRepository;
        this.packageRepository = packageRepository;
        this.myPackageRepository = myPackageRepository;
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
    public CatalogEntity getCatalog(Long productId) {
        return catalogRepository.findByProductId(productId);
    }

    @Override
    public PatalogEntity getPatalog(Long patalogId) { return patalogRepository.findByPatalogId(patalogId);}

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
        catalog.setProductId(i++);

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        CatalogEntity catalogEntity = mapper.map(catalog, CatalogEntity.class);

        catalogRepository.save(catalogEntity);

        CatalogDto catalogDto = mapper.map(catalogEntity, CatalogDto.class);

        return catalogDto;
    }

    @Override
    public MyPackageDto createMyPackage(MyPackageDto myPackageDto) {
        // 1. cartDto -> cartEntity -> jpa -> mariadb
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        MyPackageEntity myPackageEntity = mapper.map(myPackageDto, MyPackageEntity.class); // userDto -> userEntity 로 매핑
        // 2. repository save
        myPackageRepository.save(myPackageEntity);
        // 3. result entity -> dto
        MyPackageDto resultMyPackageDto = mapper.map(myPackageEntity, MyPackageDto.class);

        return resultMyPackageDto;
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
    public MyPackageDto getMyPackageByPatalogId(MyPackageDto myPackageDto) {
        Optional<MyPackageEntity> myPackageEntity = myPackageRepository.findByPatalogIdAndUserId(myPackageDto.getPatalogId(), myPackageDto.getUserId());
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

        PatalogEntity patalogEntity = null;

        for (MyPackageEntity myPackageEntity : result) {
            Long patalogId = myPackageEntity.getPatalogId();
            patalogEntity = patalogRepository.findByPatalogId(patalogId);
            String image = patalogEntity.getImage();
            String patalogName = patalogEntity.getName();
            myPackageEntity.setImage(image);
            myPackageEntity.setName(patalogName);


        }
        return result;
    }

    @Override
    public void deleteMyPackage(MyPackageEntity myPackageEntity) { myPackageRepository.delete(myPackageEntity);};


    @Override
    public void deleteCatalog(Long productId){
         catalogRepository.deleteById(productId);
    }

    @Override
    public void deleteMyPackage(Long patalogId) { myPackageRepository.deleteById(patalogId);}

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
