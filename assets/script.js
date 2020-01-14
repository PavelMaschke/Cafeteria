var totalRows = 0;
var deleteRows = [];

//Funktion um Zahl zu erhöhen
function buttonAdd(row) {
  var old = document.getElementById('p' + row).value
  document.getElementById('p' + row).value = parseInt(old) + 1;
}

//Funktion um Zahl zu reduzieren
function buttonRemove(row) {
  var old = document.getElementById('p' + row).value
  if (old > 0)
  {
    document.getElementById('p' + row).value = parseInt(old) - 1;
  }
}

//wird ausgeführt wenn Bestandsliste geladen ist
function initTableBest(){
  //Vom Server kommen Strings an. Die einzelnen Werte sind mit Kommas abgetrennt
  //hier wird dieser String wieder zu einem Array gemacht.
  tableArray = dbTable2.split(',')
  tableArray.pop(); //letzter Wert ist leer, also wird er gelöscht

  //in diesem Beispiel werden 3 Werte übertragen. Da drei Werte pro Zeile:
  totalRows = tableArray.length / 3;

  for (var i = 0; i < (totalRows); i++) {
    //für jede zeile wird nun der entsprechende Wert aus dem Array eingetragen
    hinzufuegen3(tableArray[i*3], tableArray[(i*3) + 1], tableArray[(i*3) + 2]);
  }
}

//wird ausgeführt wenn Einkaufsliste geladen ist
function initTableEink(){
  //bei bestandsliste die Tabelle erstellen
  tableArray = dbTable3.split(',');
  tableArray.pop();

  totalRows = tableArray.length / 4;

  for (var i = 0; i < (totalRows); i++) {
    let bestellen = parseInt(tableArray[(i*4) + 2]) - parseInt(tableArray[(i*4) + 1]);
    //es wird berechnet wie viel bestellt werden muss

    if (bestellen < 0){
      //da man nicht zB -6 Eier bestellen kann wird der Wert bei negativen Zahlen auf 0 gesetzt
      bestellen = 0;
    }
    hinzufuegen5(tableArray[i*4], bestellen, tableArray[(i*4) + 1],tableArray[(i*4) + 2],tableArray[(i*4) + 3]);
  }
}

//wird ausgeführt wenn Normalbestand Ändern geladen ist
function initTableNrmlBestand(){
  tableArray = dbTableNrml.split(',');
  tableArray.pop();

  totalRows = tableArray.length / 3;

  for (var i = 0; i < (totalRows); i++) {
    hinzufuegenNormal(tableArray[i*3], tableArray[(i*3) + 1], tableArray[(i*3) + 2]);

  }
}

//wird ausgeführt wenn auf der Bestandsliste gespeichert wird
function aufDBpacken() {
  var anzahl = 'x=';
  var neu = 'y=';

  for (var i = 1; i <= totalRows; i++) {
    anzahl += document.getElementById('p' + i + '0').value + ',';
    //die Anzahl aus jeder Zeile wird in den String gepackt
  }

  var extraRows = document.getElementById("ta2").rows.length;

  for (var i = 1; i < extraRows; i++) {
    //Die Werte aus den neu hinzugefügten Zeilen werden in einen String gepackt
    //Kommas darf man nicht in den Namen schreiben, da Kommas als abtrennung eines Wertes benutzt werdem
    if (document.getElementById('text' + (i + totalRows)).value.includes(',')){
      window.alert('Bitte kein Komma benutzen (Benutzen Sie lieber ein Punkt)');
    }

    //nur wenn kein Komma vorhanden und der Text nicht leer ist werden die Werte in den String gepackt
    if (document.getElementById('text' + (i + totalRows)).value != '' && !document.getElementById('text' + (i + totalRows)).value.includes(',')){
      neu += document.getElementById('text' + (i + totalRows)).value + ',';
      neu += document.getElementById('p' + (i + totalRows) + '0').value + ',';
      neu += document.getElementById('s' + (i + totalRows)).value + ',';
    }
  }

  //Werte an den Server senden
  postRequest('/bestandsliste', anzahl);
  postRequest('/addedRows', neu);

  //weiterleitung (muss verzögert sein, da manche browser den oberen Teil sonst nicht ausführen)
  window.setTimeout('window.location = "/erfolgreich"',200);
}

//wird ausgeführt wenn beim Normalbestand gespeichert wird
function updateNrmlBestand(){
  var normal = 'x=';

  for (var i = 1; i <= totalRows; i++) {
    if (document.getElementById('p' + i + '0') != null) {
      normal += document.getElementById('p' + i + '0').value + ',';
      normal += document.getElementById('s' + i).value + ',';
    }
  }

  //normalbestand zum Server schicken
  postRequest('/updateNrmlBestand', normal);

  var msg = 'x=';

  for (var i = 0; i < deleteRows.length; i++) {
    //jede gelöschte Zeile dem Server melden
    msg += deleteRows[i] + ',';
  }
  postRequest('/removerow', msg);

  //weiterleitung (muss verzögert sein, da manche browser den oberen Teil sonst nicht ausführen)
  window.setTimeout('window.location = "/erfolgreich2"',100);
}

//hinzufügen[zahl] fügt Tabellenzeilen in html hinzu. Die zahl steht für die Anzahl der Spalten
function hinzufuegen3(text, amount, menge) {
  //Text ist das Produkt, amount die anzahl und menge die einheit(stck., Liter, gramm,...)
    var arow = document.getElementById("ta").rows.length;//id für die nächste Zeile
    var a = arow + "0";//a ist immer in den Buttons + und -
    var aid = "p" + a; //aid ist immer die Id des zu bearbeitenden Werts

    $("#ta").append(//fügt in html mit id=ta ein
      '<tr>' +
        '<td>'+ text +'</td>' +
        '<td><button type=button onclick=buttonRemove('+ a +')>-</button><input type="text" name="none" id="'+ aid +'" value="'+ amount +'"><button type=button onclick=buttonAdd('+ a +')>+</button></td>' +
        '<td class=stck>'+ menge +'</td>' +
      '</tr>'
    );
}

function hinzufuegen5(text, bestellen, anzahl, normal, menge) {
    var arow = document.getElementById("ta").rows.length;
    var a = arow + "1";
    var aid = "p" + a;
    var aid2 = "r" + a;

    $("table").append(
      '<tr>' +
        '<td>'+ text +'</td>' +
        '<td><button type=button onclick=buttonRemove('+ a +')>-</button><input type="text" name="none" id="'+ aid +'" value="'+ bestellen +'"><p class="weg" id="'+ aid2 +'"></p><button type=button onclick=buttonAdd('+ a +')>+</button></td>' +
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
        '<td><input id="text' + arow + '" class="gross" type="text"></td>' +
        '<td><button type=button onclick=buttonRemove('+ a +')>-</button><input type="text" name="none" id="'+ aid +'" value="0"><button type=button onclick=buttonAdd('+ a +')>+</button></td>' +
        '<td class=stck>'+
          '<select id="'+ sid +'">'+
            '<option value="Stck.">Stck.</option>'+ //hier sind optionen für die Mengeneinheit
            '<option value="Bund">Bund</option>'+
            '<option value="g">g</option>'+
            '<option value="Pakete">Pakete</option>'+
            '<option value="Liter">Liter</option>'+
            '<option value="x">x</option>'+
            '<option value="Becher">Becher</option>'+
          '</select>'+
        '</td>'+
      '</tr>'
    );

    //document.getElementById('text' + arow).autofocus = true;

}
function hinzufuegenNormal(text, nrmlBestand, menge){
  var arow = document.getElementById("ta").rows.length;
  var a = arow + "0";
  var aid = "p" + a;
  var bid = "f" + arow;
  var sid = "s" + arow;

  $("#ta").append(
    '<tr id='+ bid +'>' +
      '<td>'+ text +'</td>' +
      '<td><button type=button onclick=buttonRemove('+ a +')>-</button><input type="text" name="none" id="'+ aid +'" value="'+ nrmlBestand +'"><button type=button onclick=buttonAdd('+ a +')>+</button></td>' +
      '<td class=stck>'+
        '<select id="'+ sid +'">'+
          '<option value="Stck.">Stck.</option>'+
          '<option value="Bund">Bund</option>'+
          '<option value="g">g</option>'+
          '<option value="Pakete">Pakete</option>'+
          '<option value="Liter">Liter</option>'+
          '<option value="x">x</option>'+
          '<option value="Becher">Becher</option>'+
        '</select>'+
      '</td>'+
      '<td><button class="xButton" type=button onclick=buttonRemoveRow('+ arow +')>x</button></td>'+ //ein zusätzlicher button der Zeilen löscht
    '</tr>'
  );

  $('#' + sid).val(menge);
}

//wird ausgeführt wenn eine Zeile gelöscht werden soll
function buttonRemoveRow(row){
  var aid = "f" + row;
  var elem = document.getElementById(aid);
  elem.parentNode.removeChild(elem); //löscht element

  deleteRows.push(row); //gibt an welche Zeilen gelöscht wurden. erst bei speichern werden dann alle zeilen in der DB gelöscht
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
