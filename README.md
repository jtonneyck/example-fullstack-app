# EXAMPLE FULL STACK APP - (Node Express handlebars mongoDB mongoose)

This code was produced during several live demos. It demonstrated how to build a full CRUD application with a login system, api usage (in the tv shows route) and rudimentary modular styling. You can find a live version<a href="https://movie-app-ironhack.herokuapp.com/"> here </a>. On the search route we also did an old school implementation of content that's loaded dynamically through axios and vanille dom manipulation. Next module we're going to use React for that!

This project needs the following .env vars in order to run:

.env
```
db=yourconnectionstring
session_secret=yoursessionsecret
PORT=yourportnumber
api_key_movies=yourapikeyfrom:http://themoviedb.org
```
You also need to seed the database. You can do that by executing `node data/seeds.js`. Afterwards run `npm install`, followed by `node app.js`.

<img src="./public/images/curtains.jpg"/>
