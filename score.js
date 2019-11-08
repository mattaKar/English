var nbDetails = 0;
var understanding = 0;

if (localStorage.getItem("understandingScore")!=-1) {
  nbDetails+=1;
} else {
  document.getElementById("score1").style.display="none";
}
if (localStorage.getItem("inferenceScore")!=-1) {
  nbDetails+=1;
} else {
  document.getElementById("score2").style.display="none";
}
if (localStorage.getItem("vocabScore")!=-1) {
  nbDetails+=1;
} else {
  document.getElementById("score3").style.display="none";
}


if (nbDetails==1) {
  document.getElementById("score1").style.width="100%";
  document.getElementById("score2").style.width="100%";
  document.getElementById("score3").style.width="100%";
} else if (nbDetails==2) {
  document.getElementById("score1").style.width="50%";
  document.getElementById("score2").style.width="50%";
  document.getElementById("score3").style.width="50%";
} else if (nbDetails==3) {
  document.getElementById("score1").style.width="33%";
  document.getElementById("score2").style.width="33%";
  document.getElementById("score3").style.width="33%";
}

$("#scoreSlider").roundSlider({
    sliderType: "min-range",
    radius: 130,
    editableTooltip: false,
    min:0,
    max:100,
    width: 16,
    value: localStorage.getItem("overallScore"),
    handleSize: 0,
    handleShape: "square",
    circleShape: "half-top",
    tooltipFormat: "tooltipValScore"
});

$("#scoreSlider1").roundSlider({
    sliderType: "min-range",
    radius: 130,
    editableTooltip: false,
    min:0,
    max:100,
    width: 16,
    value: localStorage.getItem("understandingScore"),
    handleSize: 0,
    handleShape: "square",
    circleShape: "half-top",
    tooltipFormat: "tooltipValScore"
});

$("#scoreSlider2").roundSlider({
    sliderType: "min-range",
    radius: 130,
    editableTooltip: false,
    min:0,
    max:100,
    width: 16,
    value: localStorage.getItem("inferenceScore"),
    handleSize: 0,
    handleShape: "square",
    circleShape: "half-top",
    tooltipFormat: "tooltipValScore"
});

$("#scoreSlider3").roundSlider({
    sliderType: "min-range",
    radius: 130,
    editableTooltip: false,
    min:0,
    max:100,
    width: 16,
    value: localStorage.getItem("vocabScore"),
    handleSize: 0,
    handleShape: "square",
    circleShape: "half-top",
    tooltipFormat: "tooltipValScore"
});

function tooltipValScore(args) {
    var retour = document.createElement("br");
    return args.value + " %";
}
