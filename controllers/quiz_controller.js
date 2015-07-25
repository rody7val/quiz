var models = require('../models/models.js')

// GET /quizes/:id
exports.show = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: quiz});
	})
};

// GET /quizes/answer
exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if (req.query.respuesta === quiz.respuesta) {
			res.render('quizes/answer', {
				respuesta: 'Correcto',
				quiz: quiz
			});
		}else{
			res.render('quizes/answer', {
				respuesta: 'Incorrecto',
				quiz: quiz
			});
		}
	})
};

// GET /quizes/
exports.index = function(req, res){
	if(req.query.search){
		var s = '%' + req.query.search.replace(' ', '%') + '%';
		models.Quiz.findAll({
			where: ["pregunta like ?", s]
		}).then(function(quizes){
			res.render('quizes/index.ejs', {quizes: quizes});
		})
	}else{
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index.ejs', {quizes: quizes});
		})
	}
};