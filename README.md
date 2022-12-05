# map-app

Interactive map web app using React, MapBox, NodeJS and MongoDB.

Created using Create React App.

## IMPORTANT

This app does not include MongoDB connection. To set up a development environemt, follow the steps below:

* Install mongodb: Installation guide [here](https://www.mongodb.com/docs/manual/administration/install-community/)
* Ensure an instance of MongoDB is running locally

# Getting Started

* Install a copy of the app locally
* Run `npm install` in the client directory
* Run `npm install` in the server directory
* Create a .env file in the client directory
* Create a .env file in the server directory

# Mapbox Setup

* Sign up for [MapBox](https://www.mapbox.com/)
* Generate a mapbox access token. More info on MapBox access tokens [here](https://docs.mapbox.com/help/getting-started/access-tokens/#how-access-tokens-work)
* Include the mapbox access token in the client side .env folder as a variable named 'REACT_APP_MAPBOX_ACCESS_TOKEN'

# Server Directory Setup

Create the following environment variables in the .env file:
* NODE_ENV=development
* PORT=1337
* DATABASE_URL=mongodb://localhost/map-app
* CORS_ORIGIN=http://localhost:3000

# Available Scripts

### `npm start`

Running this command in the client directory will start the client application in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run dev`

In the server directory, running this command will start the server side application in dev mode.
