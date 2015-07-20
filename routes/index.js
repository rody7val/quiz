var express = require('express');
var router = express.Router();

/* GET /question & /answer page. */
var quizController = require('../controllers/quiz_controller');

/* GET /author page. */
var authorController = require('../controllers/author_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);
router.get('/author', authorController.author);

module.exports = router;
