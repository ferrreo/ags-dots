const { App, Service } = ags;
const { execAsync } = ags.Utils;

async function setupScss() {
    try {
        await execAsync(['sassc', `${App.configDir}/scss/main.scss`, `${App.configDir}/style.css`]);
        ags.App.resetCss();
        ags.App.applyCss(`${App.configDir}/style.css`);
    } catch (error) {
        print(error);
    }
}

class ThemeService extends Service {
    static { Service.register(this); }

    constructor() {
        super();
        this.setup();
    }

    setup() {
        setupScss();
    }
}

var Theme = class Theme {
    static { Service.export(this, 'Theme'); }
    static instance = new ThemeService();
};