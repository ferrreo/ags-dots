const { Widget } = ags;
import { gostat } from '../services/gostat.js';

export const Cpu = () => Widget.Box({
    halign: 'end',
    tooltipText: 'CPU Usage',
    valign: 'center',
    className: '',
    children: [
        Widget.Label({
            halign: 'end',
            valign: 'center',
            className: 'txt-larger txt icon-material',
            style: 'margin-right: 0.5rem; margin-top: 1px;',
            label: 'developer_board',
        }),
        Widget.Label({
            halign: 'end',
            valign: 'center',
            className: 'txt-norm txt',
            connections: [[gostat, label => {
                if (gostat?.state?.cpu) {
                    label.label = gostat?.state?.cpu + "%";
                }
            }]],
        }),
    ],
});