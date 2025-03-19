// Note: JS điều khiển  thanh tiến trình (progress bar) và hiệu ứng quay đĩa nhạc.
// Khởi tạo biến
let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let songImg = document.querySelector(".song-img");
// Khai biến   
let rotation = 0;
let isPlaying = false;
let animationFrame;                                         //Biến lưu trữ ID của requestAnimationFrame() => let => undefined

function rotateDisk() {
    if (isPlaying) {                                        //If isPlaying=true
        rotation += 1;                                      // Điều chỉnh tốc độ quay
        songImg.style.transform = `rotate(${rotation}deg)`;
        animationFrame = requestAnimationFrame(rotateDisk); //Tạo hiệu ứng chuyển động mượt, chạy function
        //Yêu cầu trình duyệt thực hiện 1 hàm trước khi tiếp tục khung hình tt, vòng lặp hđ mượt => thay setInterval()
    }
}
// Cập nhật thanh tiến trình khi bài hát tải xong
song.onloadedmetadata = function () {                       //Chạy event khi dữ liệu metadata bao gồm 2 phần song dưới của bài hát #song đã tải xong
    progress.max = song.duration;                           // Đặt giá trị max của progress bằng thời lượng bài hát
    progress.value = song.currentTime;                      // Cập nhật giá trị hiện tại = giá trị bài hát chạy tới, vd: 1p2s
};
//Hàm phát/tạm dừng bài hát
function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {         // #ctrlIcon chứa class = true   
        song.pause();                                       
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
        isPlaying = false;                                 // đặt biến = false
        cancelAnimationFrame(animationFrame);              // dừng chuyển động quay !!
    } else {
        song.play();                                       // Ngược lại:
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
        isPlaying = true;
        rotateDisk();                                      // Tiếp tục quay, chạy function
    }
}
//Cập nhật thanh tiến trình, chạy cùng lúc sự gia tăng giá trị
if (song.play()) {                                          // Nếu audio đang chạy
    setInterval(() => {
        progress.value = song.currentTime;                  // Cập nhật giá trị progress
    }, 500);                                                // Cứ mỗi 500ms, cập nhật vị trí của thanh tiến trình
}
//Điều khiển khi thay đổi giá trị trên thanh tiến trình
progress.onchange = function () {                           //Khi kéo thanh progress (onchange)
    song.play();
    song.currentTime = progress.value;                      //Ngược lại, gán giá trị thgian bài = giá trị progress
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
    isPlaying = true;
    rotateDisk();
};

