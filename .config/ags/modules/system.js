const { Widget, App } = ags;
import { Cpu } from "../widgets/cpu.js";
import { CpuTemp } from "../widgets/cputemp.js";
import { Mem } from "../widgets/mem.js";
import { Clock } from "../widgets/clock.js";
import { Weather } from '../widgets/weather.js';
import { Batt } from '../widgets/batt.js';
import { Systray } from "../widgets/systray.js";

export const System = () => Widget.EventBox({
    onPrimaryClick: () => App.toggleWindow('calendar'),
    onHover: (eventbox) => eventbox.toggleClassName('hovered', true),
    onHoverLost: (eventbox) => eventbox.toggleClassName('hovered', false),
    className: 'bar-system',
    child: Widget.Box({
        className: 'bar-group-margin bar-sides',
        halign: 'end',
        children: [
            Widget.Box({
                className: 'bar-group-pad-system spacing-h-15',
                halign: 'end',
                children: [
                    Cpu(),
                    CpuTemp(),
                    Mem(),
                    Batt(),
                    Weather(),
                    Systray(),
                    Clock()
                ],
            }),
        ]
    })
});
