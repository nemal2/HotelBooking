FROM openjdk:17-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY target/hotelBackend-0.0.1-SNAPSHOT.jar backapp.jar
ENTRYPOINT ["java","-jar","backapp.jar"]
