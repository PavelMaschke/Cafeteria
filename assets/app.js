const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
  host    : 'localhost', //keine Ahnung
  user    : 'cafeteria',
  password: 'HWHBEYFPMAFkrxuip6qufuAz',
  database: 'cafeteria'
});

//connect
db.connect(function(err){
  if(err) throw err;
  console.log('connected');

  let sql = 'CREATE TABLE bestand(id int AUTO_INCREMENT, produkt VARCHAR(255), anzahl int, PRIMARY KEY id)';
  db.query(sql, function(err){
    if(err) throw err;
    console.log('table created');
  });

});

/*app.get('/creadedb', function(req, res) {
  let sql = 'CREATE DATABASE cafeteriadb';

  console.log('create DB...');

  db.query(sql, function(err) {
    if(!!err) {
      console.log(err);
    } else {
      console.log('succesful query')
    }
  });

});
*/
//create db
/*app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE cafeteriadb';

  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('database created');
  });
});*/


//create table
/*app.get('/createtable', function(req, res) {
  let sql = 'CREATE TABLE bestand(id int AUTO_INCREMENT, produkt VARCHAR(255), anzahl int, PRIMARY KEY id)';
  db.query(sql, function(err){
    if(err) throw err;
    console.log(result);
    res.send('database created');
  });
});*/






app.listen(3000, function(){
        console.log('Running on 3000');
});
