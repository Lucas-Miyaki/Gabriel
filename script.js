const songs = [
    {
        name: "Felling Eletric",
        src: "music/Feeling-Electric.mp3",
        cover: "img/Feeling-Electric.jpg",
        author: "Parade of Lights"
    },
    {
        name: "Tonight",
        src: "music/Tonight.mp3",
        cover: "img/Tonight.jpg",
        author: "Coasts"
    },
    {
        name: "Pupila",
        src: "music/Pupila-Anavitoria.mp3",
        cover: "img/Pupila.jpg",
        author: "ANAVITÓRIA e Vitor Kley"
    },
    {
        name: "Pupila",
        src: "music/Pupila.mp3",
        cover: "img/Pupila-VS.jpg",
        author: "Filipe Toca e Mayra Rodrigues"
    },
    {
        name: "Die With A Smile",
        src: "music/Die-With-A-Smile.mp3",
        cover: "img/Die-With-A-Smile.jpeg",
        author: "Lady Gaga e Bruno Mars"
    },
    {
        name: "Beautiful Things",
        src: "music/Beautiful-Things.mp3",
        cover: "img/Beautiful_Things.jpg",
        author: "Benson Boone"
    },
    {
        name: "Meu Lugar",
        src: "music/Meu-Lugar.mp3",
        cover: "img/Meu-Lugar.jpg",
        author: "Onze:20"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const audioPlayer = document.getElementById("audioPlayer");
    const currentSong = document.getElementById("currentSong");
    const currentAuthor = document.getElementById("currentAuthor");
    const albumCover = document.getElementById("albumCover");
    const playlist = document.getElementById("playlist");
    const prevButton = document.getElementById("prevButton");
    const pauseButton = document.getElementById("pauseButton");
    const nextButton = document.getElementById("nextButton");
    const reels = document.querySelectorAll(".reel");

    function loadSong(index) {
        const song = songs[index];
        audioPlayer.src = song.src;
        currentSong.textContent = song.name;
        currentAuthor.textContent = song.author; // Atualiza o autor
        albumCover.src = song.cover;
    }

    function toggleReels(play) {
        reels.forEach(reel => {
            reel.style.animationPlayState = play ? "running" : "paused";
        });
    }

    songs.forEach((song, index) => {
        const button = document.createElement("button");
        button.textContent = song.name;
        button.addEventListener("click", () => {
            currentIndex = index;
            loadSong(currentIndex);
            audioPlayer.play();
        });
        playlist.appendChild(button);
    });

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + songs.length) % songs.length;
        loadSong(currentIndex);
        audioPlayer.play();
    });

    pauseButton.addEventListener("click", () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            pauseButton.textContent = "⏸ Pausar";
            toggleReels(true);
        } else {
            audioPlayer.pause();
            pauseButton.textContent = "▶ Reproduzir";
            toggleReels(false);
        }
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % songs.length;
        loadSong(currentIndex);
        audioPlayer.play();
    });

    audioPlayer.addEventListener("play", () => toggleReels(true));
    audioPlayer.addEventListener("pause", () => toggleReels(false));

    loadSong(currentIndex);
});


document.addEventListener("DOMContentLoaded", () => {
    const audioPlayer = document.getElementById("audioPlayer");
    const progressBar = document.getElementById("progressBar");

    // Atualizar a barra de progresso conforme a música toca
    audioPlayer.addEventListener("timeupdate", () => {
        progressBar.max = Math.floor(audioPlayer.duration); // Duração total da música
        progressBar.value = Math.floor(audioPlayer.currentTime); // Tempo atual
    });

    // Avançar ou retroceder na música ao interagir com a barra
    progressBar.addEventListener("input", () => {
        audioPlayer.currentTime = progressBar.value;
    });

    // Reiniciar a barra de progresso no final da música
    audioPlayer.addEventListener("ended", () => {
        progressBar.value = 0;
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const audioPlayer = document.getElementById("audioPlayer");
    const progressBar = document.getElementById("progressBar");
    const currentTimeDisplay = document.getElementById("currentTime");
    const durationDisplay = document.getElementById("duration");

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
        return `${minutes}:${secs}`;
    }

    // Atualizar barra de progresso e tempos
    audioPlayer.addEventListener("timeupdate", () => {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;

        // Atualiza valores do slider
        progressBar.max = Math.floor(duration) || 0;
        progressBar.value = Math.floor(currentTime);

        // Atualiza tempo exibido
        currentTimeDisplay.textContent = formatTime(currentTime);
        durationDisplay.textContent = duration
            ? formatTime(duration - currentTime) // Tempo restante
            : "00:00";

        // Atualiza a barra de progresso com cor "tocada"
        const percentage = (currentTime / duration) * 100;
        progressBar.style.background = `linear-gradient(to right, #ff5c5c ${percentage}%, #444 ${percentage}%)`;
    });

    // Permitir ao usuário alterar o tempo ao arrastar a barra
    progressBar.addEventListener("input", () => {
        audioPlayer.currentTime = progressBar.value;
    });

    // Resetar a barra no final da música
    audioPlayer.addEventListener("ended", () => {
        progressBar.value = 0;
        progressBar.style.background = "linear-gradient(to right, #444 0%, #444 100%)";
    });
});
