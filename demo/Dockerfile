# ---- Stage 1: Build ----
FROM maven:3.9.9-eclipse-temurin-21

WORKDIR /app

COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
RUN chmod +x mvnw

COPY src ./src

# Build the jar (skip tests to speed up)
# RUN ./mvnw clean package -DskipTests

# ---- Stage 2: Run ----
# FROM eclipse-temurin:21-jdk

# WORKDIR /app

# Copy the jar built in the previous stage
# COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

# Run the Spring Boot application
# ENTRYPOINT ["java", "-jar", "app.jar"]
ENTRYPOINT ["./mvnw", "spring-boot:run"]
