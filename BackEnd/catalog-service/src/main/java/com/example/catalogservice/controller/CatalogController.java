package com.example.catalogservice.controller;

import com.example.catalogservice.dto.CatalogDto;
import com.example.catalogservice.dto.MyPackageDto;
import com.example.catalogservice.dto.PatalogDto;
import com.example.catalogservice.dto.PkgMgtDto;
import com.example.catalogservice.jpa.*;
import com.example.catalogservice.service.CatalogService;
import com.example.catalogservice.vo.*;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
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

    @ApiOperation(value = "전체패키지 조회", notes = "전체 패키지를 조회한다")
    @GetMapping("/patalogs")
    public ResponseEntity<Iterable<PatalogEntity>> getPatalogs() {
        log.info("berfore patalogs");
        Iterable<PatalogEntity> patalogList = catalogService.getAllPatalogs();
        log.info("after patalogs");
        return ResponseEntity.status(HttpStatus.OK).body(patalogList);
    }

    @ApiOperation(value = "마이패키지 조회", notes = "마이 패키지를 조회한다")
    @GetMapping("/mypackage")
    public ResponseEntity<Iterable<MyPackageEntity>> getMyPackage() {
        log.info("berfore mypackage");
        Iterable<MyPackageEntity> myPackageList = catalogService.getAllMyPackage();
        log.info("after mypackage");
        return ResponseEntity.status(HttpStatus.OK).body(myPackageList);
    }

    @ApiOperation(value = "회원의 마이패키지 조회", notes = "회원의 마이 패키지를 조회한다")
    @GetMapping("/{userId}/mypackage")
    public ResponseEntity<Iterable<MyPackageEntity>> getUserMyPackage(@PathVariable("userId") String userId) {
        log.info("berfore mypackage");
        Iterable<MyPackageEntity> myPackageList = catalogService.getUserMyPackage(userId);
        log.info("after mypackage");
        return ResponseEntity.status(HttpStatus.OK).body(myPackageList);
    }

    @ApiOperation(value = "메뉴 자식창 조회", notes = "각 메뉴에 대한 자식창을 조회한다")
    @GetMapping("/children")
    public ResponseEntity<Iterable<ChildrenEntity>> getChildren() {
        log.info("berfore children");
        Iterable<ChildrenEntity> childrenList = catalogService.getAllChildren();
        log.info("after children");
        return ResponseEntity.status(HttpStatus.OK).body(childrenList);
    }

    @ApiOperation(value = "메뉴 패키지메뉴 조회", notes = "각 메뉴에 대한 패키지메뉴 조회한다")
    @GetMapping("/package")
    public ResponseEntity<Iterable<PackageEntity>> getPackage() {
        log.info("berfore package");
        Iterable<PackageEntity> packageList = catalogService.getAllPackage();
        log.info("after package");
        return ResponseEntity.status(HttpStatus.OK).body(packageList);
    }

    @ApiOperation(value = "마이패키지 등록", notes="마이패키지 등록")
    @PostMapping("/{userId}/mypackage")
    public ResponseEntity<List<ResponseMyPackage>> createMyPackage(@RequestBody @Valid Iterable<RequestMyPackage> requestMyPackageList, @PathVariable("userId") String userId) {
        System.out.println(userId);
        // 1. requestCart + userId => cartDto
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        List<MyPackageDto> myPackageDtoList = new ArrayList<>();

        for (RequestMyPackage requestMyPackage: requestMyPackageList) {
            MyPackageDto myPackageDto = mapper.map(requestMyPackage, MyPackageDto.class); // userDto -> userEntity 로 매핑
            myPackageDto.setUserId(userId);

            myPackageDtoList.add(myPackageDto);
        }

        // 2. service -> jpa -> mariadb 저장 = 카트 등록 서비스
        List<ResponseMyPackage> responseMyPackageList = catalogService.createMyPackage(myPackageDtoList);
        // 3. responseCart 로 지정
        //ResponseMyPackage responseMyPackage = mapper.map(myPackageDto, ResponseMyPackage.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseMyPackageList);
    }

    @ApiOperation(value = "패키지관리 등록", notes="패키지관리 등록")
    @PostMapping("/{userId}/pkgmgt")
    public ResponseEntity<List<ResponsePkgMgt>> createPkgMgt(@RequestBody @Valid Iterable<RequestPkgMgt> requestPkgMgtList, @PathVariable("userId") String userId) {
        System.out.println(userId);
        // 1. requestCart + userId => cartDto
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        List<PkgMgtDto> pkgMgtDtoList = new ArrayList<>();

        for (RequestPkgMgt requestPkgMgt: requestPkgMgtList) {
            PkgMgtDto pkgMgtDto = mapper.map(requestPkgMgt, PkgMgtDto.class); // userDto -> userEntity 로 매핑
            pkgMgtDto.setUserId(userId);

            pkgMgtDtoList.add(pkgMgtDto);
        }

        // 2. service -> jpa -> mariadb 저장 = 카트 등록 서비스
        List<ResponsePkgMgt> responsePkgMgtList = catalogService.createPkgMgt(pkgMgtDtoList);
        // 3. responseCart 로 지정
        //ResponseMyPackage responseMyPackage = mapper.map(myPackageDto, ResponseMyPackage.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responsePkgMgtList);
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

    @ApiOperation(value = "패키지 등록", notes = "패키지를 등록한다")
    @PostMapping( "/{userId}/patalogs")
    public ResponseEntity<ResponsePatalog> createPatalogs(@RequestBody @Valid RequestPatalog requestPatalog) throws IOException {

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        PatalogDto patalogDto = mapper.map(requestPatalog, PatalogDto.class);
        catalogService.createPatalog(patalogDto);
        ResponsePatalog responsePatalog = mapper.map(patalogDto, ResponsePatalog.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(responsePatalog);


//        mapper.map(patalog, PatalogDto.class);
//        catalogService.createPatalog(patalogDto);
//        ResponsePatalog responsePatalog = mapper.map(patalogDto, ResponsePatalog.class);
//        return ResponseEntity.status(HttpStatus.CREATED).body(responsePatalog);
    }



    @ApiOperation(value = "상품 삭제", notes = "해당하는 상품번호의 상품을 삭제한다")
    @DeleteMapping("/catalogs/{productId}")
    public ResponseEntity<String> deleteCart(@PathVariable("productId") Long productId){
        catalogService.deleteCatalog(productId);
        return ResponseEntity.status(HttpStatus.OK).body("해당 상품을 삭제했습니다.");
    }

    @ApiOperation(value = "마이패키지 삭제", notes = "해당 마이패키지를 삭제한다")
    @DeleteMapping("/{userId}/mypackage/{myPkgId}")
    public ResponseEntity<String> deleteMyPackage(@PathVariable("myPkgId") Long myPkgId){
        catalogService.deleteMyPackage(myPkgId);
        return ResponseEntity.status(HttpStatus.OK).body("해당 상품을 삭제했습니다.");
    }

    /* 유저가 담은 카트 삭제하기 : 주문-결제 과정을 지나 카트에 담긴 상품이 삭제된다. */
    @ApiOperation(value = "마이패키지 전체 삭제", notes="결제 이후 카트 속 상품 삭제")
    @DeleteMapping("/{userId}/mypackage")
    public ResponseEntity<String> deleteAllMypackage(@PathVariable("userId") String userId) {
        // 1. 회원이 담은 상품 리스트 조회
        Iterable<MyPackageEntity> myPackageList = catalogService.getUserMyPackageByUserIdAll(userId);
        // 2. 하나씩 삭제
        myPackageList.forEach(v -> {
            try {
                catalogService.deleteMyPackage(v);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        });

        return ResponseEntity.status(HttpStatus.OK).body("삭제가 완료 되었습니다.");
    }


    @ApiOperation(value = "상품 조회", notes = "해당하는 상품번호의 상품을 조회한다")
    @GetMapping("/catalogs/{catalogId}")
    public ResponseEntity<CatalogEntity> getCatalog(@PathVariable Long catalogId) {
        log.info("before retrieve catalogs data");
        CatalogEntity catalogEntity = catalogService.getCatalog(catalogId);
        log.info("after retrieve catalogs data");
        if (catalogEntity != null) {
            return ResponseEntity.status(HttpStatus.OK).body(catalogEntity);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation(value = "패키지관리 조회", notes = "패키지관리를 조회한다")
    @GetMapping("/{userId}/pkgmgt/{patalogId}")
    public ResponseEntity<Iterable<PkgMgtEntity>> getPkgMgt(@PathVariable Long patalogId) {
        log.info("before retrieve catalogs data");
        Iterable<PkgMgtEntity> pkgMgtEntity = catalogService.getPkgMgt(patalogId);

        log.info("after retrieve catalogs data");
            return ResponseEntity.status(HttpStatus.OK).body(pkgMgtEntity);

    }


    @ApiOperation(value = "패키지 조회", notes = "해당하는 패키지번호의 패키지번호를 조회한다")
    @GetMapping("/patalogs/{patalogId}")
    public ResponseEntity<PatalogEntity> getPatalog(@PathVariable Long patalogId) {
        log.info("before retrieve catalogs data");
        PatalogEntity patalogEntity = catalogService.getPatalog(patalogId);
        log.info("after retrieve catalogs data");
        if (patalogEntity != null) {
            return ResponseEntity.status(HttpStatus.OK).body(patalogEntity);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation(value = "패키지 조회", notes = "해당하는 패키지번호의 패키지번호를 조회한다")
    @GetMapping("/firstpatalogs")
    public ResponseEntity<PatalogEntity> getPatalog() {
        log.info("before retrieve patalogs data");
        PatalogEntity patalogEntity = catalogService.getPatalog();
        log.info("after retrieve patalogs data");
        if (patalogEntity != null) {
            return ResponseEntity.status(HttpStatus.OK).body(patalogEntity);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }


    @ApiOperation(value = "상품 수정", notes = "해당하는 상품번호의 상품을 수정한다")
    @PutMapping("/catalogs/{catalogId}")
    public ResponseEntity<String> updateCatalog(@RequestBody CatalogDto catalog,  @PathVariable Long catalogId ){
        catalog.setCatalogId(catalogId);
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
