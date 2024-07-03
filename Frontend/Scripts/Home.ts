function GenerateHSL(): string {

    // Limit to more vibrant colors

    const LowerLimit = 10;
    const UpperLimit = 350;

    const Hue = Math.floor(Math.random() * (UpperLimit - LowerLimit) + LowerLimit);

    return `hsl(${Hue}, 7.5%, 30%)`;

}

function UpdateColors(HSLString: string): void {

    const Image = $(".Header .Image img");    

    // Convert HSL string to hue rotation assuming image is originally purple

    const Hue = parseInt((HSLString.match(/\d+/) || [])[0] || "0");

    const HueRotation = (Hue - 270) % 360;

    Image.css("filter", `hue-rotate(${HueRotation}deg) saturate(0.25)`);

    // Elements

    $(":root").css("--Color-Accent", HSLString);

}

const Color = GenerateHSL();
UpdateColors(Color);

$(".Header").on("click", () => {

    const Color = GenerateHSL();
    UpdateColors(Color);

});

// Modal Stuff (Gallery) 

const Gallery = $('.Responsive-Gallery');
const Modal = $('#Gallery-Modal');
const ModalImg = $('#Modal-Image');
const CloseBtn = $('#Modal-Close');

Gallery.on('click', 'img', function () {
    
    const ImageName = $(this).attr('src')?.split('/').pop() || '';

    ModalImg.hide();
    ModalImg.attr('src', "../Assets/Gallery/HQ/" + ImageName.replace(".jpg", ".png"));

    const Loading = $('#Modal-Loading');

    CloseBtn.hide();
    Loading.show();
    
    Modal.fadeIn(200);

    ModalImg.one('load', () => {

        Loading.hide();
        ModalImg.show();
        CloseBtn.show(); 

    });

});

CloseBtn.on('click', function() {
    
    Modal.fadeOut(200);

});

Modal.on('click', function(e) {
    
    if (e.target === this) {

        Modal.fadeOut(200);

    }

});

// Load gallery

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

            if (window.innerWidth < 700) {

                LoadingElement.css("width", "clamp(125px, 30vw, 175px)");

            }

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
