module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz', {
		pregunta: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-> Falta Pregunta\n"}}
		},
		respuesta: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-> Falta Respuesta\n"}}
		}
	})
}
