# Database
PostgreSQL database.

## How to run
Run this command from the root directory:
```
docker-compose up db
```

### Fresh data
To start over with fresh data, delete the `pgdata/` folder and then add some dummy data.

### Add dummy data
From the `server` directory:
1. `npx prisma migrate dev`
1. `npx prisma db seed`

### Access the database
Run the `./database/openDB.sh` script.
