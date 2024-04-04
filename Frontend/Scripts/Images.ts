let FrameDir = "Frames_LIC";
let FrameLength = 300;

const LoadedImages = {

    Clouds: false,
    LIC: false

}

function LoadImages() {

    if (LoadedImages.Clouds && LoadedImages.LIC) return;

    if (LoadedImages.Clouds && FrameDir === "Frames_Clouds") return;
    if (LoadedImages.LIC && FrameDir === "Frames_LIC") return;

    // Load all the images in advance

    for (let i = 1; i <= FrameLength; i++) {

        const PaddedFrame = i.toString().padStart(4, '0');

        const Img = new Image();

        Img.src = `../Assets/${FrameDir}/frame_${PaddedFrame}.jpg`;

    }

    if (FrameDir === "Frames_Clouds") LoadedImages.Clouds = true;
    if (FrameDir === "Frames_LIC") LoadedImages.LIC = true;

}

$(".button").on('click', function (e) {

    const ID = $(this).attr('id');

    if (ID === "Clouds") {

        FrameDir = "Frames_Clouds";
        FrameLength = 300;

        $(".Drone-Intro .Image img").attr("src", "../Assets/Frames_Clouds/frame_0001.jpg")

        LoadImages();

    }

    if (ID === "LIC") {

        FrameDir = "Frames_LIC";
        FrameLength = 554;

        $(".Drone-Intro .Image img").attr("src", "../Assets/Frames_LIC/frame_0001.jpg")

        LoadImages();

    }

});

let LastScroll = 0;
let CurrentFrame = 0;

window.addEventListener('scroll', function () {

    LastScroll = Date.now();

    const Image = $(".Drone-Intro .Image img");
    const rect = Image[0].getBoundingClientRect();

    // Exit if the image is not in the viewport

    if (rect.bottom < 0 || rect.top > window.innerHeight) return;

    // Calculate the start and end points of the animation in the viewport

    const animationStart = 0;
    const animationEnd = window.innerHeight;

    // Calculate the current progress of the image's top edge through the animation zone

    let progress = (rect.top - animationStart) / (animationEnd - animationStart);

    // Invert progress so it starts at 0 when the image enters from the bottom

    progress = 1 - progress;

    // Clamp progress between 0 and 1

    progress = Math.min(Math.max(progress, 0), 1);

    // Determine the frame based on the progress

    CurrentFrame = Math.round(progress * FrameLength);

    // Ensure the frame is within bounds

    CurrentFrame = Math.max(1, Math.min(CurrentFrame, FrameLength));

    // Pad the frame number and set the image source

    Image.attr('src', `../Assets/${FrameDir}/frame_${CurrentFrame.toString().padStart(4, '0')}.jpg`);
 
});

setInterval(() => {

    if (Date.now() - LastScroll > 250) return;

    const Image = $(".Drone-Intro .Image img");

    // Upgrade to a higher resolution image if the user is not scrolling
    // Higher res are represented as PNGs instead of JPGs

    Image.attr("src", `../Assets/${FrameDir}_HQ/frame_${CurrentFrame.toString().padStart(4, '0')}.png`);

}, 50);

// Load the images

LoadImages();