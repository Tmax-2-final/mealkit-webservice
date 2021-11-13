package com.example.subscriptionservice.status;

public enum ShipStatus {
    PREPARED('1'),
    SHIPMENT('2'),
    SHIPPING('3'),
    CANCEL('4'),
    COMPLETE('5'),
    CONFIRM('6');

    private final Character value;

    private ShipStatus(Character value){
        this.value = value;
    }

    public Character getValue() { return value; }
}
