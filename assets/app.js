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

//damit auf function gewartet werdwen kann
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
  var getData = '';
  let valuesFromDB = await db.asyncquery('SELECT produkt, anzahl FROM bestand;');

  for (var i = 0; i < valuesFromDB.length; i++) {
    getData += valuesFromDB[i].produkt.toString() + ',';
    getData += valuesFromDB[i].anzahl.toString() + ',';
  }

  res.render('bestandsliste', {dbTableData: getData});
});

app.post('/bestandsliste', urlencodedParser, function(req, res) {

  let msg = stringToArray(req.body.x);
  console.log(msg);
  queryArrayToDB(msg);
});

app.post('/addedRows', urlencodedParser, function(req, res) {

  var arr = req.body.y.split(',');
  arr.pop();

  var amountNewRows = arr.length / 2;

  for (var i = 0; i < amountNewRows; i++) {

    //let sql = stringToArray(req.body['new' + i]);
    let produkt = arr[i*2];
    let benoetigt = parseInt(arr[(i*2) + 1]);

    let sql = 'INSERT INTO bestand (produkt, anzahl, normal) VALUES ('+ produkt +', 0, '+ benoetigt +');';

    console.log(sql);

    db.query(sql, function(err, results) {
        if (err) throw err;
    });
  }
});

app.get('/einkaufsliste', async function(req, res){
  var getData = '';
  let valuesFromDB = await db.asyncquery('SELECT produkt, anzahl, normal FROM bestand;');

  for (var i = 0; i < 7; i++) {
    getData += valuesFromDB[i].produkt.toString() + ',';
    getData += valuesFromDB[i].anzahl.toString() + ',';
    getData += valuesFromDB[i].normal.toString() + ',';
  }

  res.render('einkaufsliste', {dbTableData: getData});
});

app.get('/success', function(req, res){
  res.render('success');
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

/*function queryStringfromDB(){
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

}*/

app.listen(8080, function(){
  console.log('Running on 8080');
});
