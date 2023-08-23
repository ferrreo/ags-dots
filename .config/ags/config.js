const { App } = ags;
const { exec } = ags.Utils;
import { bar } from './windows/bar.js';
import { calendar } from './windows/calendar.js';

exec('sassc ' + App.configDir + '/scss/main.scss ' + App.configDir + '/style.css');
App.resetCss();
App.applyCss(`${App.configDir}/style.css`);

export default {
    style: App.configDir + '/style.css',
    stackTraceOnError: true,
    windows: [
        bar,
        calendar,
    ],
};