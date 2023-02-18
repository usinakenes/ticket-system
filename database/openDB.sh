ID=$(docker ps -qf "name=biljettsystem_db_1")
docker exec -it $ID bash -c 'psql -U postgres -d pvk_db_dummy'
