var nbSelectedThemes=0;

localStorage.setItem("nbSavedVideo",0);

function chooseTheme(x) {
    var y = x.id ;
    if (nbSelectedThemes<3 && (!x.value)) {
      x.value=(!x.value);
      nbSelectedThemes+=1;
      x.style="border:5px #B10404 ridge;"
      x.hspace="10";
      x.vspace="2";
    }
    else if (x.value) {
      nbSelectedThemes-=1;
      x.value=false;
      x.style="border:0px #B10404 ridge;"
      x.hspace="15";
      x.vspace="7";
    }
}

function getSelectedThemes() {
  var i=0;
  var t = [0,0,0];
  if (document.getElementById("theme1").value) {
    t[i]=1;
    i = i + 1;
  }
  if (document.getElementById("theme2").value) {
    t[i]=2;
    i = i + 1;
  }
  if (document.getElementById("theme3").value) {
    t[i]=3;
    i = i + 1;
  }
  if (document.getElementById("theme4").value) {
    t[i]=4;
    i = i + 1;
  }
  if (document.getElementById("theme5").value) {
    t[i]=5;
    i = i + 1;
  }
  if (document.getElementById("theme6").value) {
    t[i]=6;
    i = i + 1;
  }
  if (document.getElementById("theme7").value) {
    t[i]=7;
    i = i + 1;
  }
  if (document.getElementById("theme8").value) {
    t[i]=8;
    i = i + 1;
  }
  if (document.getElementById("theme9").value) {
    t[i]=9;
    i = i + 1;
  }
  localStorage.setItem("selectedThemes",t);
  localStorage.setItem("nbThemes",nbSelectedThemes);
}

function chooseDuration() {
  if (nbSelectedThemes>0) {
    getSelectedThemes();
    window.location.href="fenetre4bis.html";
  }
}
