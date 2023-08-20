const { Widget } = ags;
const { exec } = ags.Utils;

const city = "Stoke-On-Trent";

export const Weather = () => Widget.Box({
    halign: 'end',
    tooltipText: 'Weather',
    valign: 'center',
    style: 'margin-right: 2.5rem;',
    children: [
        Widget.Label({
            halign: 'end',
            valign: 'center',
            className: 'txt-larger txt',
            style: 'margin-right: 0.5rem; margin-top: 1px;',
            label: '🌦',
        }),
        Widget.Label({
            halign: 'end',
            valign: 'center',
            className: 'txt-norm txt',
        }),
    ],
    connections: [[900000, async box => {
        try {
            // timeout here is to delay enough on boot that network has time to connect - this is a hack but for something that updates so rarely it's fine
            setTimeout(() => {
                let weather = exec(`curl https://wttr.in/${city}?format=j1`);
                weather = JSON.parse(weather);
                const weatherCode = weather.current_condition[0].weatherCode;
                box.children[0].label = WEATHER_SYMBOL[WWO_CODE[weatherCode]];
                box.children[1].label = weather.current_condition[0].temp_C + "°C";
            }, 5000);
        } catch (err) {
            console.log(err);
        }
    }]],
});

const WWO_CODE = {
    "113": "Sunny",
    "116": "PartlyCloudy",
    "119": "Cloudy",
    "122": "VeryCloudy",
    "143": "Fog",
    "176": "LightShowers",
    "179": "LightSleetShowers",
    "182": "LightSleet",
    "185": "LightSleet",
    "200": "ThunderyShowers",
    "227": "LightSnow",
    "230": "HeavySnow",
    "248": "Fog",
    "260": "Fog",
    "263": "LightShowers",
    "266": "LightRain",
    "281": "LightSleet",
    "284": "LightSleet",
    "293": "LightRain",
    "296": "LightRain",
    "299": "HeavyShowers",
    "302": "HeavyRain",
    "305": "HeavyShowers",
    "308": "HeavyRain",
    "311": "LightSleet",
    "314": "LightSleet",
    "317": "LightSleet",
    "320": "LightSnow",
    "323": "LightSnowShowers",
    "326": "LightSnowShowers",
    "329": "HeavySnow",
    "332": "HeavySnow",
    "335": "HeavySnowShowers",
    "338": "HeavySnow",
    "350": "LightSleet",
    "353": "LightShowers",
    "356": "HeavyShowers",
    "359": "HeavyRain",
    "362": "LightSleetShowers",
    "365": "LightSleetShowers",
    "368": "LightSnowShowers",
    "371": "HeavySnowShowers",
    "374": "LightSleetShowers",
    "377": "LightSleet",
    "386": "ThunderyShowers",
    "389": "ThunderyHeavyRain",
    "392": "ThunderySnowShowers",
    "395": "HeavySnowShowers",
}

const WEATHER_SYMBOL = {
    "Unknown": "✨",
    "Cloudy": "☁️",
    "Fog": "🌫",
    "HeavyRain": "🌧",
    "HeavyShowers": "🌧",
    "HeavySnow": "❄️",
    "HeavySnowShowers": "❄️",
    "LightRain": "🌦",
    "LightShowers": "🌦",
    "LightSleet": "🌧",
    "LightSleetShowers": "🌧",
    "LightSnow": "🌨",
    "LightSnowShowers": "🌨",
    "PartlyCloudy": "⛅️",
    "Sunny": "☀️",
    "ThunderyHeavyRain": "🌩",
    "ThunderyShowers": "⛈",
    "ThunderySnowShowers": "⛈",
    "VeryCloudy": "☁️",
}
