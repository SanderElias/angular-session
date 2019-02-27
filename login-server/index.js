const express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
const app = express();
const port = 3000;

const whitelist = ['http://localhost:1234'];

app.use(
  cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  })
);
app.use(
  session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.post('/dashboard', function(req, res) {
  if (req.session.username) {
    res.header('Content-Type', 'application/json');
    res.send({ msg: 'Dashboard Page' });
  } else {
    res.header('Content-Type', 'application/json');
    res.send({ msg: 'Please Login First' });
  }
});

app.route('/login').post(function(req, res) {
  if (req.session.username) {
    req.session.username = 'amy';
    res.header('Content-Type', 'application/json');
    res.send({ msg: 'already logged in!' });
  } else {
    req.session.username = 'amy';
    res.header('Content-Type', 'application/json');
    res.send({ msg: 'successfully logged In!' });
  }
});

app.route('/logout').post(function(req, res) {
  if (req.session.username) {
    req.session.destroy();
    res.header('Content-Type', 'application/json');
    res.send({ msg: 'successfully logged out!' });
  } else {
    req.session.destroy();
    res.header('Content-Type', 'application/json');
    res.send({ msg: 'session not found!' });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
