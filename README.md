# Byjust Voting Application Assignment

## User Stories

* User Story 1: I can keep my polls and come back later to access them.
* User Story 2: I can create a poll with any number of possible items.
* User Story 3: I can see the list of polls available/created.
* User Story 4: I can see a single poll by clicking on it in the list.
* User Story 5: I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts or anything)
* User Story 6:I can see and vote on respective poll. After submitting vote, the result should be updated in the chart.
* User Story 7: I can delete polls that I decide I don't want anymore by clicking on remove icon(or delete button) in the list.
* User Story 8: If I don't like the options on a poll, I can create a new option(custom).
* User Story 9: As an authenticated user, I can share my polls on twitter. Provide the share button on page 2.

## Technology Stack

* Server : NodeJS
* Client : VueJS 
* Database : MongoDB

## Implementation

### Server

* The Server is written in NodeJS using the Express framework.
* The Express CLI was used to create the project folder structure.
* A single project is created that houses the Server Side and the Client Side Code.
* All the Server Side code is written in the ./routes and the ./server folders.
* All the Client Side code is written in the ./public folder.
* The project contains 3 models.
  ** User
  ** Poll
  ** Vote
* Mongoose is used as the ORM for interacting with Mongo.
* All the apis follow the format /api/model
* GET, POST, DELETE and PATCH Methods have been used.
* Apart from PATCH all the other methods require authentication.
* JWT Tokens are used for securing the APIs.
* A custom middleware is in place that takes care of securing the APIs.

## Client

* The Client side is written in HTML5 and CSS3.
* The Javascript framework is VueJS.
* VueJS is included into the application using the Vue CDN.

## Config

* The application is driven by a config file - ./server/config/config.json file. This file is used only for the DEV and the TEST environments. 
* All values in this file are read and written as environment variables.
* For setting up the same for a PRODUCTION environment the following environment variables should be set on the production server:
 * MONGODB_URI - The MongoDB connection URL
 * JWT_SALT - The unique salt used for creating the JWT tokens
 * SALT_ROUNDS - The salt rounds for salting the passwords while encryption.
 
 ## Hosting
 
 * The application is hosted on Heroku : https://stark-sands-78777.herokuapp.com/

