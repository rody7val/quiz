// GET /quizes/answer
exports.author = function(req, res){
	res.render('author', {
		full_name: 'Rodolfo Valguarnera',
		imagen: '/images/index.jpeg',
		email: 'rod7val@gmail.com'
	});
};