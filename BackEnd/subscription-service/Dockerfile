FROM openjdk:11.0.12-jre
VOLUME /tmp
COPY ./target/subscription-service-1.0.jar SubscriptionService.jar

ENTRYPOINT ["java", "-jar", "SubscriptionService.jar"]

