import { App, Astal, Gdk, Gtk } from "astal/gtk3"
import { Variable } from "astal"

function hide() {
    App.get_window("logout")!.hide()
}

export default function Logout() {
    const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor
    const { CENTER } = Gtk.Align

    return <window
        name="logout"
        anchor={TOP | BOTTOM | LEFT | RIGHT}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        keymode={Astal.Keymode.EXCLUSIVE}
        application={App}
        visible={false}
        onKeyPressEvent={function (self, event: Gdk.Event) {
            if (event.get_keyval()[1] === Gdk.KEY_Escape)
                self.hide()
        }}>
        <box hexpand={false} vertical>
            <eventbox expand onClick={hide} />
            <box 
                widthRequest={100}
                className="Logout"
                horizontal
                halign={CENTER} >
                <button>
                    <box
                        halign={CENTER}
                        className="action"
                        vertical>
                            <icon icon="system-shutdown" />
                            <label label="Apagar" />
                    </box>
                </button>
                <button>
                    <box
                        halign={CENTER}
                        className="action"
                        vertical>
                            <icon icon="system-reboot" />
                            <label label="Reiniciar" />
                    </box>
                </button>
            </box>
            <eventbox expand onClick={hide} />
        </box>
    </window>
}
