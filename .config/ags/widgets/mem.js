const { Widget } = ags;
import { gostat } from '../services/gostat.js';

export const Mem = () => Widget.Box({
    halign: 'end',
    tooltipText: 'Memory Usage',
    valign: 'center',
    children: [
        Widget.Label({
            halign: 'end',
            valign: 'center',
            className: 'txt-larger txt icon-material',
            style: 'margin-right: 0.5rem; margin-top: 1px;',
            label: 'memory',
        }),
        Widget.Label({
            halign: 'end',
            valign: 'center',
            className: 'txt-norm txt',
            connections: [[gostat, label => {
                if (gostat?.state?.mem) {
                    label.label = gostat?.state?.mem + "G";
                }
            }]],
        }),
    ],
});