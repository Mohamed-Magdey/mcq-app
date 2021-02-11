const mongoose = require('mongoose');


const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
        unique: true
    },
    answers: [{
        type: String,
        required: true,
    }],
    correct: {
        type: String,
        required: true,
    }
});


let Question = mongoose.model('Question', questionSchema);

module.exports = Question;