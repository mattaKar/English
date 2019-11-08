var player;
var tempUrl;
var completeVideoId;
var tempLength;
var totalTime=0;
var nbInferenceQuestions = 0;
var nbVocabQuestions = 0;
var nbUnderstandingQuestions = 0;
var goodInferenceAnswers = 0;
var goodVocabAnswers = 0;
var goodUnderstandingAnswers = 0;
var attempts = 0;
var savedVideo = 0;

var themes = ["Sport","Society","Ecology","Comedy","Music","Guns","Religion","Science","Gender"];
var competences = ["understanding","inference","vocab"];

// Callback for when the YouTube iFrame player is ready

function getRandomSelectedTheme() {
  var i = Math.floor(Math.random()*localStorage.getItem("nbThemes"));
  var theme = themes[localStorage.getItem("selectedThemes")[i*2]-1];
  return theme;
}

function getRandomSelectedCompetence() {
  var i = Math.floor(Math.random()*localStorage.getItem("nbSelectedCompetences"));
  var competence = competences[localStorage.getItem("selectedCompetences")[i*2]-1];
  return competence;
}

function findNewVideo() {
  var i=0;
  tempUrl = db({theme:getRandomSelectedTheme(),status:"false",travail:getRandomSelectedCompetence()}).rand().url;
  while (tempUrl==undefined) {
    i=i+1;
    console.log("pas trouvé du premier coup");
    tempUrl = db({theme:getRandomSelectedTheme(),status:"false",travail:getRandomSelectedCompetence()}).rand().url;
    if (i>50) {
      return undefined;
    }
  }
  return tempUrl;
}

function getVideoUrlByTheme(selectedTheme) {
  tempUrl=findNewVideo();
  db({url:tempUrl}).update({status:"true"});
  completeVideoId = tempUrl+"?start="+db({url:tempUrl}).first().start+"&end="+db({url:tempUrl}).first().end;
  return completeVideoId;
}

function getLengthByUrl(tempUrl) {
  tempLength = Number(db({url:tempUrl}).first().end)-Number(db({url:tempUrl}).first().start)+1;
  totalTime = totalTime + tempLength + 30;
  return tempLength;
}

function goToNextVideo() {
  attempts=0;
  player.destroy();
  document.getElementById("answers").style.display = "none";
  document.getElementById("lab1").style.background="#F6F7F4";
  document.getElementById("lab1").style.borderColor="#404040";
  document.getElementById("lab2").style.background="#F6F7F4";
  document.getElementById("lab2").style.borderColor="#404040";
  document.getElementById("lab3").style.background="#F6F7F4";
  document.getElementById("lab3").style.borderColor="#404040";
  document.getElementById("lab4").style.background="#F6F7F4";
  document.getElementById("lab4").style.borderColor="#404040";
  document.getElementById("next").disabled = true;
  document.getElementById("next").style.backgroundColor = "#A9A9A9";
  document.getElementById("control_01").checked=false;
  document.getElementById("control_02").checked=false;
  document.getElementById("control_03").checked=false;
  document.getElementById("control_04").checked=false;
  document.getElementById("control_01").disabled=false;
  document.getElementById("control_02").disabled=false;
  document.getElementById("control_03").disabled=false;
  document.getElementById("control_04").disabled=false;
  if (totalTime>=(localStorage.getItem("duration")*60)) {
    var nbQuestions = nbVocabQuestions+nbInferenceQuestions+nbUnderstandingQuestions;
    var goodAnswers = goodVocabAnswers+goodUnderstandingAnswers+goodInferenceAnswers;
    localStorage.setItem("overallScore",Math.round((100*goodAnswers)/nbQuestions));
    if (nbVocabQuestions>0) {
      localStorage.setItem("vocabScore",Math.round((100*goodVocabAnswers)/nbVocabQuestions));
    }
    else {
      localStorage.setItem("vocabScore",-1);
    }
    if (nbInferenceQuestions>0) {
      localStorage.setItem("inferenceScore",Math.round((100*goodInferenceAnswers)/nbInferenceQuestions));
    }
    else {
      localStorage.setItem("inferenceScore",-1);
    }
    if (nbUnderstandingQuestions>0) {
      localStorage.setItem("understandingScore",Math.round((100*goodUnderstandingAnswers)/nbUnderstandingQuestions));
    }
    else {
      localStorage.setItem("understandingScore",-1);
    }
    window.location.href="fenetre2bis.html";
  } else {
    onYouTubeIframeAPIReady();
  }
}

function onYouTubeIframeAPIReady() {
  document.getElementById("next").disabled = true;
  document.getElementById("next").style.backgroundColor = "#A9A9A9";
  player = new YT.Player('player', {
    // Set Player height and width
    height: '290',
    width: '390',
    // Set the id of the video to be played
    videoId: getVideoUrlByTheme("Sports"),
    playerVars: {
      autoplay: 0,
      showinfo: 0,
      iv_load_policy: 3,
      disablekb: 1,
      controls: 0,
      hl: "en",
    },
    // Setup event listeners
    // These are covered in the next section
    events: {
      'onReady': onPlayerReady
    }
  });
};

function onPlayerReady (){
  document.getElementById("theme").innerHTML = db({url:tempUrl}).first().theme;
  document.getElementById("theme_div").style.display="block";
  player.playVideo();
  //setTimeout(pauseVideo, 10000);
  //setTimeout(loadNewVideo, 6000);
  setTimeout(stopVideo, getLengthByUrl(tempUrl)*1000);
  //setInterval(getContent, 1000);
};

function pauseVideo(){
  player.pauseVideo();
}

function stopVideo(){
  player.stopVideo();
  toggleVisibility();
  /*window.scrollWin(0,250)*/
}

function toggleVisibility() {
  document.getElementById("theme").innerHTML = " ";
  document.getElementById("theme_div").style.display="none";
  document.getElementById("text_question").innerHTML = db({url:tempUrl}).first().question;
  document.getElementById("text_answer1").innerHTML = db({url:tempUrl}).first().answer1;
  document.getElementById("text_answer2").innerHTML = db({url:tempUrl}).first().answer2;
  document.getElementById("text_answer3").innerHTML = db({url:tempUrl}).first().answer3;
  document.getElementById("text_answer4").innerHTML = db({url:tempUrl}).first().answer4;
  var y = document.getElementById("answers");
  y.style.display = "block";
}

function scrollWin(x,y) {
    window.scrollBy(x,y);
}

function saveVideo() {
  if (savedVideo<9) {
    savedVideo+=1;
    localStorage.setItem("url"+String(savedVideo),tempUrl);
    localStorage.setItem("nbSavedVideo",savedVideo);
    alert("The video has been saved for later !");
  } else {
    alert("Your playlist is full, watch your favorite videos or clear your playlist !");
  }
}

function analyseAnswer(y) {

    var disp_next = document.getElementById("next");
    var i=1;
    var j=1;
    var trouve=0;
    for (i = 1; i < 5; i++) {
      if (y==i) {
        if (y!=Number(db({url:tempUrl}).first().correction)) {
          document.getElementById("lab"+String(y)).style.background="#B10404";
          document.getElementById("lab"+String(y)).style.borderColor="#B10404";
          attempts+=1;
        }
        else {
          document.getElementById("next").style.backgroundColor = "#32CD32";
          document.getElementById("next").disabled = false;
          document.getElementById("control_0"+String(y)).disabled = true;
          trouve=1;
          if (db({url:tempUrl}).first().travail=="vocab") {
            if (attempts==0) {
              goodVocabAnswers+=1;
            }
            nbVocabQuestions+=1;
          }
          else if (db({url:tempUrl}).first().travail=="understanding") {
            if (attempts==0) {
              goodUnderstandingAnswers+=1;
            }
            nbUnderstandingQuestions+=1;
          }
          else if (db({url:tempUrl}).first().travail=="inference") {
            if (attempts==0) {
              goodInferenceAnswers+=1;
            }
            nbInferenceQuestions+=1;
          }
          for (j = 1; j < 5; j++) {
            if (j!=y) {
              document.getElementById("control_0"+String(j)).disabled = true;
              document.getElementById("lab"+String(j)).style.background="#BABABA";
              document.getElementById("lab"+String(j)).style.borderColor="#BABABA";
            }
          }
          document.getElementById("lab"+String(y)).style.background="#32CD32";
          document.getElementById("lab"+String(y)).style.borderColor="#32CD32";
          var percentageBar = Math.round((100*totalTime)/(localStorage.getItem("duration")*60));
          if (percentageBar>100) {
            percentageBar=100;
          }
          document.getElementById("greenbar").style.width = String(percentageBar)+'%' ;
          document.getElementById("textButton").textContent = "Next";
          disp_next.style.display = "block";
        }
      }
      else {
        if (trouve==0) {
          document.getElementById("lab"+String(i)).style.background="#F6F7F4";
          document.getElementById("lab"+String(i)).style.borderColor="#404040";
        }
      }
    }
}
