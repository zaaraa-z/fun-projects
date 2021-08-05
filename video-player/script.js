const PlayBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const screen = document.getElementsByTagName('video');
const progressbar = document.getElementById('progressbar');
const timestamp = document.getElementById('timestamp');

//------------------------------------------------------------------------
toggleVideoStatus() {

}


//------------------------------------------------------------------------

playBtn.addEventListener('click', toggleVideoStatus);
screen.addEventListener('click', toggleVideoStatus);

screen.addEventListener('pause', updatePlayIcon);
screen.addEventListener('play', updatePlayIcon);

stopBtn.addEventListener('click', stopVideo);

progressbar.addEventListener('change', setProgressbar)
screen.addEventListener('timeupdate', updateProgressbar);

