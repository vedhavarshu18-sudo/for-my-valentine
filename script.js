// Navigation Logic
function showPage(pageId) {
    document.querySelectorAll('section').forEach(s => {
        s.classList.add('hidden');
        s.classList.remove('active');
    });
    const target = document.getElementById(pageId);
    target.classList.remove('hidden');
    target.classList.add('active');
    
    // Auto-hide popup if navigating away from page 1
    document.getElementById('no-popup').style.display = 'none';
}

function showPopup(popupId) {
    document.getElementById(popupId).style.display = 'flex';
}

// Perks Carousel
const perks = [
    "I listen like actually i listen 👻",
    "I make you as my chef 😋",
    "does unwanted things when not to be done 🤪"
];
let currentPerk = 0;

function nextPerk() {
    currentPerk = (currentPerk + 1) % perks.length;
    document.getElementById('perk-text').innerText = perks[currentPerk];
}

function prevPerk() {
    currentPerk = (currentPerk - 1 + perks.length) % perks.length;
    document.getElementById('perk-text').innerText = perks[currentPerk];
}

// Music Player Logic
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-pause-btn');
const nowPlaying = document.getElementById('now-playing');
const progressBar = document.getElementById('progress-bar');

const songs = [
    { title: "Vinmeen", file: "assets/music/song0.mp3" },
    { title: "Azhaipaya azhaipaya", file: "assets/music/song1.mp3" },
    { title: "Kaara Attakkaara", file: "assets/music/song2.mp3" },
    { title: "Yaarumilla", file: "assets/music/song3.mp3" },
    { title: "Nee korinaal", file: "assets/music/song4.mp3" }
];

let currentSongIndex = 0;

function playSong(index) {
    currentSongIndex = index;
    audio.src = songs[index].file;
    audio.play();
    nowPlaying.innerText = "Playing: " + songs[index].title;
    playBtn.innerText = "⏸";
}

function togglePlay() {
    if (!audio.src) {
        playSong(0);
        return;
    }
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸";
    } else {
        audio.pause();
        playBtn.innerText = "▶";
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
}

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
});

function setProgress(e) {
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    if (duration) {
        audio.currentTime = (clickX / width) * duration;
    }
}

function pauseAndReturn() {
    audio.pause();
    playBtn.innerText = "▶";
    showPage('page3-gifts');
}