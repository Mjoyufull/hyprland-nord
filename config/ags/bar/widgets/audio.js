const audio = await Service.import('audio')

const VolumeIndicator = () => Widget.Box({
  children: [
    Widget.Icon().hook(audio.speaker, self => {
      if (audio.speaker.is_muted) {
        self.icon = 'audio-volume-muted-symbolic'
      }
      else {
        const vol = audio.speaker.volume * 100
        const icon = [
          [101, 'overamplified'],
          [67, 'high'],
          [34, 'medium'],
          [1, 'low'],
          [0, 'muted'],
        ].find(([threshold]) => threshold <= vol)?.[1]
        self.icon = `audio-volume-${icon}-symbolic`
      }
    }),
    Widget.Label().hook(audio.speaker, self => {
      self.label = Math.round(audio.speaker.volume * 100).toString()
    })
  ]
})

const MicIndicator = () => Widget.Icon().hook(audio.microphone, self => {
  self.icon = audio.microphone.is_muted ?
    'microphone-disabled-symbolic' :
    'microphone-sensitivity-high-symbolic'
})

const Audio = () => Widget.Button({
  child: Widget.Box({
    children: [
      MicIndicator(),
      VolumeIndicator()
    ]
  }),
  on_clicked: () => Utils.execAsync('foot-popup pulsemixer'),
  class_name: 'widget',
})

export default Audio
