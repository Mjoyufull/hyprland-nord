const hyprland = await Service.import('hyprland')

const KeyboardLayout = () => Widget.Box({
  children: [
    Widget.Label({
      label: 'En'
    }).hook(hyprland, (self, kbd_name, layout_name) => {
      self.label = [
        ['English (US)', 'En'],
        ['Russian', 'Ru']
      ].find(([name]) => name === layout_name)?.[1]
    }, 'keyboard-layout')
  ],
  class_name: 'widget',
})

export default KeyboardLayout
