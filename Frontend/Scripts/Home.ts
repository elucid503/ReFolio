// Modal Stuff (Gallery) 

import { Snowstorm } from "./Snow.js";

const Gallery = $('.Responsive-Gallery');
const Modal = $('#Gallery-Modal');
const ModalImg = $('#Modal-Image');
const CloseBtn = $('#Modal-Close');

Gallery.on('click', 'img', function (Event) {
    
    const ImageName = $(this).attr('src')?.split('/').pop() || '';
    const AssociatedObjectName = $(Event.target).attr("ObjectName") || '';

    ModalImg.hide();
    ModalImg.attr('src', "../Assets/Gallery/Dynamic/" + (AssociatedObjectName == "NYC" ? ImageName.replace(".jpg", ".png") : ImageName.replace(".png", ".jpg")));

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

// Gallary Meta

const Images: { Name: string, Limit: number }[] = [
    
    {

        Name: "NYC",
        Limit: 41

    },

    {

        Name: "LIC-6-7",
        Limit: 32

    },

    {

        Name: "DSCGLF-9-13",
        Limit: 67

    },

    {

        Name: "DSCGLF-9-27",
        Limit: 83

    },

    {

        Name: "DSCGLF-10-19",
        Limit: 78

    },

] 


async function AddImages(Needed: number) {
    
    let Added = 0;
    const Previous: string[] = [];

    const ToAddFromEach = Math.ceil(Needed / Images.length);
    
    for (const ImageObj of Images) {

        for (let i = 1; i <= ToAddFromEach; i++) {

            if (Added > Needed) {

                break;

            }

            const ImageIndex = Math.floor(Math.random() * ImageObj.Limit) + 1;

            if (Previous.includes(ImageObj.Name + ImageIndex)) {

                continue;

            }

            Previous.push(ImageObj.Name + ImageIndex);

            // Hotswap the names for NYC as it was created using the old compression method

            const Image = $(`<img src="../Assets/Gallery/Dynamic/${ImageObj.Name}_${ImageIndex}.${ImageObj.Name == "NYC" ? "jpg" : "png"}" alt="${ImageObj.Name} ${ImageIndex}">`);

            Image.attr("ObjectName", ImageObj.Name);

            Gallery.append(Image);

            Added++;

        }

    }
    
}

AddImages(20);

const MorePhotosBtn = $("#Button-MorePhotos");

MorePhotosBtn.on("click", () => {

    // Randomize the order of the images

    Gallery.children().remove();

    AddImages(20);
    
});

new Snowstorm($(".Snowstorm")).Start();