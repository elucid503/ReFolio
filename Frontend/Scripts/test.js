let FRAMES = 315;
let FPS = 30;
let video = document.getElementById('video');

window.addEventListener('scroll', function (e) {

    let time = (window.scrollY / 1000) * FRAMES / FPS;

    console.log(time);

    video.currentTime = time;
    
});