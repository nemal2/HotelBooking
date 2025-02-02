FROM openjdk:17-jdk-alpine
WORKDIR /app
ARG JAR_FILE=target/*.jar
COPY target/hotelBackend-0.0.1-SNAPSHOT.jar backapp.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","backapp.jar"]
