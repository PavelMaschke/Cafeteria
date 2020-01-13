function createPDF2(){

  var x = document.getElementsByTagName('button');

  for (var i = 0; i < x.length; i++) {
    x[i].style.display = "none";
    x[i].style.visibility = "hidden";
  }

  //window.setTimeout('window.print();',1000);

}
