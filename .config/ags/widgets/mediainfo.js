const { Widget } = ags;
const { Mpris } = ags.Service;

export const MediaInfo = () => Widget.Box({
    className: 'bar-group-pad-music spacing-h-10',
    style: "margin-left: -16rem;",
    children: [
        Widget.Box({
            halign: 'center',
            className: 'bar-music-coverbox',
            connections: [[Mpris, box => {
                const mpris = Mpris.getPlayer('');
                if (mpris?.coverPath) {
                    box.visible = true;
                    box.setStyle(`background-image: url('${mpris.coverPath}');`);
                } else {
                    box.visible = false;
                }
            }]],
            children: [
                Widget.Box({
                    valign: 'center',
                    style: 'margin-left: 0.75rem;',
                    children: [Widget.Label({
                        valign: 'center',
                        className: 'bar-music-playstate-txt',
                        connections: [[Mpris, label => {
                            const mpris = Mpris.getPlayer('');
                            label.label = `${mpris?.playBackStatus == 'Playing' ? '' : ''}`;
                        }]],
                    })],
                    connections: [[Mpris, label => {
                        const mpris = Mpris.getPlayer('');
                        label.toggleClassName('bar-music-playstate-playing', mpris?.playBackStatus == 'Playing');
                        label.toggleClassName('bar-music-playstate', mpris?.playBackStatus == 'Paused');
                    }]],
                }),
            ]
        }),
        Widget.Box({
            className: 'bar-music-label-container',
            vertical: true,
            halign: 'start',
            valign: 'center',
            children: [Widget.Label({
                halign: 'start',
                valign: 'center',
                maxWidthChars: 40,
                ellipsize: 3,
                className: 'bar-music-label txt txt-norm',
                connections: [[Mpris, label => {
                    const mpris = Mpris.getPlayer('');
                    if (mpris)
                        label.label = `${mpris.trackTitle}`;
                    else
                        label.label = 'Nothing';
                }]],
            }),
            Widget.Label({
                halign: 'start',
                maxWidthChars: 40,
                ellipsize: 3,
                valign: 'center',
                className: 'bar-music-label txt txt-smallie',
                connections: [[Mpris, label => {
                    const mpris = Mpris.getPlayer('');
                    if (mpris)
                        label.label = `${mpris.trackArtists}`;
                    else
                        label.label = 'Playing';
                }]],
            }),
            ],
        })
    ]
});