function createPDF2(){
  var lenght = document.getElementById("ta").rows.length;

  var x = document.getElementByTagName('button');

  for (var i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  window.setTimeout('window.print();',1000);

}
