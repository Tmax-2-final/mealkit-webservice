package com.example.catalogservice.service;

import com.example.catalogservice.dto.CatalogDto;
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


    @Autowired
    public CatalogServiceImpl(CatalogRepository catalogRepository, MenuRepository menuRepository, ChildrenRepository childrenRepository) {
        this.catalogRepository = catalogRepository;
        this.menuRepository = menuRepository;
        this.childrenRepository = childrenRepository;
    }

    @Override
    public Iterable<CatalogEntity> getAllCatalogs() {
        return catalogRepository.findAll();
    }

    @Override
    public CatalogEntity getCatalog(Long productId) {
        return catalogRepository.findByProductId(productId);
    }

    @Override
    public Iterable<MenuEntity> getAllMenus() {return menuRepository.findAll();}

    @Override
    public Iterable<ChildrenEntity> getAllChildren() {
        return childrenRepository.findAll();
    }

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
