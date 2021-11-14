package com.example.subscriptionservice.status;

public enum SubStatus {
    BEFORE_PKG_CONFIRMATION('1'),
    AFTER_PKG_CONFIRMATION('2'),
    CACNEL('3');

    private final Character value;

    private SubStatus(Character value){
        this.value = value;
    }

    public Character getValue() { return value; }
}
