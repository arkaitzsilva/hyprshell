import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./widget/bar/Bar"
import Applauncher from "./widget/applauncher/Applauncher"

App.start({
  css: style,
  instanceName: "hyprshell",
  requestHandler(request, res) {
    print(request)
    res("ok")
  },
  main: () => App.get_monitors().map(Bar), Applauncher
})
