import { App, Astal, Gdk, Gtk } from "astal/gtk3"
import { Variable } from "astal"

function hide() {
    App.get_window("logout")!.hide()
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
                <box widthRequest={100} className="Logout" vertical halign={CENTER} valign={CENTER}>
                    <button>
                        <box
                            halign={CENTER}
                            className="action"
                            vertical>
                            <icon icon="system-shutdown" />
                            <label label="Apagar" />
                        </box>
                    </button>
                </box>
                <eventbox expand onClick={hide} />
            </box>
            <eventbox widthRequest={width(w => w / 2)} expand onClick={hide} />
        </box>
    </window>
}
