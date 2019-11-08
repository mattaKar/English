$("#slider2").roundSlider({
    min: 0,
    max: 60,
    step: 1,
    value: 15,
    width: 20,
    handleSize: 0,
    sliderType: "min-range",
    startAngle : 90,
    endAngle : 90,
    circleShape: "full",
    radius:105,
    mouseScrollAction: true,
    editableTooltip: false,
    tooltipFormat: "tooltipVal2"
});

function tooltipVal2(args) {
    return args.value + " min";
}

function getDuration() {
  localStorage.setItem("duration",$("#slider2").roundSlider("getValue"));
}

var nbSelectedCompetences = 0;

function chooseCompetence(x) {
    if (!x.value) {
      nbSelectedCompetences+=1;
      x.style="border:5px #B10404 ridge;"
      x.hspace="10";
      x.vspace="2";
    }
    else {
      nbSelectedCompetences-=1;
      x.style="border:0px #B10404 ridge;"
      x.hspace="15";
      x.vspace="7";
    }
    x.value=(!x.value);
}

function getSelectedCompetences() {
  var i=0;
  var t = [0,0,0];
  if (document.getElementById("competence1").value) {
    t[i]=1;
    i = i + 1;
  }
  if (document.getElementById("competence2").value) {
    t[i]=2;
    i = i + 1;
  }
  if (document.getElementById("competence3").value) {
    t[i]=3;
    i = i + 1;
  }
  localStorage.setItem("selectedCompetences",t);
  localStorage.setItem("nbSelectedCompetences",nbSelectedCompetences);
}

function launchTest() {
  if ($("#slider2").roundSlider("getValue")>0 && nbSelectedCompetences>0) {
    getDuration();
    getSelectedCompetences();
    window.location.href="fenetre1bis.html";
  }
}
