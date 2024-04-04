let FRAMES = 314;
let FPS = 30;
let video = document.getElementById('video');

window.addEventListener('scroll', function (e) {

    let time = (window.scrollY / 1000) * FRAMES / FPS;

    video.currentTime = time;
    
});