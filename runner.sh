#!/bin/bash

CONTAINER_NAME="blog01-db"
read run="$1"

if [ "$(docker ps -q -f name=^${CONTAINER_NAME}$)" ]; then
  echo "Container '${CONTAINER_NAME}' is already running."
else
  if [ "$(docker ps -aq -f name=^${CONTAINER_NAME}$)" ]; then
    echo "Container '${CONTAINER_NAME}' exists but not running. Starting it..."
    docker start "${CONTAINER_NAME}"
  else
    echo "Container '${CONTAINER_NAME}' does not exist. Running new container..."
    docker run --name blog01-db \
        -e POSTGRES_USER=admin \
        -e POSTGRES_PASSWORD=123456789 \
        -e POSTGRES_DB=blog01 \
        -p 5432:5432 \
        -d postgres:15
    
  fi
fi

gnome-terminal --title="Spring Backend (demo)" \
  --command "/bin/bash -c 'cd demo && ./mvnw spring-boot:run; exec bash'"

gnome-terminal --title="Angular Frontend (ng serve)" \
  --command "/bin/bash -c 'cd zero1blog-frontend && npm run start; exec bash'"

echo "Docker container checked and both terminals launched."
