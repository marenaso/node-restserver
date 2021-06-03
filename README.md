# Webserver starter pack

This is a node webserver for users management.

## Execute mongodb with docker

* Download mongodb image with ```docker pull mongo```
* Create folder `~/data`
* Run container with ```docker run -d --name mongo -p 27017:27017 -v ~/data:/data/db mongo```

## Run service

### Using node

* Execute ```node server/server.js```

### Using nodemon

* Install nodemon with ```npm install -g nodemon```
* Execute ```nodemon server/server.js```
