const { Widget } = ags;
const { execAsync } = ags.Utils;
import barConfig from '../barConfig.js';
import { getWeatherSymbol, getTemp } from '../lib.js';

export const Weather = () => Widget.Box({
    halign: 'end',
    tooltipText: 'Weather',
    valign: 'center',
    style: 'margin-right: 2.5rem;',
    children: [
        Widget.Label({
            halign: 'end',
            valign: 'center',
            className: 'txt-larger txt icon-material',
            style: 'margin-right: 0.5rem; margin-top: 1px;',
            label: 'rainy',
        }),
        Widget.Label({
            halign: 'end',
            valign: 'center',
            className: 'txt-norm txt',
        }),
    ],
    connections: [[barConfig?.weatherUpdateInterval * 1000, async box => {
        setTimeout(() => {
            execAsync(`curl https://wttr.in/${barConfig?.city}?format=j1`)
                .then(output => {
                    const weather = JSON.parse(output);
                    const weatherCode = weather.current_condition[0].weatherCode;
                    box.tooltipText = weather.current_condition[0].weatherDesc[0].value;
                    box.children[0].label = getWeatherSymbol(weatherCode);
                    box.children[1].label = getTemp(weather.current_condition[0].temp_C);
                }).catch(console.error)
        }, 5000);
    }]],
});
