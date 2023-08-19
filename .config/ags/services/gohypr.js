const { App } = ags;
import { deflisten } from './deflisten.js';

export const gohypr = deflisten('gohypr', `${App.configDir}/programs/gohypr`, (line) => {
    return JSON.parse(line);
});
