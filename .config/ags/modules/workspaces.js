const { Widget } = ags;
const { execAsync } = ags.Utils;
import { gohypr } from '../services/gohypr.js';
import barConfig from '../barConfig.js';

export const Workspaces = () => Widget.EventBox({
    onScrollUp: () => execAsync('hyprctl dispatch workspace -1'),
    onScrollDown: () => execAsync('hyprctl dispatch workspace +1'),
    child: Widget.Box({
        children: [
            Widget.Box({
                halign: 'center',
                children: [Widget.Box({
                    children: Array.from({ length: barConfig?.numberOfWorkspaces }, (_, i) => i + 1).map(i => (Widget.Button({
                        className: 'bar-ws-button',
                        onClicked: () => execAsync(`hyprctl dispatch workspace ${i}`).catch(print),
                        child: Widget.Label({
                            valign: 'center',
                            label: `${i}`,
                            className: 'bar-ws',
                            connections: [
                                [gohypr, label => {
                                    if (!gohypr.state) {
                                        return;
                                    }
                                    const { workspaces, activeworkspace } = gohypr.state;
                                    let thisSpace;
                                    for (const wk of workspaces) {
                                        if (wk.id == i) {
                                            thisSpace = wk;
                                            break;
                                        }
                                    }

                                    label.toggleClassName('bar-ws-active', i == activeworkspace);
                                    label.toggleClassName('bar-ws-occupied', thisSpace?.populated || i == activeworkspace);
                                    label.toggleClassName('bar-ws-empty', !thisSpace?.populated);
                                    label.toggleClassName('bar-ws-left', !thisSpace?.leftPopulated && activeworkspace != i - 1);
                                    label.toggleClassName('bar-ws-right', !thisSpace?.rightPopulated && activeworkspace != i + 1);
                                }],
                            ],
                        }),
                    }))),
                })]
            }),
        ]
    })
});
