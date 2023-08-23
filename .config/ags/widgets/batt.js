const { Widget } = ags;
const { Battery } = ags.Service;
import { getBattery } from '../lib.js';

export const Batt = () => Widget.Box({
    halign: 'end',
    tooltipText: 'Battery Remaining',
    valign: 'center',
    className: '',
    connections: [[Battery, box => {
        box.visible = Battery?.available;
    }]],
    children: [
        Widget.Label({
            halign: 'end',
            valign: 'center',
            className: 'txt-larger txt icon-material',
            style: 'margin-right: 0.5rem; margin-top: 1px;',
            label: 'battery_5_bar',
            connections: [[Battery, label => {
                if (Battery?.available) {
                    label.label = getBattery(Battery);
                }
            }]],
        }),
        Widget.Label({
            halign: 'end',
            valign: 'center',
            className: 'txt-norm txt',
            connections: [[Battery, label => {
                if (Battery?.available) {
                    label.label = Battery?.percent + "%";
                }
            }]],
        }),
    ],
});
