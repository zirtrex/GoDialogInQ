# JOB_NAME is the name of the project of this build. This is the name you gave your job. It is set up by Jenkins

COMPOSE_ID=${JOB_NAME:-local}

# Test
docker exec -i godialoginq_back npm test