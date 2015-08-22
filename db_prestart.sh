#!/bin/bash
if [ !$DATABASE_URL ] && [ $POSTGRES_PORT_5432_TCP_ADDR ] && [ $POSTGRES_PORT_5432_TCP_PORT ]; then
   export DATABASE_URL=`printf "postgres://postgres:postgres@%s:%s/postgres" "$POSTGRES_PORT_5432_TCP_ADDR" "$POSTGRES_PORT_5432_TCP_PORT"`
fi
sequelize db:migrate --url=$DATABASE_URL
grunt seed
