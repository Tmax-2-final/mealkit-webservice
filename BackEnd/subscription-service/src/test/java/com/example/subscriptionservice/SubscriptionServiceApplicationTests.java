package com.example.subscriptionservice;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SubscriptionServiceApplicationTests {

    @Test
    void contextLoads() {
    }

//    @Test
//    public void jasypt_encrypt_decrypt_test() {
//        String username = "계정명";
//        String password = "비밀번호";
//
//
//        StandardPBEStringEncryptor jasypt = new StandardPBEStringEncryptor();
//        jasypt.setPassword("암호값");
//        jasypt.setAlgorithm("PBEWithMD5AndDES");
//
//        String encryptedText = jasypt.encrypt(username);
//        String encryptedText2 = jasypt.encrypt(password);
//
//        System.out.println("계정명 암호값 => " + encryptedText);
//        System.out.println("계정비밀번호 암호값 => " + encryptedText2);
//
//        String decryptedText = jasypt.decrypt(encryptedText);
//
//        assertThat(1).isEqualTo(1);
//    }
}
