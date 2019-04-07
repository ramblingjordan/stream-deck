import * as StreamDeck from 'elgato-stream-deck'
import * as _ from 'lodash'
import { Button } from './button'
import { getButton, createIcon } from './helpers'

const ICON_SIZE = 72

class DeckHandler {
  sd = new StreamDeck()

  setAllButtons(buttons: Button[]) {
    for (let button of buttons) {
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
    let buff = await createIcon(button, ICON_SIZE)
    this.sd.fillImage(button.deckIndex, buff)
  }

  eventHandlers(buttons: Button[], debounceDelay: number = 200) {

    this.sd.on('down',
      _.debounce(
        (keyIndex: number) => {
          let button = getButton(keyIndex, buttons)
          button.push()
          this.setButton(button)
        }, 
        debounceDelay),
        {
          'leading': true,
          'trailing': false
        })

    this.sd.on('up',
      _.debounce(
        (keyIndex: number) => {
          let button = getButton(keyIndex, buttons)
          button.release()
          this.setButton(button)
        }, debounceDelay),
        {
          'leading': true,
          'trailing': false
        })

    this.sd.on('error', (error: string) => {
      console.error(error)
    })
  }
}

export { DeckHandler }