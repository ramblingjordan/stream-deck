import * as OBSWebSocket from 'obs-websocket-js'
import { Button } from './button'
import { DeckHandler } from './deckHandler'
import * as Helpers from './helpers'

const BUTTON_JSON = '../config/buttons.json'

async function main () {
  const sd = new DeckHandler()
  const obs = new OBSWebSocket()

  console.debug('Starting Up!')

  console.debug('Clearing all keys')
  await sd.clearAll()

  console.log('Maximizing brightness')
  sd.setBrightness(100)

  console.log('Loading button file')
  let buttons: Button[] = Helpers.loadButtons(BUTTON_JSON)

  console.log('Creating button images')
  await sd.setAllButtons(buttons)

  console.log('Connecting to OBS websocket')
  obs.connect({ address: 'localhost:4444' }).catch((err: string) => { console.error('OBS Connection Error') })

  console.log('Listening to event handlers...')
  sd.eventHandlers(buttons)
}

main().catch(err => { console.log(err) })
