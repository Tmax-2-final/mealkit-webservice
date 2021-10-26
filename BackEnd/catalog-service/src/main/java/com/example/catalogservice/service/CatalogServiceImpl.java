package com.example.catalogservice.service;

import com.example.catalogservice.dto.CatalogDto;
import com.example.catalogservice.dto.PatalogDto;
import com.example.catalogservice.jpa.*;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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


    @Autowired
    public CatalogServiceImpl(CatalogRepository catalogRepository, MenuRepository menuRepository, ChildrenRepository childrenRepository, PackageRepository packageRepository, PatalogRepository patalogRepository) {
        this.catalogRepository = catalogRepository;
        this.menuRepository = menuRepository;
        this.childrenRepository = childrenRepository;
        this.packageRepository = packageRepository;
        this.patalogRepository = patalogRepository;
    }

    @Override
    public Iterable<CatalogEntity> getAllCatalogs() {
        return catalogRepository.findAll();
    }

    @Override
    public Iterable<PatalogEntity> getAllPatalogs() { return patalogRepository.findAll(); }

    @Override
    public CatalogEntity getCatalog(Long productId) {
        return catalogRepository.findByProductId(productId);
    }

    @Override
    public PatalogEntity getPatalog(Long patalogsId) {
        return null;
    }

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
    public PatalogDto createPatalog(PatalogDto patalog) {
        long i = 0;
        patalog.setPatalogsId(i++);

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        PatalogEntity patalogEntity = mapper.map(patalog, PatalogEntity.class);

        patalogRepository.save(patalogEntity);

        PatalogDto patalogDto = mapper.map(patalogEntity, PatalogDto.class);

        return patalogDto;
    }

    @Override
    public void deleteCatalog(Long productId){
         catalogRepository.deleteById(productId);
    }

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

}
