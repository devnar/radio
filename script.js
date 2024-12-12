document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  const favoriteToggle = document.getElementById('favoriteToggle');
  const menuToggle = document.getElementById('menuToggle');
  const closeMenu = document.getElementById('closeMenu');
  const stationsList = document.getElementById('stationsList');
  const changeBackground = document.getElementById('changeBackground');
  const backgroundOverlay = document.querySelector('.background-overlay');
  const musicName = document.getElementById('musicName');
  const artistName = document.getElementById('artistName');
  const audioPlayer = document.getElementById('audioPlayer');
  const playPauseButton = document.getElementById('playPauseButton');
  const nextTrackButton = document.getElementById('nextTrackButton');

  const stations = [
      {
          title: "Ilham",
          name: "NAR - 1209",
          source: "https://cdn1.suno.ai/2b69a730-9375-42f7-a349-c4e494483200.mp3",
          cover: "https://cdn2.suno.ai/image_2b69a730-9375-42f7-a349-c4e494483200.jpeg",
          color: "#9C27B0",
      },
      {
          title: "Efonk",
          name: "NAR - Efonk",
          source: "https://cdn1.suno.ai/f799ed4a-bab9-45b6-b9d3-ede4a217e02e.mp3",
          cover: "https://cdn2.suno.ai/image_f799ed4a-bab9-45b6-b9d3-ede4a217e02e.jpeg",
          color: "#FF5722",
      },
      {
          title: "Illegal takılıyoruz",
          name: "NAR - 1209",
          source: "https://cdn1.suno.ai/5b8ef581-6354-427b-8e95-523306ed60de.mp3",
          cover: "https://cdn2.suno.ai/image_5b8ef581-6354-427b-8e95-523306ed60de.jpeg",
          color: "#E91E63",
      },
      {
          title: "Kalp",
          name: "NAR - 1209",
          source: "https://cdn1.suno.ai/90cc2b38-614a-437d-b064-68c514510b3b.mp3",
          cover: "https://cdn2.suno.ai/image_90cc2b38-614a-437d-b064-68c514510b3b.jpeg",
          color: "#E91E63",
      },
      {
          title: "Olmuş",
          name: "NAR - 1709",
          source: "https://cdn1.suno.ai/6d811389-b8a3-423f-abf2-4742812639ff.mp3",
          cover: "https://cdn2.suno.ai/image_6d811389-b8a3-423f-abf2-4742812639ff.jpeg",
          color: "#E91E63",
      },
      {
          title: "Karar",
          name: "NAR - 1209",
          source: "https://cdn1.suno.ai/c3ca2154-f8bb-4fa5-acb6-0266e2e2eee1.mp3",
          cover: "https://cdn2.suno.ai/image_c3ca2154-f8bb-4fa5-acb6-0266e2e2eee1.jpeg",
          color: "#E91E63",
      },
      {
          title: "Karamsar",
          name: "NAR - 1209",
          source: "https://cdn1.suno.ai/b6207bc5-f700-4947-932d-5d9050a9ebc8.mp3",
          cover: "https://cdn2.suno.ai/image_b6207bc5-f700-4947-932d-5d9050a9ebc8.jpeg",
          color: "#E91E63",
      },
      {
          title: "Karga",
          name: "NAR - 1709",
          source: "https://cdn1.suno.ai/82c117d8-49b2-4a8a-84d2-29ecdda3582f.mp3",
          cover: "https://cdn2.suno.ai/82c117d8-49b2-4a8a-84d2-29ecdda3582f_d8f71e5a.jpeg",
          color: "#FF9800",
      },
  ];

  let currentTrackIndex = 0;

  function getDominantColor(imageUrl, callback) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageUrl;
      img.onload = function() {
          const canvas = document.createElement('canvas');
          canvas.width = this.width;
          canvas.height = this.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(this, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          let r = 0, g = 0, b = 0;

          for (let i = 0; i < data.length; i += 4) {
              r += data[i];
              g += data[i+1];
              b += data[i+2];
          }

          r = Math.floor(r / (data.length / 4));
          g = Math.floor(g / (data.length / 4));
          b = Math.floor(b / (data.length / 4));

          callback(`rgb(${r},${g},${b})`);
      };
  }

  function toggleFavorite() {
      favoriteToggle.classList.toggle('active');
  }

  function toggleMenu() {
      stationsList.classList.toggle('open');
  }

  function renderStations() {
      const container = document.querySelector('.stations-container');
      container.innerHTML = '';
      stations.forEach((station, index) => {
          const stationElement = document.createElement('div');
          stationElement.className = 'station-item';
          stationElement.innerHTML = `
              <b>${station.title}</b>
              <i>${station.name}</i>
          `;
          getDominantColor(station.cover, (color) => {
              stationElement.style.backgroundColor = color;
          });
          stationElement.addEventListener('click', () => {
              currentTrackIndex = index;
              playTrack();
          });
          container.appendChild(stationElement);
      });
      lucide.createIcons();
  }

  function updateTrackInfo() {
      const currentTrack = stations[currentTrackIndex];
      musicName.textContent = currentTrack.title;
      artistName.textContent = currentTrack.name;
      backgroundOverlay.style.backgroundImage = `url('${currentTrack.cover}')`;
  }

  function playTrack() {
      const currentTrack = stations[currentTrackIndex];
      audioPlayer.src = currentTrack.source;
      audioPlayer.play();
      updateTrackInfo();
      playPauseButton.innerHTML = '<i data-lucide="pause"></i>';
      getDominantColor(currentTrack.cover, (color) => {
          document.documentElement.style.setProperty('--theme-color', color);
      });
      lucide.createIcons();
  }

  function togglePlayPause() {
      if (audioPlayer.paused) {
          audioPlayer.play();
          playPauseButton.innerHTML = '<i data-lucide="pause"></i>';
      } else {
          audioPlayer.pause();
          playPauseButton.innerHTML = '<i data-lucide="play"></i>';
      }
      lucide.createIcons();
  }

  function playNextTrack() {
      currentTrackIndex = (currentTrackIndex + 1) % stations.length;
      playTrack();
  }

  favoriteToggle.addEventListener('click', toggleFavorite);
  menuToggle.addEventListener('click', toggleMenu);
  closeMenu.addEventListener('click', toggleMenu);
  playPauseButton.addEventListener('click', togglePlayPause);
  nextTrackButton.addEventListener('click', playNextTrack);

  audioPlayer.addEventListener('ended', playNextTrack);

  renderStations();
  updateTrackInfo();
});