var player = new Array(0,0,0,0,0,0,0,0,0);

function onYouTubeIframeAPIReady() {
  var nb_videos=Number(localStorage.getItem("nbSavedVideo"));
  for (i = 0; i < nb_videos; i++) {
    player[i] = new YT.Player('player'+String(i+1), {
      // Set Player height and width
      height: '200',
      width: '300',
      // Set the id of the video to be played
      videoId: localStorage.getItem("url"+String(i+1)),
      playerVars: {
        autoplay: 0,
        showinfo: 1,
        //loop: 1,
        controls: 1,
      },
      // Setup event listeners
      // These are covered in the next section
      events: {
        'onReady': onPlayerReady
      }
    });
  }
};

function onPlayerReady (){
  //player.playVideo();
  //setTimeout(pauseVideo, 10000);
  //setTimeout(loadNewVideo, 6000);
  //setTimeout(stopVideo, getLengthByUrl(tempUrl)*1000+4000);
  //setInterval(getContent, 1000);
};

function pauseVideo(){
  player.pauseVideo();
}

/* function loadNewVideo(){
  player.loadVideoById("me91AGSVsyo");
} */

function stopVideo(){
  player.stopVideo();
  toggleVisibility();
  /*window.scrollWin(0,250)*/
}

function clearSavedVideo() {
  var message = "Do you really want to clear your playlist ?"
  if (confirm(message)) {
    var nb_videos=Number(localStorage.getItem("nbSavedVideo"));
    for (i = 0; i < nb_videos; i++) {
        player[i].destroy();
    }
    localStorage.setItem("nbSavedVideo",0);
    onYouTubeIframeAPIReady();
  }
}

/*function getContent(){
  var content
  content = player.INSERT_METHOD_HERE;
  document.getElementById('content').innerText = content
}*/
