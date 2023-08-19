const { Widget } = ags;
import { gostat } from '../services/gostat.js';

export const CpuTemp = () => Widget.Box({
    halign: 'end',
    tooltipText: 'CPU Temperature',
    valign: 'center',
    className: '',
    children: [
        Widget.Label({
            halign: 'end',
            valign: 'center',
            className: 'txt-larger txt icon-material',
            style: 'margin-right: 0.25rem; margin-top: 1px;',
            label: 'thermometer',
        }),
        Widget.Label({
            halign: 'end',
            valign: 'center',
            className: 'txt-norm txt',
            connections: [[gostat, label => {
                if (gostat?.state?.cpu) {
                    label.label = gostat?.state?.cputemp + "°C";
                }
            }]],
        }),
    ],
});