const { App } = ags;
import { deflisten } from './deflisten.js';
import barConfig from '../barConfig.js';

export const gostat = deflisten('gostat', `${App.configDir}/programs/gostat ${barConfig.sysinfoUpdateInterval}`, (line) => {
    return JSON.parse(line);
});