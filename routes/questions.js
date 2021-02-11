const express = require('express'),
      router = express.Router(),
      {createQuestion, getQuestions} = require('../controllers/questions');

router
    .route('/')
    .post(createQuestion)
    .get(getQuestions);

module.exports = router;