const DifferentVideoSequenceces: { Dir: string, Length: number, Speed: number, Loaded: boolean, NetworkQuality: 0 | 1 | 2 | 3 | 4 }[] = [

    { Dir: "LIC", Length: 398, Speed: 1, Loaded: false, NetworkQuality: 3 },
    { Dir: "Clouds", Length: 272, Speed: 1, Loaded: false, NetworkQuality: 0 },
    { Dir: "Buildings", Length: 359, Speed: 1, Loaded: false, NetworkQuality: 2 },
    { Dir: "Court-Sq", Length: 451, Speed: 1, Loaded: false, NetworkQuality: 4, },
    { Dir: "PSI", Length: 401, Speed: 1, Loaded: false, NetworkQuality: 1, },
    { Dir: "City", Length: 317, Speed: 1.5, Loaded: false, NetworkQuality: 2, },

]

function DetermineNetworkQuality(): number | null {
    
    // @ts-ignore
    if (navigator.connection) {

        // @ts-ignore
        let { rtt, downlink } = navigator.connection;

        let NormalizedRTT = 1 - Math.min(rtt / 500, 1);
        let NormalizedDownlink = Math.min(downlink / 10, 1);

        let quality = 0.7 * NormalizedRTT + 0.3 * NormalizedDownlink;

        return Math.round(quality * 4);

    } else {

        // Network Information API is not supported

        return null;

    }

}

const NetworkQuality = DetermineNetworkQuality();

console.log(`[INFO] Determined Network Quality: ${NetworkQuality !== null ? NetworkQuality : "Unknown"}`);

let Sequence = DifferentVideoSequenceces[Math.floor(Math.random() * DifferentVideoSequenceces.length)];

if (NetworkQuality !== null) {

    let UpperBound = 0;

    while (NetworkQuality <= Sequence.NetworkQuality && UpperBound < 10) {

        UpperBound++; // Always using a fixed upper bound 
        Sequence = DifferentVideoSequenceces[Math.floor(Math.random() * DifferentVideoSequenceces.length)];

    }

}

const InitImg = $(".Drone-Intro .Image img").attr("src", `../Assets/Frames/${Sequence.Dir}/frame_0001.jpg`);

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

        Img.src = `../Assets/Frames/${Sequence.Dir}/frame_${PaddedFrame}.jpg`;

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

    Image.attr('src', `../Assets/Frames/${Sequence.Dir}/frame_${CurrentFrame.toString().padStart(4, '0')}.jpg`);

    Image.one("error", () => {

        // Fallback to the last frame if the image fails to load

        Image.attr('src', `../Assets/Frames/${Sequence.Dir}/frame_${(CurrentFrame - 1).toString().padStart(4, '0')}.jpg`);

    });
 
});

setInterval(() => {

    // Exit if the user is scrolling
    
    if ((Date.now() - LastScroll < 50) || IsUpdated) return;

    IsUpdated = true;

    const Image = $(".Drone-Intro .Image img");

    // Upgrade to a higher resolution image if the user is not scrolling

    Image.attr("src", `../Assets/Frames/${Sequence.Dir}-HQ/frame_${CurrentFrame.toString().padStart(4, '0')}.jpg`);

}, 50);

// Load gallery

const Path = `./Assets/Gallery/`;

const Images: { Name: string, Limit: number  }[] = [
    
    {

        Name: "CM",
        Limit: 11


    },

    {

        Name: "NYC",
        Limit: 41

    }

] 

const Gallery = $(".Responsive-Gallery");

const Previous: string[] = [];

async function AddImages(SkipPrevious: boolean, Min: number) {

    const WidthAndHeights: { Name: string, Width: number, Height: number }[] = [ { "Name": "CM_1.jpg", "Height": 3078, "Width": 5472 } , { "Name": "CM_10.jpg", "Height": 3648, "Width": 5472 } , { "Name": "CM_11.jpg", "Height": 3078, "Width": 5472 } , { "Name": "CM_2.jpg", "Height": 3078, "Width": 5472 } , { "Name": "CM_3.jpg", "Height": 3078, "Width": 5472 } , { "Name": "CM_4.jpg", "Height": 3078, "Width": 5472 } , { "Name": "CM_5.jpg", "Height": 3078, "Width": 5472 } , { "Name": "CM_6.jpg", "Height": 3078, "Width": 5472 } , { "Name": "CM_7.jpg", "Height": 3078, "Width": 5472 } , { "Name": "CM_8.jpg", "Height": 3648, "Width": 5472 } , { "Name": "CM_9.jpg", "Height": 3648, "Width": 5472 } , { "Name": "NYC_1.jpg", "Height": 3648, "Width": 5472 } , { "Name": "NYC_10.jpg", "Height": 1300, "Width": 1952 } , { "Name": "NYC_11.jpg", "Height": 1246, "Width": 1885 } , { "Name": "NYC_12.jpg", "Height": 1297, "Width": 1954 } , { "Name": "NYC_13.jpg", "Height": 1294, "Width": 1954 } , { "Name": "NYC_14.jpg", "Height": 1288, "Width": 1946 } , { "Name": "NYC_15.jpg", "Height": 1290, "Width": 1950 } , { "Name": "NYC_16.jpg", "Height": 1294, "Width": 1949 } , { "Name": "NYC_17.jpg", "Height": 1285, "Width": 1949 } , { "Name": "NYC_18.jpg", "Height": 1289, "Width": 1943 } , { "Name": "NYC_19.jpg", "Height": 1294, "Width": 1942 } , { "Name": "NYC_2.jpg", "Height": 3648, "Width": 5472 } , { "Name": "NYC_20.jpg", "Height": 1285, "Width": 1944 } , { "Name": "NYC_21.jpg", "Height": 1281, "Width": 1940 } , { "Name": "NYC_22.jpg", "Height": 1291, "Width": 1939 } , { "Name": "NYC_23.jpg", "Height": 1287, "Width": 1948 } , { "Name": "NYC_24.jpg", "Height": 1439, "Width": 2559 } , { "Name": "NYC_25.jpg", "Height": 3078, "Width": 5472 } , { "Name": "NYC_26.jpg", "Height": 3078, "Width": 5472 } , { "Name": "NYC_27.jpg", "Height": 3078, "Width": 5472 } , { "Name": "NYC_28.jpg", "Height": 3078, "Width": 5472 } , { "Name": "NYC_29.jpg", "Height": 3078, "Width": 5472 } , { "Name": "NYC_3.jpg", "Height": 3648, "Width": 5472 } , { "Name": "NYC_30.jpg", "Height": 3078, "Width": 5472 } , { "Name": "NYC_31.jpg", "Height": 3078, "Width": 5472 } , { "Name": "NYC_32.jpg", "Height": 3078, "Width": 5472 } , { "Name": "NYC_33.jpg", "Height": 3078, "Width": 5472 } , { "Name": "NYC_34.jpg", "Height": 3078, "Width": 5472 } , { "Name": "NYC_35.jpg", "Height": 3078, "Width": 5472 } , { "Name": "NYC_36.jpg", "Height": 3078, "Width": 5472 } , { "Name": "NYC_37.jpg", "Height": 3078, "Width": 5472 } , { "Name": "NYC_38.jpg", "Height": 3078, "Width": 5472 } , { "Name": "NYC_39.jpg", "Height": 3078, "Width": 5472 } , { "Name": "NYC_4.jpg", "Height": 3648, "Width": 5472 } , { "Name": "NYC_40.jpg", "Height": 3078, "Width": 5472 } , { "Name": "NYC_41.jpg", "Height": 3078, "Width": 5472 } , { "Name": "NYC_5.jpg", "Height": 3648, "Width": 5472 } , { "Name": "NYC_6.jpg", "Height": 3648, "Width": 5472 } , { "Name": "NYC_7.jpg", "Height": 3648, "Width": 5472 } , { "Name": "NYC_8.jpg", "Height": 3648, "Width": 5472 } , { "Name": "NYC_9.jpg", "Height": 3078, "Width": 5472 } ]      
    
    let Added = 0;

    // @ts-ignore
    const AddImage = ({ Name, Limit }) => {

        for (let i = 1; i <= Limit; i++) {

            if (Math.random() > 0.25) continue;
            if (SkipPrevious && Previous.includes(`${Name}_${i}.jpg`)) continue;

            const ImgLoad = new Image();

            ImgLoad.src = `../Assets/Gallery/LQ/${Name}_${i}.jpg`;
            
            const { Width, Height } = WidthAndHeights.find(({ Name: N }) => N === `${Name}_${i}.jpg`) || { Width: 1080, Height: 1920 };

            const LoadingElement = $(`<div class="Loading-Element" style="aspect-ratio: ${Width} / ${Height};">
    
                <div class="Icon">

                    <ion-icon name="hourglass-outline"></ion-icon>

                </div>

            </div>`);

            LoadingElement.appendTo(Gallery);

            ImgLoad.onload = () => {

                // Replace the loading element with the actual image

                LoadingElement.replaceWith(`<img src="../Assets/Gallery/LQ/${Name}_${i}.jpg" alt="${Name}">`);
                
            }

            Previous.push(`${Name}_${i}.jpg`);
            Added++;

        }
        
    };

    Images.forEach(AddImage);

    // If not enough images were added, loop again and ignore SkipPrevious

    if (Added < Min) {

        SkipPrevious = false;
        Images.forEach(AddImage);

    }

}

AddImages(false, 10);

const MorePhotosBtn = $("#Button-MorePhotos");

MorePhotosBtn.on("click", () => {

    // Randomize the order of the images

    Gallery.children().remove();

    AddImages(true, 10);
    
});

