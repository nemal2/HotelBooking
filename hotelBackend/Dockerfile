# Use official OpenJDK 17 image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy project files
COPY target/hotelBackend-0.0.1-SNAPSHOT.jar app.jar

# Expose backend port
EXPOSE 4040

# Run application
ENTRYPOINT ["java", "-jar", "app.jar"]
