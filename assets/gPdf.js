function createPDF2(){
  var lenght = document.getElementById("ta").rows.length;

    document.getElementByTagName('button').style.display = "none";

  window.setTimeout('window.print();',1000);

}
