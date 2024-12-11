const songs = [
  {
    title: "Ilham",
    name: "NAR - 1209",
    source: "https://cdn1.suno.ai/2b69a730-9375-42f7-a349-c4e494483200.mp3",
    cover: "https://cdn2.suno.ai/image_2b69a730-9375-42f7-a349-c4e494483200.jpeg",
  },
  {
    title: "Efonk",
    name: "NAR - Efonk",
    source: "https://cdn1.suno.ai/f799ed4a-bab9-45b6-b9d3-ede4a217e02e.mp3",
    cover: "https://cdn2.suno.ai/image_f799ed4a-bab9-45b6-b9d3-ede4a217e02e.jpeg",
  },
  {
    title: "Illegal takılıyoruz",
    name: "NAR - 1209",
    source: "https://cdn1.suno.ai/5b8ef581-6354-427b-8e95-523306ed60de.mp3",
    cover: "https://cdn2.suno.ai/image_5b8ef581-6354-427b-8e95-523306ed60de.jpeg",
  },
  {
    title: "Kalp",
    name: "NAR - 1209",
    source: "https://cdn1.suno.ai/90cc2b38-614a-437d-b064-68c514510b3b.mp3",
    cover: "https://cdn2.suno.ai/image_90cc2b38-614a-437d-b064-68c514510b3b.jpeg",
  },
  {
    title: "Olmuş",
    name: "NAR - 1709",
    source: "https://cdn1.suno.ai/6d811389-b8a3-423f-abf2-4742812639ff.mp3",
    cover: "https://cdn2.suno.ai/image_6d811389-b8a3-423f-abf2-4742812639ff.jpeg",
  },
  {
    title: "Karar",
    name: "NAR - 1209",
    source: "https://cdn1.suno.ai/c3ca2154-f8bb-4fa5-acb6-0266e2e2eee1.mp3",
    cover: "https://cdn2.suno.ai/image_c3ca2154-f8bb-4fa5-acb6-0266e2e2eee1.jpeg",
  },
  {
    title: "Karamsar",
    name: "NAR - 1209",
    source: "https://cdn1.suno.ai/b6207bc5-f700-4947-932d-5d9050a9ebc8.mp3",
    cover: "https://cdn2.suno.ai/image_b6207bc5-f700-4947-932d-5d9050a9ebc8.jpeg",
  },
  {
    title: "Karga",
    name: "NAR - 1709",
    source: "https://cdn1.suno.ai/82c117d8-49b2-4a8a-84d2-29ecdda3582f.mp3",
    cover: "https://cdn2.suno.ai/82c117d8-49b2-4a8a-84d2-29ecdda3582f_d8f71e5a.jpeg",
  },
];

let currentSongIndex = 0;
let isPlaying = false;
const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const currentTimeDisplay = document.getElementById("current-time-display");
const durationDisplay = document.getElementById("duration-display");
const historyList = document.getElementById("history-list");
const upcomingList = document.getElementById("upcoming-list");
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

let listeningHistory = [];

function loadSong(index) {
  const song = songs[index];
  audio.src = song.source;
  title.textContent = song.title;
  artist.textContent = song.name;
  cover.src = song.cover;
}

function playSong() {
  isPlaying = true;
  audio.play();
  playPauseButton.textContent = "Pause";
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playPauseButton.textContent = "Play";
}

function togglePlayPause() {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function updateProgress() {
  const { currentTime, duration } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progress.value = progressPercent;
  currentTimeDisplay.textContent = formatTime(currentTime);
  durationDisplay.textContent = formatTime(duration);
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function addToHistory(title) {
  const time = new Date().toLocaleTimeString();
  listeningHistory.unshift({ title, time });
  if (listeningHistory.length > 10) {
    listeningHistory.pop();
  }
  updateHistoryList();
}

function updateHistoryList() {
  historyList.innerHTML = "";
  listeningHistory.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.title} - ${item.time}`;
    historyList.appendChild(li);
  });
}

function getUpcomingSongs() {
  const upcoming = [];
  let date = new Date();
  for (let i = 1; i <= 5; i++) {
    date = new Date(date.getTime() + 15 * 60000); // Add 15 minutes
    const index = getCurrentSongIndex(date);
    upcoming.push({
      title: songs[index].title,
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
  }
  return upcoming;
}

function updateUpcomingList() {
  const upcoming = getUpcomingSongs();
  upcomingList.innerHTML = "";
  upcoming.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.title} - ${item.time}`;
    upcomingList.appendChild(li);
  });
}

function getCurrentSongIndex(date) {
  const totalMinutes = date.getHours() * 60 + date.getMinutes();
  return Math.floor((totalMinutes / 15) % songs.length);
}

function checkAndSwitchSong() {
  const now = new Date();
  const newIndex = getCurrentSongIndex(now);

  if (currentSongIndex !== newIndex) {
    currentSongIndex = newIndex;
    loadSong(currentSongIndex);
    if (isPlaying) {
      playSong();
    }
    addToHistory(songs[currentSongIndex].title);
    updateUpcomingList();
  }
}

function switchTab(e) {
  const tabId = e.target.dataset.tab;
  tabButtons.forEach((btn) => btn.classList.remove("active"));
  tabContents.forEach((content) => content.classList.remove("active"));
  e.target.classList.add("active");
  document.getElementById(tabId).classList.add("active");
}

// Event Listeners
playPauseButton.addEventListener("click", togglePlayPause);
audio.addEventListener("timeupdate", updateProgress);
progress.addEventListener("click", setProgress);
tabButtons.forEach((button) => {
  button.addEventListener("click", switchTab);
});

// Initialize
loadSong(currentSongIndex);
updateHistoryList();
updateUpcomingList();

// Check and switch song every minute
setInterval(checkAndSwitchSong, 1000);
