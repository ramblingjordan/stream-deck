import * as StreamDeck from 'elgato-stream-deck'
import * as _ from 'lodash'
import { Button } from './button'
import { getButton, createIcon } from './helpers'

const ICON_SIZE = 72

class DeckHandler {
  sd = new StreamDeck()

  async setAllButtons(buttons: Button[]) {
    for (let button of buttons) {
      await this.setButton(button)
    }
  }

  async clearAll() {
    await this.sd.clearAllKeys()
  }

  setBrightness(brightness: number) {
    this.sd.setBrightness(brightness)
  }

  async setButton(button: Button) {
    let buff = await createIcon(button, ICON_SIZE)
    await this.sd.fillImage(button.deckIndex, buff)
  }

  eventHandlers(buttons: Button[], debounceDelay: number = 300) {

    this.sd.on('down',
      _.debounce(
        async (keyIndex: number) => {
          let button = getButton(keyIndex, buttons)
          button.push()
          await this.setButton(button)
        },
        debounceDelay))

    this.sd.on('up',
      _.debounce(
        async (keyIndex: number) => {
          let button = getButton(keyIndex, buttons)
          await button.release()
          await this.setButton(button)
        }, 
        debounceDelay))

    this.sd.on('error', (error: string) => {
      console.error(error)
    })
  }
}

export { DeckHandler }
