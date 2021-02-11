const mongoose = require('mongoose');

mongoose.Promise = Promise;

const DB_URI = process.env.DB || 'mongodb://localhost/mcq';

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

module.exports.Question = require('./Question');
