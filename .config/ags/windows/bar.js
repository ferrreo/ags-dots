const { Widget } = ags;
import { Workspaces } from "../modules/workspaces.js";
import { Music } from "../modules/music.js";
import { ActiveWindow } from "../modules/activewindow.js";
import { System } from "../modules/system.js";

const left = Widget.Box({
    hexpand: false,
    halign: 'start',
    className: 'bar-group-left',
    children: [Workspaces(), Music()],
});

const center = Widget.Box({
    hexpand: true,
    halign: 'center',
    className: 'bar-group-center',
    children: [ActiveWindow()],
});

const right = Widget.Box({
    className: 'bar-group-right',
    hexpand: false,
    halign: 'end',
    children: [System()],
});

export const bar = Widget.Window({
    name: 'bar',
    anchor: ['top', 'left', 'right'],
    exclusive: true,
    child: Widget.CenterBox({
        className: 'bar-bg',
        children: [
            left,
            center,
            right
        ],
    }),
});