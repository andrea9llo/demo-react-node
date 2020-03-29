const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/users')
  .then(() => {
    console.log('db connesso');
  })
  .catch(err => (err));

// schema and model
require('./models/users');
const Users = mongoose.model('users');

// middleware body-parser
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// api login
app.post('/login', (req, res, next) => {
  const {
    username,
    password
  } = req.body;

  if (!username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if (!password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  Users.findOne({username: username}).then(user => {
    if (!user) {
      return res.status(404).json({errors: {
        message: 'utente non trovato'
      } });
    }
    if (password != user.password) {
      return res.status(500).json({errors: {
        message: 'password non corretta'
      }});
    } else {
      return res.status(200).json({data: user})
    }
  })
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server attivato sulla porta ${port}`);
});
