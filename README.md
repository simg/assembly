# Assembly

An open source Quora clone (kind of) that is currently an experiment in building applications with:

* GraphQL
* Postgraphile
* Postgres
* Svelte
* Urql
* Traefik
* Docker & Docker Compose

## Installation
install docker and docker compose

```
git clone https://github.com/simg/assembly.git
cd assembly
cd svelte
npm i
cd ../graphile
npm i
cd ..
docker-compose up
```

## Usage

Application UI on :5080/

GraphiQL UI on :5080/graphiql

PG Admin on :5050

## TODO

Everything.

Not least, there is currently no authenticaton so the back end is hacked to think that every request is user.id = 1

I also know that I can get Docker to run the npm installs during installation. It's on the list but I needed to show someone this today ...

Clearly, not suitable for use in production!