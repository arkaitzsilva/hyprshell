import { App } from "astal/gtk3"
import { Variable, GLib, bind } from "astal"
import { Astal, Gtk, Gdk } from "astal/gtk3"
import Hyprland from "gi://AstalHyprland"
import Battery from "gi://AstalBattery"
import Wp from "gi://AstalWp"
import Network from "gi://AstalNetwork"
import Tray from "gi://AstalTray"

function SysTray() {
  const tray = Tray.get_default()

  return <box className="SysTray">
    {bind(tray, "items").as(items => items.map(item => (
      <menubutton
        tooltipMarkup={bind(item, "tooltipMarkup")}
        usePopover={false}
        actionGroup={bind(item, "action-group").as(ag => ["dbusmenu", ag])}
        menuModel={bind(item, "menu-model")}>
        <icon gicon={bind(item, "gicon")} />
      </menubutton>
    )))}
  </box>
}

function Exit() {
  return <box className="Exit">
    <button>
      <icon icon="system-shutdown" />
    </button>
  </box>
}

function Wifi() {
  const { wifi } = Network.get_default()

  return <icon
    tooltipText={bind(wifi, "ssid").as(String)}
    className="Wifi"
    icon={bind(wifi, "iconName")} />
}

function AudioLevel() {
  const speaker = Wp.get_default()?.audio.defaultSpeaker!

  return <box className="AudioSlider">
    <icon 
      icon={bind(speaker, "volumeIcon")} />
    <label label={bind(speaker, "volume").as(p =>
      `${Math.round(p * 100)}`
    )} />
  </box>
}

function BatteryLevel() {
  const bat = Battery.get_default()

  return <box className="Battery"
      visible={bind(bat, "isPresent")} >
    <icon 
      icon={bind(bat, "batteryIconName")} />

    <overlay>
      <levelbar
        hexpand
        value={bind(bat, "percentage")} />

      <label
        label={bind(bat, "percentage").as(p =>
          `${Math.floor(p * 100)} %`
        )} /> 
    </overlay>
  </box>
}

function Workspaces() {
  const hypr = Hyprland.get_default()

  return <box className="Workspaces">
    {bind(hypr, "workspaces").as(wss => wss
      .filter(ws => !(ws.id >= -99 && ws.id <= -2)) // filter out special workspaces
      .sort((a, b) => a.id - b.id)
      .map(ws => (
        <button
          className={bind(hypr, "focusedWorkspace").as(fw =>
            ws === fw ? "focused" : "")}
          onClicked={() => ws.focus()}>
            {ws.id}
        </button>
      ))
    )}
  </box>
}

function Time({ format = "%H:%M - %A, %d/%m" }) {
  const time = Variable<string>("").poll(1000, () =>
    GLib.DateTime.new_now_local().format(format)!)

  return <label
    className="Time"
    onDestroy={() => time.drop()}
    label={time()}
  />
}

export default function Bar(monitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return <window
    className="Bar"
    gdkmonitor={monitor}
    exclusivity={Astal.Exclusivity.EXCLUSIVE}
    anchor={TOP | LEFT | RIGHT}>
    <centerbox>
      <box hexpand halign={Gtk.Align.START}>
        <Workspaces />
      </box>
      <box>
        <Time />
      </box>
      <box hexpand halign={Gtk.Align.END} >
        <SysTray />
        <Wifi />
        <AudioLevel />
        <BatteryLevel />
        <Exit />
      </box>
    </centerbox>
  </window>
}