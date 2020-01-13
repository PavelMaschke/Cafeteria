function PDFnone(){

  var x = document.getElementsByTagName('button');

  for (var i = 0; i < x.length; i++) {
    x[i].style.display = "inline";
  }

  //window.setTimeout('window.print();',1000);
}

function createPDF2() {

  var elem = document.getElementsByTagName('button');
  elem.parentNode.removeChild(elem);

  window.print();
}
