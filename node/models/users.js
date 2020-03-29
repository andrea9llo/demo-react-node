const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

mongoose.model('users', usersSchema);