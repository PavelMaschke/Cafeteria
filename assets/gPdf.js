function PDFnone(){

  var x = document.getElementsByTagName('button');

  for (var i = 0; i < x.length; i++) {
    x[i].style.display = "inline";
  }

  //window.setTimeout('window.print();',1000);
}

function createPDF() {


  document.body.innerHTML = document.getElementById("ta").innerHTML;

  var elem = document.getElementsByTagName('button');

  for (var i = 0; i < elem.length; i++) {
    elem[i].parentNode.removeChild(elem[i]);
  }

  window.print();
}
