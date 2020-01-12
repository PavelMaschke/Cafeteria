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
  let valuesFromDB = await db.asyncquery('SELECT produkt, anzahl, menge FROM bestand;');

  for (var i = 0; i < valuesFromDB.length; i++) {
    getData += valuesFromDB[i].produkt.toString() + ',';
    getData += valuesFromDB[i].anzahl.toString() + ',';
    getData += valuesFromDB[i].menge.toString() + ',';
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

  var amountNewRows = arr.length / 3;

  for (var i = 0; i < amountNewRows; i++) {

    //let sql = stringToArray(req.body['new' + i]);
    let produkt = arr[i*2];
    let benoetigt = parseInt(arr[(i*2) + 1]);
    let menge = arr[(i*2) + 2];

    let sql = "INSERT INTO bestand (produkt, anzahl, normal, menge) VALUES ('"+ produkt +"', 0, "+ benoetigt +", '"+ menge +"');";

    console.log(sql);

    db.query(sql, function(err, results) {
        if (err) throw err;
    });
  }
});

app.get('/einkaufsliste', async function(req, res){
  var getData = '';
  let valuesFromDB = await db.asyncquery('SELECT produkt, anzahl, normal, menge FROM bestand;');

  for (var i = 0; i < valuesFromDB.length; i++) {
    getData += valuesFromDB[i].produkt.toString() + ',';
    getData += valuesFromDB[i].anzahl.toString() + ',';
    getData += valuesFromDB[i].normal.toString() + ',';
    getData += valuesFromDB[i].menge.toString() + ',';
  }

  res.render('einkaufsliste', {dbTableData: getData});
});

app.get('/success', function(req, res){
  res.render('success');
});

app.get('/normalerbestand', async function(req, res){
  var getData = '';
  let valuesFromDB = await db.asyncquery('SELECT produkt, normal, menge FROM bestand;');

  for (var i = 0; i < valuesFromDB.length; i++) {
    getData += valuesFromDB[i].produkt.toString() + ',';
    getData += valuesFromDB[i].normal.toString() + ',';
    getData += valuesFromDB[i].menge.toString() + ',';
  }

  res.render('normalerbestand', {dbTableData: getData});
});

app.post('/updateNrmlBestand', urlencodedParser, function(req, res){

  let msg = stringToArray(req.body.x);


  for (var i = 0; i < msg.length / 2; i++) {

    let sql = 'UPDATE bestand SET normal = '+ msg[i*2] +' WHERE id ='+ (i + 1) +';';
    console.log(sql);
    db.query(sql, function(err, results) {
      if (err) throw err;
    });


    sql = "UPDATE bestand SET menge = '"+ msg[(i*2) + 1]+"' WHERE id ="+ (i + 1) +";";
    console.log(sql);
    db.query(sql, function(err, results) {
      if (err) throw err;
    });
  }
});

app.post('/removerow', urlencodedParser, function(req, res) {
  let sql = 'DELETE FROM bestand WHERE id='+ req.body.x +';';

  console.log(sql);
  db.query(sql, function(err, results) {
    if (err) throw err;
  });

  //Damit id immer gleichmäßig größer wird:
  fixIDofDB();
});


function stringToArray(str){
  var  ergebnis= str.split(',');
  ergebnis.pop(); //letztes element leer -> löschen
  return ergebnis;
}

function queryArrayToDB(arr){

  arr.forEach(function(item, index){
    let sql = 'UPDATE bestand SET anzahl = '+ item +' WHERE id = ' + (index + 1) + ';' ;

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

function fixIDofDB(){

  db.query('SET @num := 0;', function(err, results) {
    if (err) throw err;
  });

  db.query('UPDATE bestand SET id = @num := (@num+1);', function(err, results) {
    if (err) throw err;
  });

  db.query('ALTER TABLE bestand AUTO_INCREMENT = 1;', function(err, results) {
    if (err) throw err;
  });



}

app.listen(8080, function(){
  console.log('Running on 8080');
});
