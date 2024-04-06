const DifferentVideoSequenceces: { Dir: string, Length: number, Speed: number, Loaded: boolean }[] = [

    { Dir: "Frames_LIC", Length: 554, Speed: 1, Loaded: false },
    { Dir: "Frames_Clouds", Length: 300, Speed: 1, Loaded: false },
    { Dir: "Frames_NYC", Length: 315, Speed: 1.5, Loaded: false },
    { Dir: "Frames_RI", Length: 341, Speed: 1.25, Loaded: false },
    { Dir: "Frames_HIGH", Length: 577, Speed: 1, Loaded: false },


]

const Sequence = DifferentVideoSequenceces[Math.floor(Math.random() * DifferentVideoSequenceces.length)];

const InitImg = $(".Drone-Intro .Image img").attr("src", `../Assets/${Sequence.Dir}/frame_0001.jpg`);

InitImg.one("load", () => {

    // Load the other images

    LoadImages();

});

function LoadImages() {

    if (Sequence.Loaded) return;

    // Load all the images in advance

    for (let i = 1; i <= Sequence.Length; i++) {

        const PaddedFrame = i.toString().padStart(4, '0');

        const Img = new Image();

        Img.src = `../Assets/${Sequence.Dir}/frame_${PaddedFrame}.jpg`;

    }

    Sequence.Loaded = true;

}

let IsUpdated = false;

let LastScroll = 0;
let CurrentFrame = 1;

window.addEventListener('scroll', function () {

    LastScroll = Date.now();
    IsUpdated = false;

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

    CurrentFrame = Math.round(progress * Sequence.Length);

    if (Sequence.Speed !== 1) { // Slow or speed up the animation

        CurrentFrame = Math.round(CurrentFrame * Sequence.Speed);

    }

    // Ensure the frame is within bounds

    CurrentFrame = Math.max(1, Math.min(CurrentFrame, Sequence.Length));

    // Pad the frame number and set the image source

    Image.attr('src', `../Assets/${Sequence.Dir}/frame_${CurrentFrame.toString().padStart(4, '0')}.jpg`);
 
});

setInterval(() => {

    // Exit if the user is scrolling
    
    if ((Date.now() - LastScroll < 50) || IsUpdated) return;

    IsUpdated = true;

    const Image = $(".Drone-Intro .Image img");

    // Upgrade to a higher resolution image if the user is not scrolling

    Image.attr("src", `../Assets/${Sequence.Dir}_HQ/frame_${CurrentFrame.toString().padStart(4, '0')}.jpg`);

}, 50);
