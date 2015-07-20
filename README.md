# Dice Tower Top Ten Lists API

a [Sails](http://sailsjs.org) application

## API

##### GET /games
##### GET /games/:name

## Run locally

To run locally with Docker, you'll need:

* Docker (``apt-get install docker``)
* Docker-compose (``pip install docker-compose``)

To build the environment:

```
$ docker-compose build
$ docker-compose run webapp sequelize --url=postgres://postgres:postgres@postgres/postgres db:migrate
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

If you need a shell:

```
$ docker-compose run webapp /bin/bash
```