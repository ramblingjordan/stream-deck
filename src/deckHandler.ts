import * as StreamDeck from 'elgato-stream-deck'
import * as _ from 'lodash'
import { Button } from './button'
import { getButton, createIcon } from './helpers'

const ICON_SIZE = 72

class DeckHandler {
  sd = new StreamDeck()

  async setAllButtons (buttons: Button[]) {
    for (let button of buttons) {
      await this.setButton(button).catch((err: string) => { console.error(err) })
    }
  }

  async clearAll () {
    try { await this.sd.clearAllKeys() }
    catch(err) { console.error(err) }
  }

  setBrightness (brightness: number) {
    this.sd.setBrightness(brightness)
  }

  async setButton (button: Button) {
    let buff = await createIcon(button, ICON_SIZE)
    this.sd.fillImage(button.deckIndex, buff)
  }

  eventHandlers (buttons: Button[], debounceDelay: number = 200) {

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
          button.release()
          await this.setButton(button)
        }, debounceDelay))

    this.sd.on('error', (error: string) => {
      console.error(error)
    })
  }
}

export { DeckHandler }
