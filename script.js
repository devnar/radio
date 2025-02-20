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
        { title: "Nerdeyim", album: "1209", source: "https://cdn1.suno.ai/6aa47c7a-3fe2-4c00-89d4-f3395b74d24f.mp3", cover: "https://cdn2.suno.ai/image_6aa47c7a-3fe2-4c00-89d4-f3395b74d24f.jpeg" },
        { title: "Ilham", album: "1209", source: "https://cdn1.suno.ai/2b69a730-9375-42f7-a349-c4e494483200.mp3", cover: "https://cdn2.suno.ai/image_2b69a730-9375-42f7-a349-c4e494483200.jpeg" },
        { title: "Illegal takılıyoruz",  album: "1209", source: "https://cdn1.suno.ai/5b8ef581-6354-427b-8e95-523306ed60de.mp3", cover: "https://cdn2.suno.ai/image_5b8ef581-6354-427b-8e95-523306ed60de.jpeg" },
        { title: "Kalp",  album: "1209", source: "https://cdn1.suno.ai/90cc2b38-614a-437d-b064-68c514510b3b.mp3", cover: "https://cdn2.suno.ai/image_90cc2b38-614a-437d-b064-68c514510b3b.jpeg" },
        { title: "Olmuş",  album: "1709", source: "https://cdn1.suno.ai/6d811389-b8a3-423f-abf2-4742812639ff.mp3", cover: "https://cdn2.suno.ai/image_6d811389-b8a3-423f-abf2-4742812639ff.jpeg" },
        { title: "Sor",  album: "1709", source: "https://cdn1.suno.ai/317c2d40-2a5b-47e3-bd51-ef3e0c94d594.mp3", cover: "https://cdn2.suno.ai/image_317c2d40-2a5b-47e3-bd51-ef3e0c94d594.jpeg" },
        { title: "Karar",  album: "1209", source: "https://cdn1.suno.ai/c3ca2154-f8bb-4fa5-acb6-0266e2e2eee1.mp3", cover: "https://cdn2.suno.ai/image_c3ca2154-f8bb-4fa5-acb6-0266e2e2eee1.jpeg" },
        { title: "Karamsar",  album: "1209", source: "https://cdn1.suno.ai/b6207bc5-f700-4947-932d-5d9050a9ebc8.mp3", cover: "https://cdn2.suno.ai/image_b6207bc5-f700-4947-932d-5d9050a9ebc8.jpeg" },
        { title: "Karga",  album: "1709", source: "https://cdn1.suno.ai/82c117d8-49b2-4a8a-84d2-29ecdda3582f.mp3", cover: "https://cdn2.suno.ai/82c117d8-49b2-4a8a-84d2-29ecdda3582f_d8f71e5a.jpeg" },
        { title: "Halüsinasyon",  album: "1209", source: "https://cdn1.suno.ai/1f55ba94-38c5-4a69-aa07-278330314df4.mp3", cover: "https://cdn2.suno.ai/image_1f55ba94-38c5-4a69-aa07-278330314df4.jpeg" },
        { title: "Ben",  album: "1709", source: "https://cdn1.suno.ai/cbfdcd6c-8dea-434d-8dc1-49112fdbd03d.mp3", cover: "https://cdn2.suno.ai/image_cbfdcd6c-8dea-434d-8dc1-49112fdbd03d.jpeg" }
    ];
    
    const foundMusic = music.findIndex(song => song.title === musicTitle);
    if (foundMusic >= 0) {
        currentTrackIndex = foundMusic;
    } else {
        currentTrackIndex = 0;
    }

    function getDominantColor(imageUrl, callback) {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageUrl;
        img.onload = function () {
            const canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            let r = 0,
                g = 0,
                b = 0;

            for (let i = 0; i < data.length; i += 4) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
            }

            r = Math.floor(r / (data.length / 4));
            g = Math.floor(g / (data.length / 4));
            b = Math.floor(b / (data.length / 4));

            callback(`rgb(${r},${g},${b})`);
        };
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
            getDominantColor(station.cover, (color) => {
                stationElement.style.backgroundColor = color;
            });
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
        backgroundOverlay.style.backgroundImage = `url('${currentTrack.cover}')`;
    }

    function playTrack() {
        const currentTrack = music[currentTrackIndex];
        audioPlayer.src = currentTrack.source;
        audioPlayer.play();
        updateTrackInfo();
        playPauseButton.innerHTML = '<i data-lucide="pause"></i>';
        getDominantColor(currentTrack.cover, (color) => {
            document.documentElement.style.setProperty("--theme-color", color);
        });
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
