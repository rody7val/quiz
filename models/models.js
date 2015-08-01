var path = require('path');

//Postgres DATABASE_URL = postgress://user:passwd@host:port/database
//Postgres DATABASE_URL = postgress://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
	{ dialect: protocol, 
		protocol: protocol,
		port: port,
		host: host,
		storage: storage,  //solo SQLite (.env)
		omitNull: true		 //solo Postgres
	}
);

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; //exportar definicion de tabla Quiz

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
	//then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){

		if(count === 0) { //la tabla se inicializa solo si esta vacia
			Quiz.create({
				pregunta: 'Capital de Italia?', 
				respuesta: 'Roma'					
			})
			Quiz.create({
				pregunta: 'Capital de Portugal?', 
				respuesta: 'Lisboa'					
			})
			.then(function(){
				console.log('Base de datos inicializada')
			})
		}
	})
});