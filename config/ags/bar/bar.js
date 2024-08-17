import Audio from './widgets/audio.js'
import Battery from './widgets/battery.js'
import Clock from './widgets/clock.js'
import KeyboardLayout from './widgets/keyboard_layout.js'
import Network from './widgets/network.js'
import Workspaces from './widgets/workspaces.js'

const Separator = () => Widget.Separator()

const StartWidgets = () => Widget.Box({
  children: [
    Workspaces()
  ],
  hpack: 'start'
})

const CenterWidgets = () => Widget.Box({
  children: [
    Clock()
  ],
  hpack: 'center'
})

const EndWidgets = () => Widget.Box({
  children: [
    KeyboardLayout(),
    Network(),
    Audio(),
    Battery(),
  ].reduce((accumulator, widget) => {
    accumulator.push(Separator().hook(widget, (self) => {
      self.visible = widget.visible
    }, 'notify::visible'))
    accumulator.push(widget)
    return accumulator
  }, []),
  hpack: 'end',
})

const Bar = (monitor = 0) => Widget.Window({
  monitor,
  name: `bar-${monitor}`,
  class_name: 'bar',
  anchor: ['top', 'left', 'right'],
  exclusivity: 'exclusive',
  child: Widget.CenterBox({
    start_widget: StartWidgets(),
    center_widget: CenterWidgets(),
    end_widget: EndWidgets()   
  }),
})

export default Bar
