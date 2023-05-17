# Password Manager
A Web application which uses secure programming principles to store user's log in information to different services.
The application can be run with Docker Compose. Docker and Docker Compose must be installed in order to run the application.
Run the application with command:

    docker-compose up --build -d

## Development
### Docker Compose
 The application can be run with Docker-compose. First, .env file must be added to the root of the project. For testing purposes, the .env file is added to this repository, eventhough in practice it shouldn't be. 
 The application can be set up and run with:
 
    docker-compose up --build -d

The frontend will be hosted from http://localhost:3000/.
### Running the servers independetly
In order to run the backend and frontend servers independetly from Docker-compose, the database should be run with docker-compose and then,
the backend can be run by being in the backend/ directory and running the command

    npm run dev



The frontend can be run by being in the frontend/ directory and running the command

    npm start

The backend will be hosted from http://localhost:9000/ and the frontend will be hosted from http://localhost:3000/

Once again, the environment variables are added to this repository for backend for testing purposes. 
