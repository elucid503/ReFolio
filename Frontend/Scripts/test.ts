let FrameDir = "Frames_Clouds";
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

        $(".image-container img").attr("src", "../Assets/Frames_Clouds/frame_0001.jpg")

        LoadImages();

    }

    if (ID === "LIC") {

        FrameDir = "Frames_LIC";
        FrameLength = 554;

        $(".image-container img").attr("src", "../Assets/Frames_LIC/frame_0001.jpg")

        LoadImages();

    }

});


window.addEventListener('scroll', function (e) {

    // Get the current frame

    const Scroll = window.scrollY;

    // Get the total height of the document

    const TotalHeight = document.body.scrollHeight;

    // Get the height of the window

    const WindowHeight = window.innerHeight;

    // Get the percentage of the scroll

    const Percentage = (Scroll / (TotalHeight - WindowHeight)) * 100;

    // Get the frame

    let Frame = Math.floor((Percentage / 100) * FrameLength);

    // If the frame is less than 1, set it to 1

    if (Frame < 1) Frame = 1;
    if (Frame > FrameLength) Frame = FrameLength;

    // Set the current frame

    const Image = $(".image-container img");

    // Pad the frame

    const PaddedFrame = Frame.toString().padStart(4, '0');

    // Set the image

    Image.attr('src', `../Assets/${FrameDir}/frame_${PaddedFrame}.jpg`);    

});

// Load the images

LoadImages();