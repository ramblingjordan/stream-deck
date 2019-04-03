import StreamDeck = require('elgato-stream-deck')
import OBSWebSocket = require('obs-websocket-js')
import Jimp = require('jimp')

const sd = new StreamDeck()
const obs = new OBSWebSocket()

function setScene(sceneName: string) {
  obs.send('SetCurrentScene', { 'scene-name': sceneName})
  .catch(err => {})
}

function createIcon() {
  let icon = new Jimp(72, 72, 'rgb(0, 0, 255)', (err, image) => {
    Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(font => {
      image.print(font, 10, 10, 'TEST')
      image.writeAsync('icons/TEST.png').catch(err=>{
        // It always errors, ignoring it...
      })
    })
  })
}

function eventHandlers() {
  console.log('Listening to event handlers...')
  sd.on('down', (keyIndex: number) => {
    console.log('key %d down', keyIndex)
    sd.fillColor(keyIndex, 255, 0, 0)
    switch(keyIndex) {

      // TOP ROW LEFT TO RIGHT
      case 4: { setScene('Scene - WIDE MAIN') }
      case 3: { setScene('Scene - CLOSE HUNT') }
      case 2: { setScene('Scene - COIN BOX') }
      case 1: { setScene('Card - BRB') }
      case 0: { setScene('Card - PLAIN LOGO') }

      // MIDDLE ROW LEFT TO RIGHT
      case 9: {}
      case 8: {}
      case 7: {}
      case 6: {}
      case 5: {}

      // BOTTOM ROW LEFT TO RIGHT
      case 14: {}
      case 13: {}
      case 12: {}
      case 11: {}
      case 10: {}
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

function setButtonImage(keyID: Number, filePath: String) {
  sd.fillImageFromFile(keyID, filePath)
  .catch((err: String) => {
    console.error(err)
  })
}

function setIcons() {
  console.info('Setting button images')
  setButtonImage(4, 'icons/WIDE.png')
  setButtonImage(3, 'icons/HUNT.png')
  setButtonImage(2, 'icons/COIN_BOX.png')
  setButtonImage(1, 'icons/BRB.png')
  setButtonImage(0, 'icons/LOGO.png')
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

  createIcon()
  setIcons()

  console.log('Connecting to OBS websocket')
  obs.connect({ address: 'localhost:4444'})
}

startup()
eventHandlers()