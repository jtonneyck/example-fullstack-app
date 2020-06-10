# EXAMPLE FULL STACK APP - (Node Express handlebars mongoDB mongoose)

This project needs the following .env vars in order to run:

.env
```
db=yourconnectionstring
session_secret=yoursessionsecret
PORT=yourportnumber
api_key_movies=yourapikeyfrom:http://themoviedb.org
```
You also need to seed the database. You can do that by executing `node data/seeds.js`. Afterwards run `npm install`, followed by `node app.js`.