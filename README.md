# biljettsystem
PVK Project 2022

## How to run
For the whole application to work properly, you need to run the client, server and database at the same time.

### Pre requirements
Make sure you have [docker](https://www.docker.com/products/docker-desktop) and [docker-compose](https://docs.docker.com/compose/install/).

### Start
Run this command from the root directory:
```
docker-compose up
```

Then navigate to http://localhost:3000/.

To only start one service, run `docker-compose up <service>`. For example, to only start the client, run `docker-compose up client`.

### Exit
To exit out of the terminal, press `ctrl+c`, then run this command:

```
docker-compose down
```

### Problems?
If you have problems, try this:

* Delete all `node_modules` folders.
* Delete `database/pgdata` folder (this will delete your local database changes).
* Run `docker-compose up --build` to force a rebuild for all services.

#### NodeJS and npm
If you need node/npm/npx, download NodeJS [here](https://nodejs.org/en/).

#### Docker
Remove all volumes: `docker volume rm $(docker volume ls -q)`.