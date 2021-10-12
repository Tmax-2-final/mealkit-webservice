FROM openjdk:11.0.12-jre
VOLUME /tmp
COPY ./target/user-service-1.0.jar ./user-service-1.0.jar
ENTRYPOINT ["java", "-jar", "user-service-1.0.jar"]