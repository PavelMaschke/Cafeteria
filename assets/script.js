var totalRows = 7;

function buttonAdd(row)
{
  var old = document.getElementById('p' + row).innerHTML
  document.getElementById('p' + row).innerHTML = parseInt(old) + 1;
}

function buttonRemove(row)
{
  var old = document.getElementById('p' + row).innerHTML
  if (old > 0)
  {
    document.getElementById('p' + row).innerHTML = parseInt(old) - 1;
  }
}

function buttonSave()
{
  nochVorhanden();
  zuBestellen();

  //var doc = new jsPDF();


  //doc.html(document.table, {
     //callback: function (doc) {
       //doc.save();
     //}
  //});
  //doc.save('a4.pdf');
}

function nochVorhanden()
{
  for (var i = 1; i <= totalRows; i++)
  { //Alle Reihen durchgehen
    document.getElementById('pn' + i + '1').innerHTML = document.getElementById('p' + i + '0').innerHTML;
  }
}

function zuBestellen()
{
  for (var i = 1; i <= totalRows; i++)
  { //Alle Reihen durchgehen
    var bestand = document.getElementById('pb' + i + '1').innerHTML;
    var vorhanden = document.getElementById('pn' + i + '1').innerHTML;

    document.getElementById('p' + i + '1').innerHTML = parseInt(bestand) - parseInt(vorhanden);
  }
}
