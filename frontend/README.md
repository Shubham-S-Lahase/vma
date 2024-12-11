Local Development Setup and Running the App

Prerequisites
    Docker and Docker Compose installed on your local machine.
    The frontend and backend directories, each containing a Dockerfile.
--------------------------------------------------------
Steps to Run the App Locally
    Clone the Repository
    Clone the repository containing the frontend, backend, and docker-compose.yml files to your local machine.
---------------------------------------------------------
Navigate to the Project Directory
    Open a terminal and navigate to the root directory of the project, where the docker-compose.yml file is located.
    Build and Run the Containers
----------------------------------------------------------
Build and Run the Containers
    Run the following command to start the application using Docker Compose:
        "docker-compose up --build"
----------------------------------------------------------
Access the Application
    After the containers are up and running:
        The frontend app will be available at http://localhost:3000.
        The backend API will be available at http://localhost:5000.
----------------------------------------------------------
Access the Database
    Access the MongoDB Container
        Run the following command on CMD to access the MongoDB container's shell:
        "docker exec -it mongodb mongo"
    Here:
        mongodb is the name of your MongoDB container as defined in the container_name field.
        mongo is the MongoDB shell command to interact with the database.
    After connecting to MongoDB, you can list all collections in the database using the following command:
        use vma
        show collections

----------------------------------------------------------
Docker Compose Breakdown

Frontend Service
Build Context: The frontend directory.

Ports: Exposes port 3000 on the host machine and maps it to port 3000 inside the container.

Volumes: Mounts the frontend directory to /app inside the container and also mounts the node_modules directory to prevent issues when installing dependencies.

Environment Variables: Sets the backend URL for the frontend to interact with (REACT_APP_BACKEND_URL=http://backend:5000).

Also you can add the proxy in package.json of Frontend as follows:
  "proxy": "http://backend:5000",

Depends On: Ensures that the frontend container waits for the backend to be ready before starting.
----------------------------------------------------------

Backend Service
Build Context: The backend directory.

Ports: Exposes port 5000 on the host machine and maps it to port 5000 inside the container.

Volumes: Mounts the backend directory to /app inside the container and also mounts the node_modules directory to prevent issues when installing dependencies.

Depends On: Ensures that the backend container waits for MongoDB to be ready before starting.
----------------------------------------------------------

MongoDB Service
Image: Uses the official mongo image.

Ports: Exposes port 27017 for connecting to MongoDB from the host machine.

Volumes: Uses a named volume (mongodb_data) to persist data across container restarts.
