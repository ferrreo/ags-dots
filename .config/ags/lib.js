import barConfig from './barConfig.js';

export const getTemp = (temp) => {
    if (barConfig?.isAmerican) {
        return Math.round((temp * 9 / 5) + 32) + "°F";
    }
    return temp + "°C";
};

export const getWeatherSymbol = (weatherCode) => {
    const dt = new Date();
    const hour = dt.getHours();
    if (hour < 7 || hour > 21) {
        return NIGHT_WEATHER_SYMBOL[WWO_CODE[weatherCode]];
    }
    return WEATHER_SYMBOL[WWO_CODE[weatherCode]];
};

export const getFormattedTime = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    return `${hours}:${minutes}`
}

export const getFormattedDate = () => {
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    let dayOfMonth = date.getDate();
    switch (dayOfMonth) {
        case 1:
        case 21:
        case 31:
            dayOfMonth += "st";
            break;
        case 2:
        case 22:
            dayOfMonth += "nd";
            break;
        case 3:
        case 23:
            dayOfMonth += "rd";
            break;
        default:
            dayOfMonth += "th";
    }

    return `${days[day]}, ${dayOfMonth} ${months[month]}`;
}

export const getBattery = (batt) => {
    if (batt?.charging) {
        return "battery_charging_full";
    }
    if (batt?.charged) {
        return "battery_full";
    }
    
    return battIcons[Math.floor(battIcons.length * (batt?.percent / 100))];
}

const battIcons = ["battery_0_bar","battery_1_bar","battery_2_bar","battery_3_bar","battery_4_bar","battery_5_bar", "battery_6_bar"];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
    "HeavyRain": "rainy",
    "HeavyShowers": "rainy",
    "HeavySnow": "snowing",
    "HeavySnowShowers": "snowing",
    "LightRain": "rainy",
    "LightShowers": "rainy",
    "LightSleet": "rainy",
    "LightSleetShowers": "rainy",
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
    "HeavyRain": "rainy",
    "HeavyShowers": "rainy",
    "HeavySnow": "snowing",
    "HeavySnowShowers": "snowing",
    "LightRain": "rainy",
    "LightShowers": "rainy",
    "LightSleet": "rainy",
    "LightSleetShowers": "rainy",
    "LightSnow": "cloudy_snowing",
    "LightSnowShowers": "cloudy_snowing",
    "PartlyCloudy": "partly_cloudy_night",
    "Sunny": "clear_night",
    "ThunderyHeavyRain": "thunderstorm",
    "ThunderyShowers": "thunderstorm",
    "ThunderySnowShowers": "thunderstorm",
    "VeryCloudy": "cloud",
}