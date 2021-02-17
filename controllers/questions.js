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

function getRandom(arr, n) {
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}


exports.getQuestions = async function(req, res, next) {
  try {
      let questions = await db.Question.aggregate(
          [ { $sample: { size: 5 } } ]
      ).hint("_id_");  // prevent duplication
      questions = questions.map(question => ({...question, answers: getRandom(question.answers, question.answers.length)}));

      return res.status(200).json(questions);
  } catch (err) {
      next(err);
  }
};

