import StreamDeck = require('elgato-stream-deck')
const sd = new StreamDeck()
import OBSWebSocket = require('obs-websocket-js')
const obs = new OBSWebSocket()

function setScene(sceneName: string) {
  obs.send('SetCurrentScene', { "scene-name": sceneName})
}

function eventHandlers() {
  sd.on('down', (keyIndex: number) => {
    console.log('key %d down', keyIndex)
    sd.fillColor(keyIndex, 255, 0, 0)
    switch(keyIndex) {
      case 14: {
        setScene('Scene - WIDE MAIN')
      }
    }
  })
  
  sd.on('up', (keyIndex: number) => {
    console.log('key %d up', keyIndex)
    sd.fillColor(keyIndex, 0, 255, 0)
  })
  
  sd.on('error', (error: string) => {
    console.error(error)
  }) 
}

function startup() {
  console.debug('Starting Up!')

  console.debug('Clearing all keys')
  sd.clearAllKeys()

  console.log('Maximizing brightness')
  sd.setBrightness(100)

  console.log('Setting all to green')
  for(let i=0; i<=14; i++){
    sd.fillColor(i, 0, 255, 0)
  }

  console.log('Connecting to OBS websocket')
  obs.connect({ address: 'localhost:4444'})
}

startup()
eventHandlers()