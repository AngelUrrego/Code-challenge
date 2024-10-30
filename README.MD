# API Project with Cache and Data Storage in MongoDB and Redis

This project is an API for managing user profiles with caching in Redis and primary storage in MongoDB. It includes routes for registration, login, viewing and updating user profiles, as well as managing user scores. The application is developed with Node.js for the backend and React for the frontend.

## Project Features
- **User Authentication**: Allows registration and login.
- **Profile Viewing**: Profile data is fetched with caching in Redis to reduce the load on MongoDB.
- **Score Updating**: Users can update their score, synchronizing the data securely and consistently.
- **User Interface in React**: Views for registration, login, profile viewing, and updating, accessible only for authenticated users.

## Project Structure
- **Backend (Node.js)**: Contains the routes and server logic, configured to connect with MongoDB and Redis.
- **Frontend (React + Vite)**: Enables users to interact with the API through views and forms.
- **Redis Cache**: Profile data is stored in Redis to improve response time.

## API Endpoints

| Route               | Method | Description                                 |
|---------------------|--------|---------------------------------------------|
| `/api/register`     | POST   | Register a new user                         |
| `/api/login`        | POST   | User login                                  |
| `/api/profile`      | GET    | Fetch user profile with cache               |
| `/api/updateScore`  | POST   | Update user score                           |

## Requirements
- Node.js 
- MongoDB
- Redis
- Docker (optional for container execution)

## Project Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>

2. Configure the environment variables in the .env file:
MONGODB_URI=mongodb://localhost:27017/your_database
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_secret_key


3. Configure the frontend to correctly redirect requests to the backend: In the vite.config.js file of the frontend:
server: {
  proxy: {
    '/api': 'http://localhost:5000'
  },
},

## RUNNING THE APPLICATION
1. Start MongoDB and Redis (make sure they are running).

2. Start the Backend:
cd backend
npm install
npm start

3. Start the Frontend:
cd frontend
npm install
npm run dev

## RUNNING WITH DOCKER

1. Note: The application was attempted to run in Docker, but technical issues arose. The project runs perfectly locally.

For a Docker implementation (if you decide to investigate further), the Dockerfile and docker-compose.yml files are set up as explained in the advanced setup section.

## CACHE STORAGE IN REDIS

Redis is used to cache user profile data, optimizing the API response time. When a user profile is requested for the first time, it is checked in Redis; if it does not exist, it is retrieved from MongoDB and stored in Redis with a predefined expiration time. This reduces the load of queries to MongoDB and improves performance in multiple requests to the same profile.

## SCALABILITY STRATEGIES
This project implements the following scalability strategies:

1. Distributed Cache with Redis: Improves response time and reduces database load.

2. Service Separation in Containers: Although the Docker implementation currently presents issues, using containers allows each service to be scaled and deployed independently.

3. JWT for Authentication: Facilitates scalability in authentication and security without requiring session storage on the server.

## SECURE SCORE UPDATE MANAGEMENT
To securely and synchronously update a user's score, a mechanism is implemented to validate the user's authenticity and permissions before any modification. The score update performs the following steps:

1. Verifies the authenticated user using JWT.
2. Queries the user profile from Redis or MongoDB as appropriate.
3. Performs the update in MongoDB and stores the new value in Redis, ensuring consistency between the cache and the database.
