const { Widget } = ags;
const { Battery } = ags.Service;

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

function getBattery(batt) {
    if (batt?.charging) {
        return "battery_charging_full";
    }
    if (batt?.charged) {
        return "battery_full";
    }
    
    return battIcons[Math.floor(battIcons.length * (batt?.percent / 100))];
}

const battIcons = ["battery_0_bar","battery_1_bar","battery_2_bar","battery_3_bar","battery_4_bar","battery_5_bar", "battery_6_bar"];