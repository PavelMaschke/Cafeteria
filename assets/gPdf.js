function createPDF2(){
  var lenght = document.getElementById("ta").rows.length;

  for (var i = 0; i < length; i++) {
    document.getElementById(lenght + "1").style.display = "none";
  }

  window.print();
}
