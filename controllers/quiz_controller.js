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
		res.render('quizes/show', {quiz: req.quiz, errors: []});
	})
};

// GET /quizes/answer
exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if (req.query.respuesta === req.quiz.respuesta) {
			res.render('quizes/answer', {
				respuesta: 'Correcto',
				quiz: req.quiz,
				errors: []
			});
		}else{
			res.render('quizes/answer', {
				respuesta: 'Incorrecto',
				quiz: req.quiz,
				errors: []
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
			where: ["pregunta LIKE ?", ('%'+s+'%').replace(/\s+/g,'%') ]
		}).then(function(quizes){
			res.render('quizes/index.ejs', {quizes: quizes, errors: []});
		}).catch(function(error){ next(error); })
	}else{
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index.ejs', {quizes: quizes, errors: []});
		}).catch(function(error){ next(error); })
	}
};

// GET /quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build( // crea obj quiz
		{pregunta: 'Pregunta', respuesta: 'Respuesta'}
	);
	res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res){
	var quiz = models.Quiz.build( req.body.quiz );

	quiz
	.validate()
	.then(
		function(err){
			if (err){
				res.render('quizes/new', {quiz: quiz, errors: err.errors});
			}else{
				quiz  //guarda en DB los campos pregunta y respuesta de quiz
				.save({fields: ['pregunta', 'respuesta']})
				.then(function(){ res.redirect('/quizes')})
			}  // Redireccion HTTP (url relativo) lista de preguntas
		}
	);

};