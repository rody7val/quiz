module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz', {
		pregunta:  DataTypes.STRING,
		respuesta: DataTypes.STRING
	}, {
  		indexes: [
  			{ fields: sequelize.fn('lower', sequelize.col('name')) }]
	})
}
