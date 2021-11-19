FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY ./apiEncryptionKey.jks ./apiEncryptionKey.jks
COPY ./config-service-1.0.jar ./config-server.jar
ENTRYPOINT ["java", "-jar", "config-server.jar"]
