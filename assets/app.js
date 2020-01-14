//alle benötigten Packages
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var util = require('util');

var port = 8080;

//Zum Server starten
var app = express();

//es werden keine html sonder ejs datein benutzt
app.set('view engine', 'ejs');
//damit nicht nur ejs dateien sondern auch alle anderen dateien (css,...) dem client
//zur verfügung stehen:
app.use('/assets', express.static('assets/'));

//für http post requests notwendig
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//connection zur datenbank auf dem server definieren
const db = mysql.createConnection({
  host    : 'localhost',
  user    : 'cafeteria',
  password: 'HWHBEYFPMAFkrxuip6qufuAz',
  database: 'cafeteria'
});

//damit auf function gewartet werden kann (code wird sonst ausgeführt bevor die function
//zuvor zuende ist)
db.asyncquery = util.promisify(db.query).bind(db);

//connect zur datenbank
db.connect(function(err){
  if(err) throw err;
  console.log('connected');
});

//app.get ist für http-get-request: urls werden hier abgefangen
//app.post ist für http-post-request: daten, die an server gesendet werden hier abfangen


//Startseite -----------------------------------------------------------
app.get('/', function(req, res){
  //res.render schickt die daten an den client
  res.render('index');
});

//Bestandsliste ------------------------------------------------------------
app.get('/bestandsliste', async function(req, res){
  var getData = '';

  //db.asyncquery bzw db.query schicken eine MySQL-query an die Datenbank
  let valuesFromDB = await db.asyncquery('SELECT produkt, anzahl, menge FROM bestand;');

  //Diese for-schleifen sorgen dafür dass die Daten in einen String gespeichert werden,
  //da dieser am einfachsten gesendet werden kann.

  for (var i = 0; i < valuesFromDB.length; i++) {
    getData += valuesFromDB[i].produkt.toString() + ',';
    getData += valuesFromDB[i].anzahl.toString() + ',';
    getData += valuesFromDB[i].menge.toString() + ',';
  }
  res.render('bestandsliste', {dbTableData: getData});
});

app.post('/bestandsliste', urlencodedParser, function(req, res) {

  let msg = stringToArray(req.body.x);
  queryArrayToDB(msg);
});

app.post('/addedRows', urlencodedParser, function(req, res) {
  //wird ausgeführt wenn auf Bestätigen gedrückt wird und die neuen zeilen in die DB sollen
  var arr = req.body.y.split(',');
  arr.pop();

  var amountNewRows = arr.length / 3;

  for (var i = 0; i < amountNewRows; i++) {

    //let sql = stringToArray(req.body['new' + i]);
    let produkt = arr[i*3];
    let benoetigt = parseInt(arr[(i*3) + 1]);
    let menge = arr[(i*3) + 2];

    let sql = "INSERT INTO bestand (produkt, anzahl, normal, menge) VALUES ('"+ produkt +"', 0, "+ benoetigt +", '"+ menge +"');";

    console.log(sql);
    db.query(sql, function(err, results) {
        if (err) throw err;
    });
  }
});

//Einkaufsliste ------------------------------------------------------
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

//Normalbestand ----------------------------------------------------
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
    db.query(sql, function(err, results) {
      if (err) throw err;
    });


    sql = "UPDATE bestand SET menge = '"+ msg[(i*2) + 1]+"' WHERE id ="+ (i + 1) +";";
    db.query(sql, function(err, results) {
      if (err) throw err;
    });
  }
});

app.post('/removerow', urlencodedParser, function(req, res) {

  let msg = req.body.x.split(',');
  msg.pop();

  console.log(msg);

  for(var i = 0; i < msg.length; i++){

    let sql = 'DELETE FROM bestand WHERE id='+ msg[i] +';';

    console.log(sql);
    db.query(sql, function(err, results) {
      if (err) throw err;
    });
  }

  //Damit id auf der db immer gleichmäßig größer wird:
  fixIDofDB();
});

//Erfolgreich -------------------------------------------------------
app.get('/erfolgreich', function(req, res) {
  res.render('success');
});

app.get('/erfolgreich2', function(req, res) {
  res.render('success2');
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

//damit die id's in der Datenbank immer 1, 2, 3,... verläuft muss AUTO_INCREMENT in der DB resettet werden
//und neu verteilt werden (Dieses Problem war nicht leicht zu lösen deswegen diese Lösung aus dem Internet)
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

//auf port 8080 wird auf die requests gewartet
app.listen(port, function(){
  console.log('Running on ' + port);
});
