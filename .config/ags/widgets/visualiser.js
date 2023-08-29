const { Widget } = ags;
const { Mpris } = ags.Service;
import { cvjson } from '../services/cvjson.js';

const numBars = 15;

export const Visualiser = () => Widget.Box({
    className: 'musicbox',
    halign: 'center',
    valign: 'end',
    vexpand: false,
    connections: [
        [Mpris, box => {
            const mpris = Mpris.getPlayer('');
            if (mpris?.playBackStatus == 'Playing' && !cvjson?.started) {
                cvjson.start();
            } else if ((!mpris?.playBackStatus || mpris?.playBackStatus != 'Playing') && cvjson?.started) {
                cvjson.stop();
                for (const child of box.get_children()) {
                    child.fraction = 0;
                }
            }
        }],
        [cvjson.service, box => {
            if (!cvjson.started || !cvjson?.service?.state || cvjson?.service?.state.length < numBars) {
                return;
            }
            let count = 0;
            for (const child of box.get_children()) {
                child.fraction = cvjson?.service.state[count] / 1500;
                count++;
            }
        }],
    ],
    children: Array.from({ length: numBars }, (_, i) => i).map(i => (Widget.ProgressBar({
        vertical: true,
        className: 'musicbox-bar',
        value: 0,
        inverted: true,
    }))),
});