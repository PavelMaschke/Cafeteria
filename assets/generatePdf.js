function createPDF2() {
  //Tabelle angeben

//die Values aus den <input>s werden nicht übernommen, weshalb sie in die leeren <p>s gepackt werden
  for (var i = 1; i <= totalRows; i++) {
    document.getElementById('r' + i + '1').innerHTML = document.getElementById('p' + i + '1').value;
  }

  var sTable = document.getElementById('drucken').innerHTML;


  //style angeben (+ und - buttons sollen nicht angezeigt werden)
  var style = "<style>";
  style = style + "button {display: none;}";
  style = style + "td {text-align: right;}";
  style = style + "input {display: none;}";
  style = style + ".weg {display: inline;}";
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
