var totalRows = 7;
var extraRows = 7;

function buttonAdd(row) {
  var old = document.getElementById('p' + row).innerHTML
  document.getElementById('p' + row).innerHTML = parseInt(old) + 1;
}

function buttonRemove(row) {
  var old = document.getElementById('p' + row).innerHTML
  if (old > 0)
  {
    document.getElementById('p' + row).innerHTML = parseInt(old) - 1;
  }
}

function buttonSave() {
  //aufDBpacken();
  vonDBladen();
}

//zuBestellen(); sollte auferufen werden wenn die Bestelllistenseite geöffnet wird

function aufDBpacken() {
  var anzahl = 'x=';

  for (var i = 1; i <= totalRows; i++)
  { //Alle Reihen durchgehen und die Werte der HTML Tabelle in einen String packen
    anzahl += document.getElementById('p' + i + '0').innerHTML + ',';
  }
  postRequest('/bestandsliste', anzahl);
  postRequest('/addedRows', addedRows());
}

function vonDBladen() {
  //val = document.getElementById('hiddenValue').innerHTML;
  var dbVal = getRequest('/einkaufsliste');
  //var getData '';

  for (var i = 0; i < totalRows; i++) {
    //getData += dbVal[i].anzahl.toString() + ',';

    var bestand = document.getElementById('pb' + (i + 1) + '1').innerHTML;
    var vorhanden = dbVal[i].anzahl.toString();
    document.getElementById('p' + i + '1').innerHTML = parseInt(bestand) - parseInt(vorhanden);
  }

  /*for (var i = 1; i <= totalRows; i++)
  { //Alle Reihen durchgehen
    var bestand = document.getElementById('pb' + i + '1').innerHTML;
    var vorhanden = val.charAt((i*2) - 1);

    document.getElementById('p' + i + '1').innerHTML = parseInt(bestand) - parseInt(vorhanden);
  }*/
  //console.log(document.getElementById('hiddenValue').innerHTML);
}

function addedRows(){
  var ergebnis = '';
  for (var i = totalRows + 1; i <= extraRows; i++) {

    var anzahl = document.getElementById('p' + i + '0').innerHTML;
    //var produkt = ;

    //var sql 'INSERT INTO bestand (produkt, anzahl) VALUES ' + produkt ', ' + anzahl + ';';

    ergebnis = 'new' + (i - totalRows) + '=' + sql + '&';
  }

  return ergebnis;
}

function postRequest(url, postData){
  //für post-requests
  var method = "POST";
  var shouldBeAsync = true;
  var request = new XMLHttpRequest();

  request.open(method, url, shouldBeAsync);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(postData);
}

function getRequest(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
