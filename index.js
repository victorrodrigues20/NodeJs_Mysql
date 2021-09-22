const express = require('express');
const mysql  = require('mysql');
const cors = require('cors');

require('dotenv').config()

var config = {
  host     : process.env.DBHOST,
  port     : process.env.DBPORT,
  user     : process.env.DBUSER,
  password : process.env.DBPASSWORD,
  database : process.env.DBDATABASE
};

const server = express();

// Permitir que o server trabalhe com JSON
server.use(express.json());

server.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", "*");
    server.use(cors());
    next();
});

var connection = mysql.createConnection(config);

server.get('/', (req, res) => res.send("Servico rodando!!!"));

//GET  
server.get('/api/produtos',function(req,res){  
  var qry = "select * from PRODUTOS";  
  connection.query(qry,function(err,rows){  
      if(err)  
          throw err;  
      console.log(rows);  
      res.json(rows);  
  });  
});

//POST  
server.post('/api/produtos', function(req,res){  
  var qry = "insert into PRODUTOS values (DEFAULT, '"+req.body.nome+"', "+ req.body.preco +", NOW())";  
  console.log(qry);
  connection.query(qry,function(err,rows){  
      if(err) 
      {
          console.log(err.message); 
          throw err;  
      }
      console.log("Registro adicionado com sucesso");  
      res.send("Registro adicionado com sucesso")  
  });  
});

port = process.env.PORT || 3000

server.listen(port);
console.log('Rodando servico: ' + port);