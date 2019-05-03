import * as OBSWebSocket from 'obs-websocket-js'
const obs = new OBSWebSocket()

export function connect () {
  obs.connect({ address: 'localhost:4444' }).catch((err: string) => { console.error('OBS Connection Error: ' + JSON.stringify(err)) })
}

export function setScene (sceneName: string) {
  obs.send('SetCurrentScene', { 'scene-name': sceneName })
  .catch((err: string) => { console.error(err) })
}
