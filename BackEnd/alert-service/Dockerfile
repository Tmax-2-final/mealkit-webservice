FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY ./target/alert-service-1.0.jar ./alert-service.jar

ENTRYPOINT ["java", "-jar", "alert-service.jar"]
