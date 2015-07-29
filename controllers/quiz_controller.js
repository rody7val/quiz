var models = require('../models/models.js')

exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if (quiz){
				req.quiz = quiz;
				next();
			}else{ next(new Error('No existe quizId=' + quizId)) }
		}
	).catch(function(error){ next(error); })
}

// GET /quizes/:id
exports.show = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: req.quiz});
	})
};

// GET /quizes/answer
exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if (req.query.respuesta === req.quiz.respuesta) {
			res.render('quizes/answer', {
				respuesta: 'Correcto',
				quiz: req.quiz
			});
		}else{
			res.render('quizes/answer', {
				respuesta: 'Incorrecto',
				quiz: req.quiz
			});
		}
	})
};

// GET /quizes/
exports.index = function(req, res){
	if(req.query.search){
		var s = req.query.search;
		// var s = '%' + req.query.search.replace(' ', '%') + '%';
		models.Quiz.findAll({
			where: ["pregunta ILIKE ?", ('%'+s+'%').replace(/\s+/g,'%') ]
		}).then(function(quizes){
			res.render('quizes/index.ejs', {quizes: quizes});
		})
	}else{
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index.ejs', {quizes: quizes});
		})
	}
};