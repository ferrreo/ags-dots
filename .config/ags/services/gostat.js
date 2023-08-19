const { App } = ags;
import { deflisten } from './deflisten.js';

const udpateDelay = "2s";

export const gostat = deflisten('gostat', `${App.configDir}/programs/gostat ${udpateDelay}`, (line) => {
    return JSON.parse(line);
});