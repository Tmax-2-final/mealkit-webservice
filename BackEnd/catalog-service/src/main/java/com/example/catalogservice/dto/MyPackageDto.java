package com.example.catalogservice.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

@Data
public class MyPackageDto implements Serializable {


    private Long myPkgId;

    private String userId;

    private Long catalogId;

    private Integer find;


}
