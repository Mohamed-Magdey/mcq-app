const db = require('../models');

exports.createQuestion = async function(req, res, next) {
    try{
        let {question, answers, correct} = req.body;

        let quesion = await db.Question.create({question, answers, correct});

        return res.status(201).json(quesion);
    } catch (err) {
        return next(err);
    }
};

exports.getQuestions = async function(req, res, next) {
  try {
      let questions = await db.Question.aggregate(
          [ { $sample: { size: 5 } } ]
      ).hint("_id_");  // prevent duplication
      return res.status(200).json(questions);
  } catch (err) {
      next(err);
  }
};

