package com.example.catalogservice.controller;

import com.example.catalogservice.dto.CatalogDto;
import com.example.catalogservice.jpa.CatalogEntity;
import com.example.catalogservice.jpa.ChildrenEntity;
import com.example.catalogservice.jpa.MenuEntity;
import com.example.catalogservice.service.CatalogService;
import com.example.catalogservice.utility.Utility;
import com.example.catalogservice.vo.RequestCatalog;
import com.example.catalogservice.vo.ResponseCatalog;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.*;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/")
@Slf4j
public class CatalogController {
    Environment env;
    CatalogService catalogService;


    @Autowired
    public CatalogController(Environment env, CatalogService catalogService) {
        this.env = env;
        this.catalogService = catalogService;
    }

    @ApiOperation(value = "카탈로그서비스 상태체크", notes = "카탈로그서비스 상태체크를 한다")
    @GetMapping("/health_check")
    public String status(){

        return "성공";

    }

    @ApiOperation(value = "메뉴 조회", notes = "메뉴 리스트를 조회한다")
    @GetMapping("/menu")
    public ResponseEntity<Iterable<MenuEntity>> getMenu() {
        log.info("berfore menu");
        Iterable<MenuEntity> menuList = catalogService.getAllMenus();
        log.info("after menu");
        return ResponseEntity.status(HttpStatus.OK).body(menuList);
    }

    @ApiOperation(value = "전체상품 조회", notes = "전체 상품을 조회한다")
    @GetMapping("/catalogs")
    public ResponseEntity<Iterable<CatalogEntity>> getCatalogs() {
        log.info("berfore catalogs");
        Iterable<CatalogEntity> catalogList = catalogService.getAllCatalogs();
        log.info("after catalogs");
        return ResponseEntity.status(HttpStatus.OK).body(catalogList);
    }

    @ApiOperation(value = "메뉴 자식창 조회", notes = "각 메뉴에 대한 자식창을 조회한다")
    @GetMapping("/children")
    public ResponseEntity<Iterable<ChildrenEntity>> getChildren() {
        log.info("berfore children");
        Iterable<ChildrenEntity> childrenList = catalogService.getAllChildren();
        log.info("after children");
        return ResponseEntity.status(HttpStatus.OK).body(childrenList);
    }

    @ApiOperation(value = "상품 등록", notes = "상품을 등록한다")
    @PostMapping( "/catalogs")
    public ResponseEntity<ResponseCatalog> createCatalogs(@RequestBody @Valid RequestCatalog catalog) throws IOException {

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        CatalogDto catalogDto = mapper.map(catalog, CatalogDto.class);
        catalogService.createCatalog(catalogDto);
        ResponseCatalog responseCatalog = mapper.map(catalogDto, ResponseCatalog.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseCatalog);
    }

    @ApiOperation(value = "상품 삭제", notes = "해당하는 상품번호의 상품을 삭제한다")
    @DeleteMapping("/catalogs/{productId}")
    public ResponseEntity<String> deleteCart(@PathVariable("productId") Long productId){
        catalogService.deleteCatalog(productId);
        return ResponseEntity.status(HttpStatus.OK).body("해당 상품을 삭제했습니다.");
    }


    @ApiOperation(value = "상품 조회", notes = "해당하는 상품번호의 상품을 조회한다")
    @GetMapping("/catalogs/{productId}")
    public ResponseEntity<CatalogEntity> getCatalog(@PathVariable Long productId) {
        log.info("before retrieve catalogs data");
        CatalogEntity catalogEntity = catalogService.getCatalog(productId);
        log.info("after retrieve catalogs data");
        if (catalogEntity != null) {
            return ResponseEntity.status(HttpStatus.OK).body(catalogEntity);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation(value = "상품 수정", notes = "해당하는 상품번호의 상품을 수정한다")
    @PutMapping("/catalogs/{productId}")
    public ResponseEntity<String> updateCatalog(@RequestBody CatalogDto catalog,  @PathVariable Long productId ){
        catalog.setProductId(productId);
        catalogService.updateCatalog(catalog);

        return ResponseEntity.status(HttpStatus.OK).body("상품 정보 수정이 완료되었습니다.");

        }

    @ApiOperation(value = "상품 재고수정", notes = "해당하는 상품번호인 상품의 재고를 수정한다")
    @PutMapping("/catalogs/{productId}/{stock}")
    public ResponseEntity<CatalogEntity> updateStock(@PathVariable Long productId, @PathVariable Integer stock){
        CatalogEntity catalogEntity = catalogService.getCatalog(productId);
        catalogEntity.setStock(stock);
        catalogService.updateStock(catalogEntity);

        if (catalogEntity != null) {
            return ResponseEntity.status(HttpStatus.OK).body(catalogEntity);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

    }
}
