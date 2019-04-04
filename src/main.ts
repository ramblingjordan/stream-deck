import * as StreamDeck from 'elgato-stream-deck'
import * as OBSWebSocket from 'obs-websocket-js'
import * as path from 'path'

const sd = new StreamDeck()
const obs = new OBSWebSocket()

const ICON_SIZE = 72

function eventHandlers() {
  console.log('Listening to event handlers...')
  sd.on('down', (keyIndex: number) => {
    console.log('key %d down', keyIndex)
    sd.fillColor(keyIndex, 255, 0, 0)
  })
  
  sd.on('up', (keyIndex: number) => {
    console.log('key %d up', keyIndex)
    sd.fillColor(keyIndex, 0, 255, 0)
  })
  
  sd.on('error', (error: string) => {
    console.error(error)
  })
}

async function createIcon(buttonName: string, keyID: number, buttonText: string) {
  let Jimp = require('jimp')

  let file = path.join('icons', buttonName.concat('.png'))
  console.log(file)
  let image = await new Jimp(ICON_SIZE, ICON_SIZE, 'black', (err: string, image: any) => {
    if (err) throw err
  })

  await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE)
    .then((font: any) => {
      image.print(
        font, 
        // size start
        0, 0,
        {
          text: buttonText,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE 
        },
        // total size
        ICON_SIZE, ICON_SIZE
        )
      return image
    }).then((image: any) => {
      return image.write(file) // save
    })
}

function main() {
  console.debug('Starting Up!')

  console.debug('Clearing all keys')
  sd.clearAllKeys()

  console.log('Maximizing brightness')
  sd.setBrightness(100)

  console.log('Setting all to green')
  for (let i = 0; i <= 14; i++) {
    sd.fillColor(i, 0, 255, 0)
  }

  console.info('Setting button images')
  const buttons = require('../config/buttons.json')
  for (let button of buttons) {
    if (button.buttonName) {
      createIcon(button.buttonName, button.keyID, button.title).catch((err: string) => {if (err) throw err})
      let file = path.resolve(__dirname, '..', 'icons', button.buttonName + '.png')
      sd.fillImageFromFile(button.keyID, file).catch((err: string)=>{ if (err) throw err })
    }
  }

  console.log('Connecting to OBS websocket')
  obs.connect({ address: 'localhost:4444' })
  eventHandlers()
}

main()