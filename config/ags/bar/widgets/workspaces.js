const hyprland = await Service.import('hyprland')

const switch_workspace = (ws) => hyprland.messageAsync(`dispatch workspace ${ws}`)

const Workspaces = () => Widget.Box({
  children: Array.from({ length: 10 }, (_, i) => (i + 1)).map((i) => Widget.Button({
    attribute: {id: i},
    label: `${i}`,
    class_name: 'workspace-button',
    on_primary_click: () => switch_workspace(i),
  }).hook(hyprland.active.workspace, (self) => {
    self.toggleClassName('workspace-button-active', hyprland.active.workspace.id === self.attribute.id)
  })),
})

export default Workspaces
