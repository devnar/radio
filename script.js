document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();

    const menuToggle = document.getElementById("menuToggle");
    const closeMenu = document.getElementById("closeMenu");
    const musicList = document.getElementById("musicList");
    const backgroundOverlay = document.querySelector(".background-overlay");
    const musicName = document.getElementById("musicName");
    const artistName = document.getElementById("artistName");
    const audioPlayer = document.getElementById("audioPlayer");
    const playPauseButton = document.getElementById("playPauseButton");
    const shareButton = document.getElementById("shareButton");
    const nextTrackButton = document.getElementById("repeatToggle");
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const musicTitle = params.get("i");
    let currentTrackIndex = 0;
    let repeat = false;

    const music = [
        { title: "Nerdeyim", album: "1209" },
        { title: "Ilham", album: "1209" },
        { title: "Illegal takılıyoruz", album: "1209" },
        { title: "Je tourne", album: "304" },
        { title: "Kalp", album: "1209" },
        { title: "Olmuş", album: "1709" },
        { title: "Sor", album: "1709" },
        { title: "Karar", album: "1209" },
        { title: "Karamsar", album: "1209" },
        { title: "Karga", album: "1709" },
        { title: "Ben", album: "1709" }
    ];    
    
    const foundMusic = music.findIndex(song => song.title === musicTitle);
    if (foundMusic >= 0) {
        currentTrackIndex = foundMusic;
    } else {
        currentTrackIndex = 0;
    }

    function toggleMenu() {
        musicList.classList.toggle("open");
    }

    function rendermusic() {
        const container = document.querySelector(".music-container");
        container.innerHTML = "";
        music.forEach((station, index) => {
            const stationElement = document.createElement("div");
            stationElement.className = "station-item";
            stationElement.innerHTML = `
              <b>${station.title}</b>
              <i>${station.album}</i>
          `;
            stationElement.addEventListener("click", () => {
                currentTrackIndex = index;
                playTrack();
            });
            container.appendChild(stationElement);
        });
        lucide.createIcons();
    }

    function updateTrackInfo() {
        const currentTrack = music[currentTrackIndex];
        musicName.textContent = currentTrack.title;
        artistName.textContent = currentTrack.album;
        backgroundOverlay.style.backgroundImage = `url('https://devnar.github.io/radio/cover/${currentTrack.title.toLowerCase()}.png')`;
    }

    function playTrack() {
        const currentTrack = music[currentTrackIndex];
        audioPlayer.src = `https://devnar.github.io/radio/music/${currentTrack.title.toLowerCase()}.mp3`;
        audioPlayer.play();
        updateTrackInfo();
        playPauseButton.innerHTML = '<i data-lucide="pause"></i>';
        lucide.createIcons();
    }

    function togglePlayPause() {
        if (audioPlayer.paused) {
            playTrack();
            playPauseButton.innerHTML = '<i data-lucide="pause"></i>';
        } else {
            audioPlayer.pause();
            playPauseButton.innerHTML = '<i data-lucide="play"></i>';
        }
        lucide.createIcons();
    }

    function playNextTrack() {
        if (!repeat) {
            currentTrackIndex = (currentTrackIndex + 1) % music.length;
            playTrack();
        } else {
            playTrack();
        }
    }

    function repeatToggle() {
        if (repeat == false) {
            repeat = true;
            nextTrackButton.innerHTML = '<i data-lucide="repeat-1"></i>';
        } else {
            repeat = false;
            nextTrackButton.innerHTML = '<i data-lucide="repeat"></i>';
        }
        lucide.createIcons();
    }

    function share()  {
        navigator.share({
            title: "NAR Radio",
            text: "Ben bu şarkıyı çok sevdim :)",
            url: window.location.pathname+"?i="+musicName.textContent,
        });
    }

    menuToggle.addEventListener("click", toggleMenu);
    closeMenu.addEventListener("click", toggleMenu);
    playPauseButton.addEventListener("click", togglePlayPause);
    nextTrackButton.addEventListener("click", repeatToggle);
    shareButton.addEventListener("click", share);
    audioPlayer.addEventListener("ended", playNextTrack);

    rendermusic();
    updateTrackInfo();
});
