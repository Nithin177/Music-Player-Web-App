document.addEventListener("DOMContentLoaded", function () {
  var song = document.querySelector("#song");
  var playButton = document.querySelector("#play");
  var progress = document.querySelector("#progress");
  var currentTimeDisplay = document.querySelector("#start");
  var totalDurationDisplay = document.querySelector("#end");
  var playIcon = playButton.querySelector("i");
  var prevButton = document.querySelector("#prev");
  var nextButton = document.querySelector("#next");
  var title = document.querySelector("#title");
  var musician = document.querySelector("#musician");
  var thumb = document.querySelector("#thumb");
  var rewindButton = document.querySelector("#rewind");
  var forwardButton = document.querySelector("#forward");

  // Playlist Array
  var songs = [
    {
      src: "assets/[iSongs.info] 06 - Yeno Yeno Aagide.mp3",
      title: "Yeno Yeno Aagide",
      musician: "Singer Name",
      image: "assets/20230418_212503.jpg",
    },
    {
      src: "assets/[iSongs.info] 04 - Shuruvaagidhe.mp3",
      title: "Shuruvaagidhe",
      musician: "Sid Sriram",
      image:
        "assets/MV5BYzFlZDJkNjItODVmNC00OGFmLWJkMWEtMjkyZWEwMjk1YWI2XkEyXkFqcGc@._V1_.jpg",
    },
    {
      src: "assets/[iSongs.info] 06 - Ee Sanje.mp3",
      title: "Ee Sanje",
      musician: " Abhay Jodhpurkar, Gokul Abhishek, Monisha",
      image:
        "assets/MV5BNWI3MTYwZTQtZTIyOC00MjRkLWI2OGYtNmVhYWE0ZGM5ZWY0XkEyXkFqcGc@._V1_ (1).jpg",
    },
  ];

  var currentSongIndex = 0;

  rewindButton.addEventListener("click", function () {
    song.currentTime = Math.max(0, song.currentTime - 5);
  });
  forwardButton.addEventListener("click", function () {
    song.currentTime = Math.min(song.duration, song.currentTime + 5);
  });

  function loadSong(index) {
    var track = songs[index];
    song.src = track.src;
    title.innerText = track.title;
    musician.innerText = track.musician;
    thumb.src = track.image;
    song.load();

    // Set initial time display
    song.onloadedmetadata = function () {
      progress.max = song.duration;
      totalDurationDisplay.innerText = formatTime(song.duration);
      progress.value = 0;
    };
  }

  function togglePlay() {
    if (song.paused) {
      song.play();
      playIcon.classList.replace("bx-play", "bx-pause");
    } else {
      song.pause();
      playIcon.classList.replace("bx-pause", "bx-play");
    }
  }

  // Play/Pause button
  playButton.addEventListener("click", togglePlay);

  // Previous Song
  prevButton.addEventListener("click", function () {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    song.play();
  });

  // Next Song
  nextButton.addEventListener("click", function () {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    song.play();
  });

  // Update Progress Bar and Current Time
  song.ontimeupdate = function () {
    progress.value = song.currentTime;
    currentTimeDisplay.innerText = formatTime(song.currentTime);
  };

  // Seek Audio Using Progress Bar
  progress.addEventListener("input", function () {
    song.currentTime = progress.value;
  });

  // Ensure Play Icon Resets After Song Ends
  song.addEventListener("ended", function () {
    playIcon.classList.replace("bx-pause", "bx-play");
  });

  // Format Time Function
  function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
  }

  // Load the first song initially
  loadSong(currentSongIndex);
});
