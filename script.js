let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let songImg = document.querySelector(".song-img");

let rotation = 0;
let isPlaying = false;
let animationFrame;

function rotateDisk() {
    if (isPlaying) {
        rotation += 1; // Adjust speed
        songImg.style.transform = `rotate(${rotation}deg)`;
        animationFrame = requestAnimationFrame(rotateDisk); //Tạo hiệu ứng chuyển động mượt
        //Yêu cầu trình duyệt thực hiện 1 hàm trước khi tiếp tục khung hình tt, vòng lặp hđ mượt => thay setInterval()
    }
}

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
};

function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
        isPlaying = false;
        cancelAnimationFrame(animationFrame); // Dừng quay
    } else {
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
        isPlaying = true;
        rotateDisk(); // Tiếp tục quay
    }
}

if (song.play()) {
    setInterval(() => {
        progress.value = song.currentTime;
    }, 500);
}

progress.onchange = function () {
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
    isPlaying = true;
    rotateDisk();
};

