import { Button } from './button'
import { DeckHandler } from './deckHandler'
import * as Helpers from './helpers'
import * as OBS from './obsHandler'

const BUTTON_JSON = '../config/buttons.json'

async function main () {
  const deck = new DeckHandler()

  console.debug('Starting Up!')

  console.debug('Clearing all keys')
  await deck.clearAll()

  console.log('Maximizing brightness')
  deck.setBrightness(100)

  console.log('Loading button file')
  let buttons: Button[] = await Helpers.loadButtons(BUTTON_JSON)

  console.log('Creating button images')
  await deck.setAllButtons(buttons)

  console.log('Connecting to OBS websocket')
  OBS.connect()

  console.log('Listening to event handlers...')
  deck.eventHandlers(buttons)
}

main().catch(err => { console.log(err) })
