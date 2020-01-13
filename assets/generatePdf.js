function createPDF2() {
  //Tabelle angeben
  var sTable = document.getElementById('drucken').innerHTML;
  document.getElementById('p11').innerHTML = document.getElementById('p11').value;

  console.log(document.getElementById('p11').innerHTML);
  //console.log(sTable);

  //style angeben (+ und - buttons sollen nicht angezeigt werden)
  var style = "<style>";
  style = style + "button {display: none;}";
  style = style + "td {text-align: right;}";
  style = style + "</style>";

  //neues Fenster öffnen
  var win = window.open('', '', 'height=700,width=700');

  //html text für dieses neue fenster mit dem style und der tabelle
  win.document.write('<html><head>');
  win.document.write('<title>Einkaufsliste</title>');
  win.document.write(style);
  win.document.write('</head>');
  win.document.write('<body>');
  win.document.write(sTable);
  win.document.write('</body></html>');

  win.document.close();
  //Tabelle wird gedruckt
  win.print();
}
