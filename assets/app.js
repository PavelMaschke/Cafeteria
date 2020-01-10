var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var util = require('util');

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

<<<<<<< HEAD
=======
//damit auf function gewartet werdwen kann
>>>>>>> cc9ad38cbf55902b531a828b16005feab3754c36
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

<<<<<<< HEAD
app.get('/einkaufsliste', async function(req, res){
=======
app.post('/addedRows', urlencodedParser, function(req, res) {

  for (var i = 0; i < req.body.length(); i++) {

    let sql = stringToArray(req.body['new' + i]);

    db.query(sql, function(err, results) {
        if (err) throw err;
    });
  }

  console.log(msg);
  queryArrayToDB(msg);
});

app.get('/einkaufsliste', function(req, res){
>>>>>>> cc9ad38cbf55902b531a828b16005feab3754c36

<<<<<<< HEAD
  bestand = await db.asyncquery('SELECT anzahl FROM bestand;');
  console.log(bestand);
  res.render('einkaufsliste', {dbValues: bestand});
  
=======
  let valuesFromDB = queryStringfromDB();
  console.log(valuesFromDB);
  res.render('einkaufsliste', {dbValues: valuesFromDB});
>>>>>>> fe562d7d86c9852b3ba6879bdf90ff4630a3f46d
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
  var arr = [];
  var querySent = [];
  var getData = '';

  db.asyncquery('SELECT anzahl FROM bestand;', function(err, results, fields) {
    if (err) throw err;

     //while(results == null){
      //warten bis die query fertig ist
    //}
    querySent = results;

    //ergebnis der query in String umwandeln
    for (var i = 0; i < 7; i++) {
      getData += querySent[i].anzahl.toString() + ',';
    }
  });

  return getData;

}

app.listen(8080, function(){
  console.log('Running on 8080');
});
