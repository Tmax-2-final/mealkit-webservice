package com.example.orderservice;

import java.util.Random;

public class Utiles {
    public static void main(String[] args) {
        Random rnd = new Random(System.currentTimeMillis());
        for (int i = 0; i < 10; i++){
            int time = rnd.nextInt(3);
            System.out.println(time);
        }
    }
}
