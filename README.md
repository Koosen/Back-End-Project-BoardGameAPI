# Board Game API

## Link to hosted version

You can find a hosted version of this at https://back-end-project-boardgameapi.herokuapp.com/

## Summary of this project

This project was completed as a way to solidify my recent learning. It is a backend API that serves boardgame reviews from users and allows comments to be posted to the reviews. You can find a detailed list of end points for the API at https://back-end-project-boardgameapi.herokuapp.com/api/

## How to download and use locally
please follow the instructions below 

### Clone the Repo
In your terminal use `git clone https://github.com/Koosen/Back-End-Project-BoardGameAPI.git`.

### Install Dependencies
In your terminal use `npm install`.

This will install the dependcies needed for the api to run.

### Seeding a New Database
In your terminal use `npm seed`.

This will seed a new local database

### Run Tests
In your terminal use `npm test`.

this will run the testing suite.

### Setting up Environments
You will need to create two files to allow the app to change between the development and the test enviroments.

The first file you will need to create is `.env.development`. Enter `PGDATABASE=nc_games` into this file.

The second file you will need to create is `.env.test`. Enter `PGDATABASE=nc_games_test` into this file.


## Minimum versions needed
Node must be 6.9.0 or higher.

Postgres must be 14.0 or higher.
