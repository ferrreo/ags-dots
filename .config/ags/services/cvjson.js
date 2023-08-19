const { App } = ags;
import { deflisten } from './deflisten.js';

function start() {
    cvjson.started = true;
    cvjson.service.start();
}

function stop() {
    cvjson.started = false;
    cvjson.service.stop();
}

export const cvjson = {
    start: start,
    stop: stop,
    started: true,
    service: deflisten('cvjson', `${App.configDir}/programs/cvjson ${App.configDir}/programs/cava`, (line) => {
        try {
            return JSON.parse(line);
        } catch {
            return [];
        }
    }),
};

