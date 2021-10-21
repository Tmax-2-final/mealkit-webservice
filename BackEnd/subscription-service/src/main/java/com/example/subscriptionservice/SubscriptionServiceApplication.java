package com.example.subscriptionservice;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class SubscriptionServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(SubscriptionServiceApplication.class, args);
    }
}

// 프로젝트 실행 후 암호화 된 비밀번호 출력
//public class SubscriptionServiceApplication implements CommandLineRunner {
//
//    public static void main(String[] args) {
//        SpringApplication.run(SubscriptionServiceApplication.class, args);
//    }
//
//    public void run(String... args) throws Exception {
//        StandardPBEStringEncryptor spe = new StandardPBEStringEncryptor();
//        spe.setAlgorithm("PBEWithMD5AndDES");
//        spe.setPassword("암호화비밀번호");
//        System.out.println("db username = " + spe.encrypt("디비유저명"));
//        System.out.println("db password = " + spe.encrypt("디비유저비밀번호"));
//    }
//}
