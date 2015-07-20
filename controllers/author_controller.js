// GET /quizes/answer
exports.author = function(req, res){
	res.render('author', {
		nombre: 'Rodolfo',
		apellido: 'Valguarnera',
		imagen: '/images/index.jpeg',
		email: 'rod7val@gmail.com'
	});
};