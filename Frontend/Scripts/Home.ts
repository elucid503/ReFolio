function GenerateHSL(): string {

    // Limit to more vibrant colors

    const LowerLimit = 30;
    const UpperLimit = 330;

    const Hue = Math.floor(Math.random() * (UpperLimit - LowerLimit) + LowerLimit);

    return `hsl(${Hue}, 5%, 30%)`;

}

function UpdateColors(HSLString: string): void {

    const Image = $(".Header .Image img");    

    // Convert HSL string to hue rotation

    const Hue = (HSLString?.match(/(\d+)/) || [])[0];

    Image.css("filter", `sepia(1) hue-rotate(${Hue}deg)`);    

    // Elements

    $(":root").css("--Color-Accent", HSLString);

}

const Color = GenerateHSL();
UpdateColors(Color);