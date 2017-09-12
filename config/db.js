let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  socketPath: '/tmp/mysql.sock',
  user     : 'root',
  password : 'simplonmars',
  database : 'nodejsExpressJS'
});


connection.connect()

module.exports = connection;
