const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progressbar = document.getElementById('progressbar');
const progressbarContainer = document.getElementById('progressbar-container');
const musicTitle = document.getElementById('music-title');
const musicCover = document.getElementById('music-cover');
const audio = document.getElementById('audio');

const musicsArr = ['energetic', 'relax', 'happy'];
let musicIndex = 1;
//---------------------------------------------------------------
loadMusic(musicsArr[musicIndex]);

//---------------------------------------------------------------
function loadMusic(music) {
  musicTitle.innerText = music;
  audio.src = `music/${music}.mp3`;
  musicCover.src = `img/${music}.jpg`;
}

//-----------------------
function playMusic() {
  musicContainer.classList.add('play');
  playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  audio.play();
}

//-----------------------
function pauseMusic() {
  musicContainer.classList.remove('play');
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  audio.pause();
}

//-----------------------
function nextMusic() {
  musicIndex++;
  if (musicIndex > musicsArr.length - 1) {
    musicIndex = 0;
  }
  loadMusic(musicsArr[musicIndex]);
  playMusic();
}

//-----------------------
function prevMusic() {
  musicIndex--;
  if (musicIndex < 0) {
    musicIndex = musicsArr.length - 1;
  }
  loadMusic(musicsArr[musicIndex]);
  playMusic();
}

//-----------------------
function updateProgressbar() {
  const progressbarPercentage = (progressbar.value =
    (audio.currentTime / audio.duration) * 100);
  progressbar.style.width = `${progressbarPercentage}%`;
}

//-----------------------
function dragProgressbar(e) {
  const width = this.clientWidth;
  const clickedX = e.offsetX;

  audio.currentTime = (audio.duration * clickedX) / width;
}

//---------------------------------------------------------------
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  isPlaying ? pauseMusic() : playMusic();
});

nextBtn.addEventListener('click', nextMusic);
prevBtn.addEventListener('click', prevMusic);

audio.addEventListener('timeupdate', updateProgressbar);
progressbarContainer.addEventListener('click', dragProgressbar);

audio.addEventListener('ended', nextMusic);
