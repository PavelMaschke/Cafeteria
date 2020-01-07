var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets/'));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

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

  /*let sql = 'CREATE TABLE bestand (id int AUTO_INCREMENT, produkt VARCHAR(255), anzahl int, PRIMARY KEY id);';
  db.query(sql, function(err){
    if(err) throw err;
    console.log('table created');
  });*/

});

app.get('/', function(req, res){
  res.render('index');
});

app.get('/bestandsliste', function(req, res){
  res.render('bestandsliste');
});

app.get('/einkaufsliste', function(req, res){
  res.render('einkaufsliste');
});

app.post('/bestandsliste', urlencodedParser, function(req, res) {
  console.log(req.body);
  console.log(req.body.x);
});

function doQuery(sql) {
  let query = db.query(sql, function(err, results) {
    if (err) throw err;
    console.log('the results are ' + results);
    return results;
  });
}

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






app.listen(8080, function(){
        console.log('Running on 8080');
});
