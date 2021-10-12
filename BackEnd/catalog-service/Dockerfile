FROM openjdk:11.0.12-jre
VOLUME /tmp
COPY ./target/catalog-service-1.0.jar CatalogService.jar

ENTRYPOINT ["java", "-jar", "CatalogService.jar"]

