function lr() {
  document.getElementById("home").style.display = "block";
  document.getElementById("load").style.display = "none";

}

function ld() {
  document.getElementById("home").style.display = "none";
  document.getElementById("load").style.display = "block";
  setTimeout("lr()", 1500);
}

function lod() {
  
  document.getElementById("home").style.display = "none";
  document.getElementById("load").style.display = "block";
  bin();
  setTimeout("lr()", 600);
  
}

function bin() {
  document.getElementById("as")
    .innerHTML = "";
  var s = "<center>";
  var x;
  var y;
  for (x = 0; x < 10; x++) {
    var g = ""
    for (y = 0; y < 20; y++) {
      g += Math.floor(Math.random() * 2);
    }
    s += "<p>" + g + "</p>"
  }
  s += "<center>";
  document.getElementById("as")
    .innerHTML = s;
  setInterval("bin()", 1);
}


function cls() {
  document.getElementById("sidenav").style.width = "0";
}

function sdn() {
  document.getElementById("sidenav").style.width = "40%";
}

artnum="";
function bfunc(param){
  document.getElementById(param).style.display = "block";
  if (artnum.length !=0){
    document.getElementById(artnum).style.display = "none";
  }
  artnum=param;
}