import * as StreamDeck from 'elgato-stream-deck'
import { Button } from './button'
import * as Helpers from './helpers'

const ICON_SIZE = 72

class DeckHandler {
  sd = new StreamDeck()

  setAllButtons(buttons: Button[]) {
    for(let button of buttons) {
      this.setButton(button)
    }
  }

  async clearAll() {
    await this.sd.clearAllKeys()
  }

  setBrightness(brightness: number) {
    this.sd.setBrightness(brightness)
  }

  async setButton(button: Button) {
    let Jimp = require('jimp')
    let image = new Jimp(ICON_SIZE, ICON_SIZE, 'black', (err: string) => {
      if (err) throw err
    })
    let font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE)
  
    image.print(
      font,
      // size start
      0, 0,
      {
        text: button.title,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
      },
      // total size
      ICON_SIZE, ICON_SIZE
    )

    let buff = (await image.getBufferAsync(Jimp.MIME_BMP)).slice(54) // Jimp seems to prepend some bytes I can't remove
    this.sd.fillImage(button.deckIndex, buff)
  }

  eventHandlers(buttons: Button[]) {
    this.sd.on('down', async (keyIndex: number) => {
      this.sd.fillColor(keyIndex, 255, 0, 0)
      let button = Helpers.getButton(keyIndex, buttons)
      button.push()
      this.setButton(button)
    })
    this.sd.on('up', async (keyIndex: number) => {
      let button = Helpers.getButton(keyIndex, buttons)
      button.release()
      this.setButton(button)
    })
    this.sd.on('error', (error: string) => {
      console.error(error)
    })
  }
}

export { DeckHandler }