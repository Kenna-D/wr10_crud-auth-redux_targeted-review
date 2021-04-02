require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = require('express-session');
const authCtrl = require('./controllers/authController');
const jokeCtrl = require('./controllers/jokesController');

const { SERVER_PORT, DB_STRING, SESSION_SECRET } = process.env;

app.use(express.json());

app.use(
  session({
    resave: false, 
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      magAge: 1000 * 60 * 60 * 24 * 7 * 4
    }
  })
)

// auth endpoints
app.post('/auth/register', authCtrl.register); //req.body
app.post('/auth/login', authCtrl.login); //req.body
app.delete('/auth/logout', authCtrl.logout); //recieve no data
app.get('/auth/session', authCtrl.getSession);  //recieve no data

// jokes endpoints
app.get('/api/jokes', jokeCtrl.getJokes); // optionally recieves req.query
app.post('/api/jokes', jokeCtrl.addJoke); //req.body
app.put('/api/jokes/:joke_id', jokeCtrl.editJoke); //req.params, req.body
app.delete('/api/jokes/:joke_id', jokeCtrl.deleteJoke); //req.params


massive({
    connectionString: DB_STRING,
    ssl: {
      rejectUnauthorized: false,
    },
}).then((dbInstance) => {
    app.set('db', dbInstance)
    app.listen(SERVER_PORT, () =>
      console.log(`DB is up & Server killing it on port ${SERVER_PORT}`)
    )
}).catch(err => {
    console.log(err)
});