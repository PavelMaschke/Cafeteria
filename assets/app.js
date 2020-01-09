var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var util = require('util');

var pause = false;

var app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets/'));


var urlencodedParser = bodyParser.urlencoded({ extended: false });

const db = mysql.createConnection({
  host    : 'localhost', 
  user    : 'cafeteria',
  password: 'HWHBEYFPMAFkrxuip6qufuAz',
  database: 'cafeteria'
});

db.asyncquery = util.promisify(db.query).bind(db);

//connect
db.connect(function(err){
  if(err) throw err;
  console.log('connected');
});



app.get('/', function(req, res){
  res.render('index');
});

app.get('/bestandsliste', async function(req, res){
	console.log(test);
  	res.render('bestandsliste');
});

app.post('/bestandsliste', urlencodedParser, function(req, res) {

  let msg = stringToArray(req.body.x);
  console.log(msg);
  queryArrayToDB(msg);
});

app.get('/einkaufsliste', async function(req, res){

  bestand = await db.asyncquery('SELECT anzahl FROM bestand;');
  console.log(bestand);
  res.render('einkaufsliste', {dbValues: bestand});
  
});

function stringToArray(str){
  var  ergebnis= str.split(',');
  ergebnis.pop(); //letztes element leer -> löschen
  return ergebnis;
}

function queryArrayToDB(arr){
  var sql = '';
  arr.forEach(function(item, index){
    sql = 'UPDATE bestand SET anzahl = '+ item +' WHERE id = ' + (index + 1) + ';' ;


    //run query
    db.query(sql, function(err, results) {
      if (err) throw err;
    });
  });
}

function queryStringfromDB(){
  pause = true;
  var arr = [];
  var querySent = [];
  var getData = '';

  db.query('SELECT anzahl FROM bestand;', function(err, results, fields) {
    if (err) throw err;

    while(results == null){
      //warten bis die query fertig ist
    }
    querySent = results;

    //ergebnis der query in String umwandeln
    for (var i = 0; i < 7; i++) {
      getData += querySent[i].anzahl.toString() + ',';
    }
  });

  pause = false;
  return getData;

}

app.listen(8080, function(){
  console.log('Running on 8080');
});
