const { Widget } = ags;
import { Visualiser } from "../widgets/visualiser.js";
import { MediaInfo } from "../widgets/mediainfo.js";

export const Music = () => Widget.Box({
    className: 'bar-music',
    children: [Widget.Box({
        className: 'bar-group-margin bar-sides',
        children: [
            Visualiser(),
            MediaInfo()
        ]
    })]
});