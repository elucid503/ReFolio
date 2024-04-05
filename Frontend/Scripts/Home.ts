function GenerateHSL(): string {

    // Limit to more vibrant colors

    const LowerLimit = 10;
    const UpperLimit = 350;

    const Hue = Math.floor(Math.random() * (UpperLimit - LowerLimit) + LowerLimit);

    return `hsl(${Hue}, 3%, 30%)`;

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

Gallery.on('click', 'img', function() {
    
    Modal.fadeIn(200);

    ModalImg.attr('src', $(this).attr('src') || '');

});

CloseBtn.on('click', function() {
    
    Modal.fadeOut(200);

});

Modal.on('click', function(e) {
    
    if (e.target === this) {

        Modal.fadeOut(200);

    }

});
