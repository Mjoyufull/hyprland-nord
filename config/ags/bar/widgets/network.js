import network from '../../services/systemd-networkd.js'

const Network = () => Widget.Box({
  children: [
    Widget.Icon({
      icon: 'network-wired-disconnected-symbolic'
    }).hook(network, (self) => {
      self.icon = [
        ['ether', 'network-wired-symbolic'],
        ['wlan', 'network-wireless-symbolic'],
        ['none', 'network-wired-disconnected-symbolic']
      ].find(([con_type]) => con_type === network.interface_type)?.[1]
    }),
    Widget.Label({
      label: 'foobar'
    }).hook(network, (self) => {
      self.label = network.ip
    })
  ],
  class_name: 'widget',
})

export default Network
