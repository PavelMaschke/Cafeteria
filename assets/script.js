var totalRows = 0;

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

function initTableBest(){
  //bei bestandsliste die Tabelle erstellen
  tableArray = dbTable2.split(',')
  tableArray.pop();

  totalRows = tableArray.length / 3;

  for (var i = 0; i < (totalRows); i++) {
    hinzufuegen3(tableArray[i*3], tableArray[(i*3) + 1], tableArray[(i*3) + 2]);
  }
}

function buttonSave() {
  aufDBpacken();
  //getRequest('/success');
}

function initTableEink(){
  //bei bestandsliste die Tabelle erstellen
  tableArray = dbTable3.split(',');
  tableArray.pop();

  totalRows = tableArray.length / 4;

  for (var i = 0; i < (totalRows); i++) {
    let bestellen = parseInt(tableArray[(i*4) + 2]) - parseInt(tableArray[(i*4) + 1]);
    hinzufuegen5(tableArray[i*4], bestellen, tableArray[(i*4) + 1],tableArray[(i*4) + 2],tableArray[(i*4) + 3]);
  }
}

function initTableNrmlBestand(){
  tableArray = dbTableNrml.split(',');
  tableArray.pop();

  totalRows = tableArray.length / 3;

  for (var i = 0; i < (totalRows); i++) {
    hinzufuegenNormal(tableArray[i*3], tableArray[(i*3) + 1], tableArray[(i*3) + 2]);

  }
}

//zuBestellen(); sollte auferufen werden wenn die Bestelllistenseite geöffnet wird

function aufDBpacken() {
  var anzahl = 'x=';
  var neu = 'y=';

  for (var i = 1; i <= totalRows; i++) { //Alle Reihen durchgehen und die Werte der HTML Tabelle in einen String packen
    anzahl += document.getElementById('p' + i + '0').innerHTML + ',';
  }

  var extraRows = document.getElementById("ta2").rows.length;

  for (var i = 1; i < extraRows; i++) { //Alle Reihen durchgehen und die Werte der HTML Tabelle in einen String packen
    console.log('text' + (i + totalRows));

    if (document.getElementById('text' + (i + totalRows)).value != ''){
      neu += document.getElementById('text' + (i + totalRows)).value + ',';
      neu += document.getElementById('p' + (i + totalRows) + '0').innerHTML + ',';
      neu += document.getElementById('s' + (i + totalRows)).value + ',';
    }

  }

  postRequest('/bestandsliste', anzahl);
  postRequest('/addedRows', neu);
}


function updateNrmlBestand(){
  var normal = 'x=';

  for (var i = 1; i <= (totalRows); i++) {
    if (document.getElementById('p' + i + '0') != null) {
      normal += document.getElementById('p' + i + '0').innerHTML + ',';
      normal += document.getElementById('s' + (i + totalRows)).value + ',';;
    }

    console.log(document.getElementById('s' + (i + totalRows)).value);
  }

  postRequest('/updateNrmlBestand', normal);
}
/*function vonDBladen() {
  //dbVal = document.getElementById('hiddenValue').innerHTML;
  //var getData '';

  for (var i = 0; i < totalRows; i++) {
    //getData += dbVal[i].anzahl.toString() + ',';

    var bestand = document.getElementById('pb' + (i + 1) + '1').innerHTML;
    var vorhanden = dbVal.split(',')[i]; // nicht so sondern string an ',' teilen !!!

    document.getElementById('pn' + (i + 1) + '1').innerHTML = vorhanden;

    document.getElementById('p' + (i + 1) + '1').innerHTML = parseInt(bestand) - parseInt(vorhanden);
  }*/

  /*for (var i = 1; i <= totalRows; i++)
  { //Alle Reihen durchgehen
    var bestand = document.getElementById('pb' + i + '1').innerHTML;
    var vorhanden = val.charAt((i*2) - 1);

    document.getElementById('p' + i + '1').innerHTML = parseInt(bestand) - parseInt(vorhanden);
  }
  //console.log(document.getElementById('hiddenValue').innerHTML);
}*/

/*function addedRows(){
  var ergebnis = '';
  for (var i = totalRows + 1; i <= extraRows; i++) {

    var anzahl = document.getElementById('p' + i + '0').innerHTML;
    //var produkt = ;

    //var sql 'INSERT INTO bestand (produkt, anzahl) VALUES ' + produkt ', ' + anzahl + ';';

    ergebnis = 'new' + (i - totalRows) + '=' + sql + '&';
  }

  return ergebnis;
}*/

function hinzufuegen3(text, amount, menge) {
    var arow = document.getElementById("ta").rows.length;
    var a = arow + "0";
    var aid = "p" + a;

    $("#ta").append(
      '<tr>' +
        '<td>'+ text +'</td>' +
        '<td><button type=button onclick=buttonRemove('+ a +')>-</button><p id='+ aid +'>'+ amount +'</p><button type=button onclick=buttonAdd('+ a +')>+</button></td>' +
        '<td class=stck>'+ menge +'</td>' +
      '</tr>'
    );
}

function hinzufuegen5(text, bestellen, anzahl, normal, menge) {
    var arow = document.getElementById("ta").rows.length;
    var a = arow + "1";
    var aid = "p" + a;

    $("table").append(
      '<tr>' +
        '<td>'+ text +'</td>' +
        '<td><button type=button onclick=buttonRemove('+ a +')>-</button><p id='+ aid +'>'+ bestellen +'</p><button type=button onclick=buttonAdd('+ a +')>+</button></td>' +
        '<td><p>'+ anzahl +'</p></td>' +
        '<td><p>'+ normal +'</p></td>' +
        '<td class=stck>'+ menge +'</td>' +
      '</tr>'
    );
}

function hinzufuegenNeu() {
    var arow = document.getElementById("ta").rows.length + document.getElementById("ta2").rows.length -1;
    var a = arow + "0";
    var aid = "p" + a;
    var sid = "s" + arow;

    $("#ta2").append(
      '<tr>' +
        '<td><input id="text' + arow + '" type="text"></td>' +
        '<td><button type=button onclick=buttonRemove('+ a +')>-</button><p id='+ aid +'>0</p><button type=button onclick=buttonAdd('+ a +')>+</button></td>' +
        '<td class=stck>'+
          '<select id="'+ sid +'">'+
            '<option value="Stck.">Stck.</option>'+
            '<option value="Stck.">Bund</option>'+
          '</select>'+
        '</td>'+
      '</tr>'
    );
}
function hinzufuegenNormal(text, nrmlBestand, normal){
  var arow = document.getElementById("ta").rows.length;
  var a = arow + "0";
  var aid = "p" + a;
  var bid = "f" + arow;
  var sid = "s" + arow;

  $("#ta").append(
    '<tr id='+ bid +'>' +
      '<td>'+ text +'</td>' +
      '<td><button type=button onclick=buttonRemove('+ a +')>-</button><p id='+ aid +'>'+ nrmlBestand +'</p><button type=button onclick=buttonAdd('+ a +')>+</button></td>' +
      '<td class=stck>'+
        '<select id="'+ sid +'">'+
          '<option value="'+ normal +'">'+ normal +'</option>'+
          '<option value="Stck.">Stck.</option>'+
          '<option value="Bund">Bund</option>'+
        '</select>'+
      '<button type=button onclick=buttonRemoveRow('+ arow +')>x</button>'+
      '</td>'+
    '</tr>'
  );
}

/*function getRequest(url){
  var method = "GET";
  var request = new XMLHttpRequest();

  request.open(method, url);
  //request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send();
}*/

function buttonRemoveRow(row){
  var aid = "f" + row;
  var elem = document.getElementById(aid);
  elem.parentNode.removeChild(elem);

  postRequest('/removerow', 'x=' + row);
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
