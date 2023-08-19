const { Widget } = ags;

export const Clock = () => Widget.Box({
    vertical: true,
    halign: 'end',
    valign: 'center',
    sensitive: true,
    className: 'clock',
    children: [
        Widget.Label({
            halign: 'end',
            valign: 'center',
            className: 'txt-norm txt',
            connections: [[5000, label => label.label = getFormattedTime()]],
        }),
        Widget.Label({
            halign: 'end',
            valign: 'center',
            className: 'txt-smallie txt',
            connections: [[5000, label => label.label = getFormattedDate()]],
        }),
    ],
});

function getFormattedTime() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    return `${hours}:${minutes}`
}

function getFormattedDate() {
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

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
