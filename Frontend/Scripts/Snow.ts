// 2024 Christmas Easter Egg (Snow Effect) Source Code

/**
 * Options for the Snowstorm class
 */

interface SnowstormConfig {

    FlakesMax?: number;
    FlakesMaxActive?: number;

    AnimationInterval?: number;

    UseGPU?: boolean;

    FlakeWidth?: number;

    FlakeHeight?: number;

    VMaxX?: number;
    VMaxY?: number;

    ZIndex?: number;

    AnimationSpeed?: number;

    WindChangeInterval?: number;

}

/**
 * Snowstorm creates snow effects on the body of the document
*/

export class Snowstorm {

    public IsRunning: boolean = false;

    private Element: JQuery<HTMLElement>;

    private Flakes: Snowflake[] = [];

    private AnimationFrame?: number;

    private ScreenX: number = 0;
    private ScreenY: number = 0;

    private WindOffset: number = Math.random() * 2 - 1;

    private WindChangeInterval: number;

    private readonly Config: Required<SnowstormConfig>;

    constructor(Element: JQuery<HTMLElement>, ProvidedConfig: SnowstormConfig = {}) {

        this.Element = Element;
        
        const RandomMaxSnowflakes = Math.random() * 28 + 128; // Random number between 128 and 156

        this.Config = {

            FlakesMax: Math.round(RandomMaxSnowflakes),

            FlakesMaxActive: Math.round(RandomMaxSnowflakes / 2),

            AnimationInterval: 50,

            UseGPU: true,

            FlakeWidth: 8,
            FlakeHeight: 8,

            VMaxX: 5,
            VMaxY: 4,

            ZIndex: 0,

            AnimationSpeed: Math.random() * 0.2 + 0.65,

            WindChangeInterval: 15_000,

            ...ProvidedConfig,

        };

        // Check if on mobile

        if (window.innerWidth < 768) {

            // Optimize a bit

            this.Config.FlakesMax = 100;
            this.Config.FlakesMaxActive = 50;

            this.Config.UseGPU = false; // Experiment

        }

        this.WindChangeInterval = window.setInterval(() => this.WindOffset = Math.random() * 2 - 1, this.Config.WindChangeInterval);

    }

    public Start() {

        if (this.IsRunning) return;
        
        this.IsRunning = true;

        this.SetScreenSize();

        window.addEventListener("resize", () => this.SetScreenSize());

        for (let i = 0; i < this.Config.FlakesMax; i++) {

            this.Flakes.push(new Snowflake(this.Element, this.Config, this.ScreenX, this.ScreenY));

        }
        
        let LastTime = performance.now();

        const Tick = (CurrentTime: number) => {

            const DeltaTime = (CurrentTime - LastTime) / 16.67; // 60 FPS, so 1000 / 60 = 16.67 ms
            LastTime = CurrentTime;

            this.Flakes.forEach(Flake => Flake.Move(this.ScreenX, this.ScreenY, this.WindOffset, DeltaTime * this.Config.AnimationSpeed) );
            
            this.AnimationFrame = requestAnimationFrame(Tick);

        };

        this.AnimationFrame = requestAnimationFrame(Tick);

    }

    private SetScreenSize() {

        this.ScreenX = window.innerWidth;
        this.ScreenY = window.innerHeight;

    }

    public Stop() {

        if (!this.IsRunning) return;

        this.IsRunning = false;

        this.AnimationFrame ? cancelAnimationFrame(this.AnimationFrame) : null;

        clearInterval(this.WindChangeInterval);

        $(".Snowflake").fadeOut(150, () => $(".Snowflake").remove());

    }

}

class Snowflake {

    private X: number;
    private Y: number;

    private VX: number;
    private VY: number;

    private readonly Size: number;
    private readonly Element: HTMLElement;

    constructor(Element: JQuery<HTMLElement>, private Config: SnowstormConfig, ScreenX: number, ScreenY: number) {

        this.X = Math.random() * ScreenX;
        this.Y = Math.random() * ScreenY * -1;

        this.VX = (Math.random() - 0.5) * (Config.VMaxX || 5);
        this.VY = Math.random() * (Config.VMaxY || 4);

        this.Size = Math.random() * (Config.FlakeWidth || 8);

        this.Element = this.CreateElement();
        Element.append(this.Element);

        this.UpdatePosition();

    }

    private CreateElement(): HTMLElement {

        const Flake = document.createElement("div");

        Flake.className = "Snowflake";
        Flake.innerHTML = "•";
    
        Flake.style.position = "absolute";
        Flake.style.color = "#fff";
        Flake.style.width = `${this.Size}px`;
        Flake.style.height = `${this.Size}px`;
        Flake.style.zIndex = `${this.Config.ZIndex}`;

        this.Config.UseGPU ? Flake.style.transform = "translate3d(0, 0, 0)" : null;

        return Flake;

    }

    private UpdatePosition() {

        this.Element.style.left = `${this.X}px`;
        this.Element.style.top = `${this.Y}px`;

    }

    public Move(ScreenX: number, ScreenY: number, WindEffect: number, TimeScale: number) {

        this.X = (this.X + (this.VX + WindEffect) * TimeScale) % ScreenX;

        if (this.X < 0) this.X += ScreenX;
        
        this.Y += this.VY * TimeScale;

        // Not ideal but works well enough
        
        if (this.Y > ScreenY) {

            this.Reset(ScreenX, ScreenY);

        }

        this.UpdatePosition();

    }

    private Reset(ScreenX: number, ScreenY: number) {

        this.Y = Math.random() * ScreenY * -1;
        this.X = Math.random() * ScreenX;

        this.Element.style.opacity = "1";
        
    }
  
}