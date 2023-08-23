const { Widget } = ags;
import { getFormattedTime, getFormattedDate } from '../lib.js';

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
            connections: [[60000, label => label.label = getFormattedDate()]],
        }),
    ],
});

