FROM openjdk:11.0.12-jre
VOLUME /tmp
COPY ./target/review-service-1.0.jar ReviewService.jar

ENTRYPOINT ["java", "-jar", "ReviewService.jar"]

