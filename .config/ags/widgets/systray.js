const { SystemTray } = ags.Service;
const { Widget } = ags;

export const Systray = () => Widget.Box({
    className: 'systray',
    connections: [[SystemTray, box => {
        const arr = SystemTray.items;
        box.children = arr.map(item =>{ 
            const icon = SystemTray.get_icon(item, 24);
            if (!icon) {
                return;
            }
            icon.set_margin_left(7);
            const btn = Widget.Button({
            //call the Activate function when icon is clicked
            //Note: if item.ItemIsMenu is true, left click should open menu
            onPrimaryClick: (_, event) => item.ActivateAsync(event.get_root_coords()[1], event.get_root_coords()[2]),
            //open menu on right click.
            //Note: if item.Menu is not set item.ContextMenuAsync(x, y) should be called.
            onSecondaryClick: (_, event) => {
                item.AgsMenu.popup_at_widget(btn, 8, 2, event);
            },
            //show icon
            className: 'systray-icon',
            child: icon,
            tooltipMarkup: SystemTray.get_tooltip_markup(item)
        } ); return btn;});
    }]],
});