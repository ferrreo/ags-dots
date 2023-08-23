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
    connections: [[900000, async box => {
        try {
            setTimeout(() => {
            let weather = exec(`curl https://wttr.in/${city}?format=j1`);
            weather = JSON.parse(weather);
            const weatherCode = weather.current_condition[0].weatherCode;
            box.tooltipText = weather.current_condition[0].weatherDesc[0].value;
            box.children[0].label = getSymbol(weatherCode);
            box.children[1].label = weather.current_condition[0].temp_C + "°C";
            }, 5000);
        } catch (err) {
            console.log(err);
        }
    }]],
});

function getSymbol(weatherCode) {
    const dt = new Date();
    const hour = dt.getHours();
    if (hour < 7 || hour > 21) {
        return NIGHT_WEATHER_SYMBOL[WWO_CODE[weatherCode]];
    }
    return WEATHER_SYMBOL[WWO_CODE[weatherCode]];
}

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
    "Unknown": "air",
    "Cloudy": "cloud",
    "Fog": "foggy",
    "HeavyRain": "rainy_heavy",
    "HeavyShowers": "rainy_heavy",
    "HeavySnow": "snowing_heavy",
    "HeavySnowShowers": "snowing_heavy",
    "LightRain": "rainy",
    "LightShowers": "rainy",
    "LightSleet": "rainy_snow",
    "LightSleetShowers": "rainy_snow",
    "LightSnow": "cloudy_snowing",
    "LightSnowShowers": "cloudy_snowing",
    "PartlyCloudy": "partly_cloudy_day",
    "Sunny": "clear_day",
    "ThunderyHeavyRain": "thunderstorm",
    "ThunderyShowers": "thunderstorm",
    "ThunderySnowShowers": "thunderstorm",
    "VeryCloudy": "cloud",
}

const NIGHT_WEATHER_SYMBOL = {
    "Unknown": "air",
    "Cloudy": "cloud",
    "Fog": "foggy",
    "HeavyRain": "rainy_heavy",
    "HeavyShowers": "rainy_heavy",
    "HeavySnow": "snowing_heavy",
    "HeavySnowShowers": "snowing_heavy",
    "LightRain": "rainy",
    "LightShowers": "rainy",
    "LightSleet": "rainy_snow",
    "LightSleetShowers": "rainy_snow",
    "LightSnow": "cloudy_snowing",
    "LightSnowShowers": "cloudy_snowing",
    "PartlyCloudy": "partly_cloudy_night",
    "Sunny": "clear_night",
    "ThunderyHeavyRain": "thunderstorm",
    "ThunderyShowers": "thunderstorm",
    "ThunderySnowShowers": "thunderstorm",
    "VeryCloudy": "cloud",
}