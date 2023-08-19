const { Widget } = ags;

export const calendar = Widget.Window({
    name: 'calendar',
    anchor: ['top', 'right'],
    visible: false,
    exclusive: true,
    child: Widget.Box({
        className: 'cal',
        children: [
            Widget.Box({
                className: 'calendar',
                children: [
                    Widget.Box({
                        halign: 3,
                        hexpand: true,
                        children: [imports.gi.Gtk.Calendar.new()],
                    }),
                ],
            }),
        ],
    }),
});