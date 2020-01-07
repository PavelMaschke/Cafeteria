var totalRows = 7;

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
  aufDBpacken();
  //vonDBladen();
}

//zuBestellen(); sollte auferufen werden wenn die Bestelllistenseite geöffnet wird

function aufDBpacken() {
  var anzahl;
  for (var i = 1; i <= totalRows; i++)
  { //Alle Reihen durchgehen
    //document.getElementById('pn' + i + '1').innerHTML = document.getElementById('p' + i + '0').innerHTML; //weg

    anzahl[i] = document.getElementById('p' + i + '0').innerHTML + '&';
    //let sql = 'UPDATE bestand SET anzahl = '+ anzahl +' WHERE id = ' + i;

  }
  console.log(anzahl);
  sendRequest('/bestandsliste', JSON.stringify(anzahl));
}

function vonDBladen() {
  for (var i = 1; i <= totalRows; i++)
  { //Alle Reihen durchgehen
    var bestand = document.getElementById('pb' + i + '1').innerHTML;
    //var vorhanden = document.getElementById('pn' + i + '1').innerHTML; //weg

    //let sql = 'SELECT anzahl FROM bestand WHERE id = ' + i;
    //var vorhanden = doQuery(sql);

    //document.getElementById('p' + i + '1').innerHTML = parseInt(bestand) - parseInt(vorhanden);
  }
}

function sendRequest(url, postData){
  //für post-requests
  //var url = "/bestandsliste";
  var method = "POST";
  var shouldBeAsync = true;
  var request = new XMLHttpRequest();

  request.onload = function(){

  }

  request.open(method, url, shouldBeAsync);
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  request.send(postData);
}
