FROM openjdk:11.0.12-jre
VOLUME /tmp
COPY ./target/scheduler-service-1.0.jar ./SchedulerService.jar

ENTRYPOINT ["java", "-jar", "SchedulerService.jar"]

