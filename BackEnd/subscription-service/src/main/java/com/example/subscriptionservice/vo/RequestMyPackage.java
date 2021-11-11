package com.example.subscriptionservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RequestMyPackage {

    private Long myPkgId;

    private String userId;

    private Long catalogId;

}
