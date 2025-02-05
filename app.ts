import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./widget/bar/Bar"
import Applauncher from "./widget/applauncher/Applauncher"
import NotificationPopups from "./widget/notifications/NotificationPopups"
import Logout from "./widget/logout/Logout"

App.start({
  css: style,
  instanceName: "hyprshell",
  requestHandler(request, res) {
    print(request)
    res("ok")
  },
  main() {
    App.get_monitors().map(Bar),
    App.get_monitors().map(NotificationPopups),
    Logout(),
    Applauncher()
  },
})
