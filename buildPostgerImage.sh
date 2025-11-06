#!/bin/bash

docker run --name blog01-db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=123456789 \
  -e POSTGRES_DB=blog01 \
  -p 5432:5432 \
  -d postgres:15