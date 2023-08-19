const { Widget } = ags;
const { lookUpIcon } = ags.Utils;
import { gohypr }  from '../services/gohypr.js';

const substitutes = [
    { from: 'code-url-handler', to: 'code' },
];

export const ActiveWindow = () => Widget.Box({
    valign: 'center',
    halign: 'fill',
    className: 'active-window',
    children: [
        Widget.Icon({
            className: 'progicon progiconicon',
            connections: [[gohypr, icon => {
                if (!gohypr.state) {
                    return;
                }
                let classIcon = gohypr.state.activewindow.class;
                let titleIcon = gohypr.state.activewindow.title;
                substitutes.forEach(({ from, to }) => {
                    if (classIcon === from)
                        classIcon = to;

                    if (titleIcon === from)
                        titleIcon = to;
                });

                const hasTitleIcon = lookUpIcon(titleIcon, 128);
                const hasClassIcon = lookUpIcon(classIcon, 128);

                if (hasClassIcon)
                    icon.icon_name = classIcon;

                if (hasTitleIcon)
                    icon.icon_name = titleIcon;

                icon.visible = hasTitleIcon || hasClassIcon;
            }]],
        }),
        Widget.Label({
            className: 'txt txt-norm progicon',
            justify: 'left',
            halign: 'start',
            maxWidthChars: 40,
            ellipsize: 3,
            connections: [[gohypr, label => {
                if (!gohypr.state) {
                    return;
                }
                label.label = gohypr.state.activewindow.title || '';
            }]]
        })
    ],
});
