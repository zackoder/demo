#!/bin/bash

gnome-terminal --title="Spring Backend (demo)" --command "/bin/bash -c 'cd demo && ./mvnw spring-boot:run; exec bash'"

gnome-terminal --title="Angular Frontend (ng serve)" --command "/bin/bash -c 'cd zero1blog-frontend && ng serve; exec bash'"

echo "Both terminals launched."
