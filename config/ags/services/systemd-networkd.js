class SystemdNetworkd extends Service {
  static {
    Service.register(
      this,
      {
        'status-changed': [],
      },
      {
        'is-online': ['boolean', 'r'],
        'interface-type': ['string', 'r'],
        'interface-name': ['string', 'r'],
        'ip': ['string', 'r']
      }
    )
  }
  
  #is_online = false
  #interface_type = 'none'
  #interface_name = 'none'
  #ip = 'none'

  get interface_type() {
    return this.#interface_type
  }

  get interface_name() {
    return this.#interface_name
  }

  get ip() {
    return this.#ip
  }

  get is_online() {
    return this.#is_online
  }

  constructor() {
    super()

    const ip_listener = Utils.subprocess(
      ['ip', 'monitor', 'address'],
      (output) => this.#onChange(),
      (err) => logError(err),
    )

    this.#onChange()
  }

  #onChange() {
    // Heuristic: 
    // find all interfaces that are *configured*
    // then find all of them that are *online*
    // if none of them are online, network is dead
    // if some of them are, 'ether' takes priority over 'wlan'
    
    const interfaces = JSON.parse(Utils.exec('networkctl status --all --json=short')).Interfaces
    const managed_interfaces = interfaces.filter(int => int.AdministrativeState === 'configured')
    const online_interfaces = managed_interfaces.filter(int => int.OnlineState === 'online')
    let iface

    if (online_interfaces.length === 0) {
      this.#is_online = false
      this.#interface_type = 'none'
      this.#ip = 'none'
      print('offline')
    }
    else {
      this.#is_online = true
      
      iface = online_interfaces.find(int => int.Type === 'ether')
      if (!iface) {
        iface = online_interfaces.find(int => int.Type === 'wlan')
      }

      this.#interface_type = iface.Type
      this.#interface_name = iface.Name
      this.#ip = iface.Addresses[0].Address.join('.')
    }

    this.emit('changed')
  }
  
  connect(event = 'changed', callback) {
    return super.connect(event, callback)
  }
}

const network = new SystemdNetworkd

export default network
