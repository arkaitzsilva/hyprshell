import { App, Astal, Gdk, Gtk } from "astal/gtk3"
import { Variable } from "astal"

function hide() {
    App.get_window("launcher")!.hide()
}

export default function Logout() {
    const { CENTER } = Gtk.Align
    const width = Variable(1000)

    return <window
        name="logout"
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM}
        exclusivity={Astal.Exclusivity.IGNORE}
        keymode={Astal.Keymode.ON_DEMAND}
        application={App}
        visible={false}
        onKeyPressEvent={function (self, event: Gdk.Event) {
            if (event.get_keyval()[1] === Gdk.KEY_Escape)
                self.hide()
        }}>
        <box>
            <eventbox widthRequest={width(w => w / 2)} expand onClick={hide} />
            <box hexpand={false} vertical>
                <eventbox heightRequest={100} onClick={hide} />
                <box widthRequest={500} className="Logout" vertical>
                    
                </box>
                <eventbox expand onClick={hide} />
            </box>
            <eventbox widthRequest={width(w => w / 2)} expand onClick={hide} />
        </box>
    </window>
}
