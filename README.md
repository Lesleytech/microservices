# APIs and Microservices

---

## Introduction

This is my solution to the APIs and Microservices Certification on [freeCodeCamp](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/). The live project is available via [this link](https://lesleytech-microservices.herokuapp.com).

The projects include:

- Timestamp Microservice
- Request Header Parser Microservice
- URL Shortener Microservice
- Exercise Tracker
- File Metadata Microservice

## Installation

Run `npm install` or `yarn install` to install all dependencies.

## Usage

**To begin,**

1. Create a new cluster on MongoDB Atlas following this [guide](https://docs.atlas.mongodb.com/getting-started/).
2. Copy the connection string from the MongoDB account page.
3. Add the connection string to your development environment.

   - First, install the `dotenv` package with `npm i dotenv` or `yarn add dotenv`.
   - The package is already loaded in the application, in [server.js](../master/server.js).
   - Create a `.env` file in the root directory and add the following code:

     `MONGO_URL="<YOUR CONNECTION STRING>"`

4. If you have MongoDB and MongoDB Compass installed, you can run your database locally.

**Finally, run:**

`npm start` to start the server on port 5000.

`yarn dev` to startup the server with nodemon which restarts the server when you edit the project.
