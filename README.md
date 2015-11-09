# Dice Tower Top Ten Lists API

[![Circle CI](https://circleci.com/gh/wilsonianb/dice-tower-top-ten.svg?style=svg)](https://circleci.com/gh/wilsonianb/dice-tower-top-ten)

a [Sails](http://sailsjs.org) application

## API

##### GET /games
##### GET /games/:id
##### GET /games/:id/rankings
##### GET /lists
##### GET /lists/:id
##### GET /lists/:id/rankings

## Run locally

To run locally with Docker, you'll need:

* Docker (``apt-get install docker``)
* Docker-compose (``pip install docker-compose``)

To build the environment:

```
$ docker-compose build
```

To run migrations on the database (run automatically with `npm start`):

```
$ docker-compose run webapp sequelize --url=postgres://postgres:postgres@postgres/postgres db:migrate
```

To seed the db with top_ten_lists.csv (run automatically with `npm start`):

```
$ docker-compose run webapp npm run seed
```

To bring up the environment:

```
$ docker-compose up
```

The application will now be running on localhost:1337.

Any modifications to the code will require a restart of the webapp container.
Usually you can ^C and re-run ``docker-compose up webapp``

To run tests:

```
$ docker-compose run webapp npm test
```

NOTE: Tests truncate local db tables

If you need a shell:

```
$ docker-compose run webapp /bin/bash
```